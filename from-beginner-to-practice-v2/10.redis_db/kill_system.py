import redis
import threading
import time
import random
from datetime import datetime, timedelta
from concurrent.futures import ThreadPoolExecutor

class SeckillMonitor:
    def __init__(self, redis_host='localhost', redis_port=6379):
        """秒杀监控系统"""
        self.redis_client = redis.Redis(host=redis_host, port=redis_port, decode_responses=True)
        self.monitoring = False
        self.stats_history = []

    def start_monitoring(self, activity_id, interval=1):
        """开始监控活动"""
        self.monitoring = True

        def monitor_loop():
            while self.monitoring:
                stats = self.get_current_stats(activity_id)
                if stats:
                    stats['timestamp'] = datetime.now()
                    self.stats_history.append(stats)
                    self.print_realtime_stats(stats)
                time.sleep(interval)

        monitor_thread = threading.Thread(target=monitor_loop)
        monitor_thread.daemon = True
        monitor_thread.start()

        return monitor_thread

    def stop_monitoring(self):
        """停止监控"""
        self.monitoring = False

    def get_current_stats(self, activity_id):
        """获取当前统计 - 修复列表索引错误"""
        try:
            pipe = self.redis_client.pipeline()
            pipe.hgetall(f'seckill:activity:{activity_id}')
            pipe.get(f'seckill:stock:{activity_id}')
            pipe.scard(f'seckill:success_users:{activity_id}')
            pipe.scard(f'seckill:participants:{activity_id}')

            results = pipe.execute()

            if not results[0]:
                return None

            activity_info = results[0]
            return {
                'remaining_stock': int(results[1]) if results[1] else 0,  # 修复: results[[1]] -> results[1]
                'success_count': results[2],                              # 修复: results[[2]] -> results[2]
                'total_participants': results[3],                        # 修复: results[[3]] -> results[3]
                'total_stock': int(activity_info.get('total_stock', 0))
            }
        except Exception as e:
            print(f"监控异常: {e}")
            return None

    def print_realtime_stats(self, stats):
        """打印实时统计"""
        timestamp = stats['timestamp'].strftime('%H:%M:%S')
        remaining = stats['remaining_stock']
        success = stats['success_count']
        participants = stats['total_participants']
        total = stats['total_stock']

        sold = total - remaining
        progress = (sold / total * 100) if total > 0 else 0

        print(f"[{timestamp}] 库存:{remaining}/{total} | 成功:{success} | 参与:{participants} | 进度:{progress:.1f}%")

    def generate_report(self, activity_id):
        """生成详细报告"""
        if not self.stats_history:
            print("无监控数据")
            return

        print("\n" + "="*80)
        print("📊 秒杀活动详细报告")
        print("="*80)

        # 基本统计
        final_stats = self.stats_history[-1] if self.stats_history else None
        if final_stats:
            print(f"活动ID: {activity_id}")
            print(f"总库存: {final_stats['total_stock']}")
            print(f"最终剩余: {final_stats['remaining_stock']}")
            print(f"成功人数: {final_stats['success_count']}")
            print(f"参与人数: {final_stats['total_participants']}")

            success_rate = (final_stats['success_count'] / final_stats['total_participants'] * 100) if final_stats['total_participants'] > 0 else 0
            print(f"成功率: {success_rate:.2f}%")

        # 时间线分析
        if len(self.stats_history) > 1:
            print(f"\n⏱️  时间线分析:")
            start_time = self.stats_history[0]['timestamp']
            end_time = self.stats_history[-1]['timestamp']
            duration = (end_time - start_time).total_seconds()
            print(f"监控时长: {duration:.1f} 秒")

            # 计算秒杀速度
            total_sold = final_stats['total_stock'] - final_stats['remaining_stock']
            if duration > 0:
                sell_rate = total_sold / duration
                print(f"平均销售速度: {sell_rate:.2f} 件/秒")

        # 获取成功用户详情
        success_users = list(self.redis_client.smembers(f'seckill:success_users:{activity_id}'))
        print(f"\n🎉 成功用户列表 (共{len(success_users)}人):")
        for i, user in enumerate(success_users[:20]):  # 显示前20名
            print(f"{i+1:3d}. {user}")

        if len(success_users) > 20:
            print(f"... 还有 {len(success_users) - 20} 名用户")

        # 订单详情
        orders = self.redis_client.lrange(f'seckill:orders:{activity_id}', 0, -1)
        print(f"\n📋 订单统计: 共生成 {len(orders)} 个订单")

        return {
            'total_stock': final_stats['total_stock'],
            'remaining_stock': final_stats['remaining_stock'],
            'success_count': final_stats['success_count'],
            'total_participants': final_stats['total_participants'],
            'success_rate': success_rate,
            'duration': duration if len(self.stats_history) > 1 else 0,
            'success_users': success_users,
            'orders_count': len(orders)
        }

class RateLimiter:
    def __init__(self, redis_client):
        """基于Redis的分布式限流器"""
        self.redis_client = redis_client

        # 修复的滑动窗口限流Lua脚本
        self.sliding_window_script = self.redis_client.register_script("""
            local key = KEYS[1]                    -- 修复: KEYS[[1]] -> KEYS[1]
            local window = tonumber(ARGV[1])       -- 修复: ARGV[[1]] -> ARGV[1]
            local limit = tonumber(ARGV[2])        -- 修复: ARGV[[2]] -> ARGV[2]
            local current_time = tonumber(ARGV[3]) -- 修复: ARGV[[3]] -> ARGV[3]
            
            -- 清理过期数据
            redis.call('ZREMRANGEBYSCORE', key, 0, current_time - window)
            
            -- 获取当前窗口内的请求数
            local current_requests = redis.call('ZCARD', key)
            
            if current_requests < limit then
                -- 添加当前请求
                redis.call('ZADD', key, current_time, current_time)
                redis.call('EXPIRE', key, math.ceil(window))
                return {1, limit - current_requests - 1}
            else
                return {0, 0}
            end
        """)

    def is_allowed(self, user_id, activity_id, limit=5, window=60):
        """检查用户是否被限流"""
        key = f'rate_limit:{activity_id}:{user_id}'
        current_time = int(time.time())

        result = self.sliding_window_script(
            keys=[key],
            args=[window, limit, current_time]
        )

        return {
            'allowed': bool(result[0]),
            'remaining': result[1],  # 修复: result[[1]] -> result[1]
            'reset_time': current_time + window
        }

class AntiCheatSystem:
    def __init__(self, redis_client):
        """防作弊系统"""
        self.redis_client = redis_client
        self.rate_limiter = RateLimiter(redis_client)

    def validate_request(self, user_id, activity_id, request_info):
        """验证请求合法性"""
        checks = {
            'rate_limit': False,
            'duplicate_check': False,
            'behavior_check': False,
            'ip_check': False
        }

        # 1. 频率限制检查
        rate_result = self.rate_limiter.is_allowed(user_id, activity_id, limit=3, window=10)
        checks['rate_limit'] = rate_result['allowed']

        if not checks['rate_limit']:
            return False, f"请求过于频繁，剩余{rate_result['remaining']}次机会"

        # 2. 重复请求检查
        request_key = f'request:{activity_id}:{user_id}'
        if self.redis_client.exists(request_key):
            return False, "检测到重复请求"

        # 设置请求标记，5秒内不能重复
        self.redis_client.setex(request_key, 5, 1)
        checks['duplicate_check'] = True

        # 3. 行为模式检查（简单实现）
        behavior_key = f'behavior:{activity_id}:{user_id}'
        request_times = self.redis_client.lrange(behavior_key, 0, -1)

        current_time = time.time()
        # 记录请求时间
        self.redis_client.lpush(behavior_key, current_time)
        self.redis_client.ltrim(behavior_key, 0, 9)  # 只保留最近10次
        self.redis_client.expire(behavior_key, 300)  # 5分钟过期

        # 检查是否有异常行为模式
        if len(request_times) >= 5:
            times = [float(t) for t in request_times[:5]]
            intervals = [times[i] - times[i+1] for i in range(len(times)-1)]

            # 如果请求间隔过于规律，可能是脚本
            if all(abs(interval - intervals[0]) < 0.1 for interval in intervals):
                return False, "检测到异常行为模式"

        checks['behavior_check'] = True

        # 4. IP检查（如果提供了IP信息）
        if 'ip' in request_info:
            ip = request_info['ip']
            ip_key = f'ip_requests:{activity_id}:{ip}'
            ip_requests = self.redis_client.incr(ip_key)
            self.redis_client.expire(ip_key, 60)  # 1分钟窗口

            if ip_requests > 20:  # 单IP每分钟最多20次请求
                return False, f"IP {ip} 请求过于频繁"

        checks['ip_check'] = True

        return True, "验证通过"

class CompleteSeckillSystem:
    def __init__(self, redis_host='localhost', redis_port=6379):
        """完整的秒杀系统"""
        self.redis_client = redis.Redis(
            host=redis_host,
            port=redis_port,
            decode_responses=True,
            connection_pool=redis.ConnectionPool(
                host=redis_host,
                port=redis_port,
                max_connections=200
            )
        )

        self.monitor = SeckillMonitor(redis_host, redis_port)
        self.anti_cheat = AntiCheatSystem(self.redis_client)

        # 修复的增强版秒杀Lua脚本 - 不使用KEYS表作为函数调用
        self.enhanced_seckill_script = self.redis_client.register_script("""
            local activity_id = ARGV[1]      -- 修复: 直接使用ARGV，不使用KEYS
            local user_id = ARGV[2]          -- 修复: ARGV[[2]] -> ARGV[2]
            local current_time = tonumber(ARGV[3])  -- 修复: ARGV[[3]] -> ARGV[3]
            
            local activity_key = 'seckill:activity:' .. activity_id
            local stock_key = 'seckill:stock:' .. activity_id
            local success_users_key = 'seckill:success_users:' .. activity_id
            local participants_key = 'seckill:participants:' .. activity_id
            
            -- 检查活动状态
            local activity_info = redis.call('HGETALL', activity_key)
            if #activity_info == 0 then
                return {0, '活动不存在'}
            end
            
            -- 检查用户是否已参与
            if redis.call('SISMEMBER', participants_key, user_id) == 1 then
                return {0, '用户已参与过'}
            end
            
            -- 检查库存
            local stock = tonumber(redis.call('GET', stock_key))
            if not stock or stock <= 0 then
                return {0, '商品已售罄'}
            end
            
            -- 执行秒杀
            local new_stock = redis.call('DECR', stock_key)
            if new_stock < 0 then
                redis.call('INCR', stock_key)
                return {0, '商品已售罄'}
            end
            
            -- 记录用户信息
            redis.call('SADD', success_users_key, user_id)
            redis.call('SADD', participants_key, user_id)
            
            -- 更新统计
            redis.call('HINCRBY', activity_key, 'success_count', 1)
            redis.call('HSET', activity_key, 'remaining_stock', new_stock)
            
            -- 生成订单
            local order_id = 'order_' .. activity_id .. '_' .. user_id .. '_' .. current_time
            local order_data = {
                'order_id', order_id,
                'activity_id', activity_id,
                'user_id', user_id,
                'timestamp', current_time,
                'status', 'success'
            }
            redis.call('HMSET', 'seckill:order:' .. order_id, unpack(order_data))
            redis.call('LPUSH', 'seckill:orders:' .. activity_id, order_id)
            
            -- 记录成功时间用于分析
            redis.call('ZADD', 'seckill:success_timeline:' .. activity_id, current_time, user_id)
            
            return {1, '秒杀成功', order_id, new_stock}
        """)

    def create_activity(self, activity_id, product_name, total_stock, start_time, end_time):
        """创建秒杀活动"""
        activity_data = {
            'activity_id': activity_id,
            'product_name': product_name,
            'total_stock': total_stock,
            'remaining_stock': total_stock,
            'start_time': start_time.isoformat(),
            'end_time': end_time.isoformat(),
            'success_count': 0,
            'created_at': datetime.now().isoformat()
        }

        pipe = self.redis_client.pipeline()
        pipe.multi()
        pipe.hset(f'seckill:activity:{activity_id}', mapping=activity_data)
        pipe.set(f'seckill:stock:{activity_id}', total_stock)

        # 清理相关数据
        pipe.delete(f'seckill:success_users:{activity_id}')
        pipe.delete(f'seckill:participants:{activity_id}')
        pipe.delete(f'seckill:orders:{activity_id}')
        pipe.delete(f'seckill:success_timeline:{activity_id}')

        results = pipe.execute()
        return bool(results)

    def participate_seckill(self, activity_id, user_id, request_info=None):
        """参与秒杀（带防作弊）- 修复脚本调用"""
        # 防作弊检查
        if request_info is None:
            request_info = {}

        is_valid, message = self.anti_cheat.validate_request(user_id, activity_id, request_info)
        if not is_valid:
            return {
                'success': False,
                'message': f'安全检查失败: {message}',
                'user_id': user_id,
                'timestamp': datetime.now().isoformat()
            }

        # 执行秒杀 - 修复脚本调用方式
        try:
            current_time = int(time.time())
            # 修复: 不传递keys参数，只传递args
            result = self.enhanced_seckill_script(keys=[], args=[activity_id, user_id, current_time])

            if result[0] == 1:
                return {
                    'success': True,
                    'message': result[1],           # 修复: result[[1]] -> result[1]
                    'user_id': user_id,
                    'order_id': result[2],          # 修复: result[[2]] -> result[2]
                    'remaining_stock': result[3],   # 修复: result[[3]] -> result[3]
                    'timestamp': datetime.now().isoformat()
                }
            else:
                return {
                    'success': False,
                    'message': result[1],           # 修复: result[[1]] -> result[1]
                    'user_id': user_id,
                    'timestamp': datetime.now().isoformat()
                }
        except Exception as e:
            return {
                'success': False,
                'message': f'系统错误: {str(e)}',
                'user_id': user_id,
                'timestamp': datetime.now().isoformat()
            }

    def run_seckill_simulation(self, activity_id, num_users=1000, max_workers=100):
        """运行秒杀模拟"""
        print(f"🚀 开始秒杀模拟 - {num_users}个用户，{max_workers}个并发线程")

        # 开始监控
        monitor_thread = self.monitor.start_monitoring(activity_id, interval=0.5)

        results = []
        start_time = time.time()

        def user_seckill(user_index):
            user_id = f'user_{user_index:05d}'

            # 模拟真实用户行为
            request_info = {
                'ip': f'192.168.1.{random.randint(1, 254)}',
                'user_agent': 'Mozilla/5.0 (compatible; SeckillBot/1.0)',
                'timestamp': time.time()
            }

            # 随机延迟，模拟网络延迟
            time.sleep(random.uniform(0, 0.5))

            return self.participate_seckill(activity_id, user_id, request_info)

        # 并发执行
        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = [executor.submit(user_seckill, i) for i in range(num_users)]

            for i, future in enumerate(futures):
                try:
                    result = future.result(timeout=10)
                    results.append(result)

                    # 每100个请求显示进度
                    if (i + 1) % 100 == 0:
                        success_count = sum(1 for r in results if r['success'])
                        print(f"进度: {i+1}/{num_users}, 成功: {success_count}")

                except Exception as e:
                    print(f"用户请求异常: {e}")

        end_time = time.time()
        duration = end_time - start_time

        # 停止监控
        time.sleep(1)  # 等待最后的统计
        self.monitor.stop_monitoring()

        # 生成报告
        print(f"\n⏱️  模拟完成，总耗时: {duration:.2f} 秒")
        print(f"平均QPS: {num_users/duration:.2f}")

        report = self.monitor.generate_report(activity_id)

        # 成功率分析
        success_results = [r for r in results if r['success']]
        failed_results = [r for r in results if not r['success']]

        print(f"\n📈 请求结果分析:")
        print(f"总请求数: {len(results)}")
        print(f"成功请求: {len(success_results)}")
        print(f"失败请求: {len(failed_results)}")

        # 失败原因统计
        failure_reasons = {}
        for result in failed_results:
            reason = result['message']
            failure_reasons[reason] = failure_reasons.get(reason, 0) + 1

        print(f"\n❌ 失败原因分布:")
        for reason, count in sorted(failure_reasons.items(), key=lambda x: x[1], reverse=True):  # 修复: x[[1]] -> x[1]
            percentage = count / len(failed_results) * 100 if failed_results else 0
            print(f"  {reason}: {count} 次 ({percentage:.1f}%)")

        return {
            'total_requests': len(results),
            'success_count': len(success_results),
            'failed_count': len(failed_results),
            'duration': duration,
            'qps': num_users/duration,
            'failure_reasons': failure_reasons,
            'activity_report': report
        }

# 完整演示程序
def main_demo():
    """完整演示程序"""
    print("🎯 Redis + Python 多线程秒杀系统演示 (修复版)")
    print("="*80)

    # 初始化系统
    seckill_system = CompleteSeckillSystem()

    # 清理历史数据
    print("🧹 清理历史数据...")
    for key in seckill_system.redis_client.keys('seckill:*'):
        seckill_system.redis_client.delete(key)
    for key in seckill_system.redis_client.keys('rate_limit:*'):
        seckill_system.redis_client.delete(key)
    for key in seckill_system.redis_client.keys('request:*'):
        seckill_system.redis_client.delete(key)

    # 创建秒杀活动
    activity_id = 'demo_seckill_2024_fixed'
    product_name = 'iPhone 15 Pro Max 1TB'
    total_stock = 200

    start_time = datetime.now() + timedelta(seconds=5)
    end_time = start_time + timedelta(seconds=60)

    print(f"\n📦 创建秒杀活动:")
    print(f"活动ID: {activity_id}")
    print(f"商品: {product_name}")
    print(f"库存: {total_stock} 台")
    print(f"开始时间: {start_time.strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"结束时间: {end_time.strftime('%Y-%m-%d %H:%M:%S')}")

    success = seckill_system.create_activity(
        activity_id, product_name, total_stock, start_time, end_time
    )

    if not success:
        print("❌ 活动创建失败!")
        return

    print("✅ 活动创建成功!")

    # 等待活动开始
    wait_time = (start_time - datetime.now()).total_seconds()
    if wait_time > 0:
        print(f"\n⏰ 等待活动开始... ({wait_time:.1f} 秒)")
        for i in range(int(wait_time), 0, -1):
            print(f"倒计时: {i} 秒", end='\r')
            time.sleep(1)
        print("倒计时: 0 秒")

    print(f"\n🔥 秒杀开始! 模拟 2000 个用户抢购 {total_stock} 台商品")

    # 运行秒杀模拟
    simulation_result = seckill_system.run_seckill_simulation(
        activity_id=activity_id,
        num_users=2000,
        max_workers=150
    )

    print(f"\n🎊 秒杀活动结束!")
    print(f"🏆 最终战果:")
    print(f"   📊 QPS峰值: {simulation_result['qps']:.2f}")
    print(f"   ✅ 成功抢购: {simulation_result['success_count']} 人")
    print(f"   ❌ 抢购失败: {simulation_result['failed_count']} 人")
    print(f"   ⏱️  总耗时: {simulation_result['duration']:.2f} 秒")

    # 数据一致性验证
    final_stock = int(seckill_system.redis_client.get(f'seckill:stock:{activity_id}') or 0)
    success_users_count = seckill_system.redis_client.scard(f'seckill:success_users:{activity_id}')
    orders_count = seckill_system.redis_client.llen(f'seckill:orders:{activity_id}')

    print(f"\n🔍 数据一致性验证:")
    print(f"   库存余量: {final_stock}")
    print(f"   成功用户数: {success_users_count}")
    print(f"   订单数量: {orders_count}")
    print(f"   计算验证: {total_stock} - {success_users_count} = {total_stock - success_users_count}")

    consistency_check = (final_stock == total_stock - success_users_count == total_stock - orders_count)
    print(f"   一致性检查: {'✅ 通过' if consistency_check else '❌ 失败'}")

if __name__ == "__main__":
    main_demo()
