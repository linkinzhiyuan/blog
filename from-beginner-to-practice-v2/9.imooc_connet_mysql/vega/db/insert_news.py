import random
from datetime import datetime, timedelta
import string
import logging
from mysql_db import pool


class NewsDataGenerator:
    def __init__(self, connection_pool):
        """
        初始化数据生成器

        Args:
            connection_pool: MySQL官方连接池实例 (MySQLConnectionPool)
        """
        self.pool = connection_pool

    def generate_content_id(self, length=12):
        """生成12位随机内容ID"""
        return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))

    def generate_test_data(self, count=50):
        """
        生成测试数据

        Args:
            count: 生成数据条数

        Returns:
            list: 测试数据列表
        """
        # 新闻标题模板
        titles = [
            "科技创新引领未来发展新方向",
            "经济形势分析与市场前景展望",
            "教育改革深化推进素质教育",
            "环保政策助力绿色发展理念",
            "医疗健康服务体系不断完善",
            "文化产业蓬勃发展新态势",
            "体育事业迎来黄金发展期",
            "旅游业复苏呈现良好势头",
            "农业现代化步伐持续加快",
            "城市建设彰显人文关怀",
            "人工智能技术突破新高度",
            "新能源汽车市场持续火热",
            "5G网络建设全面提速",
            "数字经济发展势头强劲",
            "金融科技创新应用广泛",
            "电商平台服务质量提升",
            "在线教育模式日趋成熟",
            "智慧城市建设成效显著",
            "生物医药研发取得突破",
            "航空航天技术再创佳绩"
        ]

        # 状态枚举值
        states = ['草稿', '待审批', '已审批', '隐藏']

        # 生成测试数据
        test_data = []
        base_time = datetime.now() - timedelta(days=30)

        for i in range(count):
            # 创建时间和更新时间
            create_time = base_time + timedelta(
                days=random.randint(0, 30),
                hours=random.randint(0, 23),
                minutes=random.randint(0, 59)
            )

            # 更新时间应该晚于或等于创建时间
            update_time = create_time + timedelta(
                hours=random.randint(0, 24),
                minutes=random.randint(0, 59)
            )

            data = {
                'title': random.choice(titles) + f" - 第{i + 1}期",
                'editor_id': random.randint(1, 10),  # 假设有10个编辑
                'type_id': random.randint(1, 5),  # 假设有5个新闻类型
                'content_id': self.generate_content_id(),
                'is_top': random.randint(0, 1),  # 0或1
                'state': random.choice(states),
                'create_time': create_time,
                'update_time': update_time
            }
            test_data.append(data)

        return test_data

    def insert_batch_with_pool(self, data_list, batch_size=100):
        """
        使用MySQL官方连接池批量插入数据

        Args:
            data_list: 要插入的数据列表
            batch_size: 每批次插入的数量

        Returns:
            int: 成功插入的记录数
        """
        sql = """
        INSERT INTO t_news 
        (title, editor_id, type_id, content_id, is_top, state, create_time, update_time)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        connection = None
        total_inserted = 0

        try:
            # 从MySQL官方连接池获取连接
            connection = self.pool.get_connection()

            # 分批处理数据
            for i in range(0, len(data_list), batch_size):
                batch_data = data_list[i:i + batch_size]

                # 准备批量数据
                batch_params = []
                for data in batch_data:
                    params = (
                        data['title'],
                        data['editor_id'],
                        data['type_id'],
                        data['content_id'],
                        data['is_top'],
                        data['state'],
                        data['create_time'],
                        data['update_time']
                    )
                    batch_params.append(params)

                # 执行批量插入
                cursor = connection.cursor()
                try:
                    affected_rows = cursor.executemany(sql, batch_params)
                    connection.commit()
                    total_inserted += len(batch_data)

                    logging.info(f"批次 {i // batch_size + 1}: 插入 {len(batch_data)} 条记录")
                finally:
                    cursor.close()

            logging.info(f"批量插入完成，总共插入 {total_inserted} 条记录")
            return total_inserted

        except Exception as e:
            if connection:
                connection.rollback()
            logging.error(f"批量插入失败: {e}")
            raise
        finally:
            # MySQL官方连接池使用close()方法归还连接
            if connection:
                connection.close()

    def insert_with_transaction_pool(self, data_list):
        """
        使用MySQL官方连接池和事务插入数据

        Args:
            data_list: 要插入的数据列表

        Returns:
            int: 成功插入的记录数
        """
        sql = """
        INSERT INTO t_news 
        (title, editor_id, type_id, content_id, is_top, state, create_time, update_time)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        connection = None
        success_count = 0

        try:
            # 从MySQL官方连接池获取连接
            connection = self.pool.get_connection()

            # 开始事务
            connection.start_transaction()

            cursor = connection.cursor()
            try:
                for i, data in enumerate(data_list):
                    try:
                        params = (
                            data['title'],
                            data['editor_id'],
                            data['type_id'],
                            data['content_id'],
                            data['is_top'],
                            data['state'],
                            data['create_time'],
                            data['update_time']
                        )

                        cursor.execute(sql, params)
                        success_count += 1

                        # 每100条记录打印进度
                        if (i + 1) % 100 == 0:
                            logging.info(f"已处理 {i + 1} 条记录...")

                    except Exception as e:
                        logging.error(f"第 {i + 1} 条记录插入失败: {e}")
                        raise

                # 提交事务
                connection.commit()
                logging.info(f"事务提交成功，共插入 {success_count} 条记录")
                return success_count
            finally:
                cursor.close()

        except Exception as e:
            # 回滚事务
            if connection:
                connection.rollback()
            logging.error(f"事务回滚: {e}")
            raise
        finally:
            # MySQL官方连接池使用close()方法归还连接
            if connection:
                connection.close()

    def query_data_with_pool(self, limit=10, state=None):
        """
        使用MySQL官方连接池查询数据

        Args:
            limit: 查询记录数限制
            state: 状态筛选（可选）

        Returns:
            list: 查询结果
        """
        connection = None

        try:
            # 从MySQL官方连接池获取连接
            connection = self.pool.get_connection()

            # 构建SQL
            if state:
                sql = """
                SELECT id, title, editor_id, type_id, content_id, is_top, state, 
                       create_time, update_time
                FROM t_news 
                WHERE state = %s
                ORDER BY create_time DESC 
                LIMIT %s
                """
                params = (state, limit)
            else:
                sql = """
                SELECT id, title, editor_id, type_id, content_id, is_top, state, 
                       create_time, update_time
                FROM t_news 
                ORDER BY create_time DESC 
                LIMIT %s
                """
                params = (limit,)

            cursor = connection.cursor()
            try:
                cursor.execute(sql, params)
                results = cursor.fetchall()

                logging.info(f"查询到 {len(results)} 条记录")
                return results
            finally:
                cursor.close()

        except Exception as e:
            logging.error(f"查询数据失败: {e}")
            raise
        finally:
            # MySQL官方连接池使用close()方法归还连接
            if connection:
                connection.close()

    def get_statistics_with_pool(self):
        """
        使用MySQL官方连接池获取统计信息

        Returns:
            dict: 统计信息
        """
        connection = None

        try:
            # 从MySQL官方连接池获取连接
            connection = self.pool.get_connection()

            stats = {}

            cursor = connection.cursor()
            try:
                # 总记录数
                cursor.execute("SELECT COUNT(*) FROM t_news")
                stats['total_count'] = cursor.fetchone()[0]

                # 按状态统计
                cursor.execute("""
                    SELECT state, COUNT(*) as count 
                    FROM t_news 
                    GROUP BY state 
                    ORDER BY count DESC
                """)
                stats['state_stats'] = cursor.fetchall()

                # 置顶文章数量
                cursor.execute("SELECT COUNT(*) FROM t_news WHERE is_top = 1")
                stats['top_count'] = cursor.fetchone()[0]

                # 最近7天的文章数量
                cursor.execute("""
                    SELECT COUNT(*) FROM t_news 
                    WHERE create_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)
                """)
                stats['recent_count'] = cursor.fetchone()[0]

                # 按编辑统计
                cursor.execute("""
                    SELECT editor_id, COUNT(*) as count 
                    FROM t_news 
                    GROUP BY editor_id 
                    ORDER BY count DESC 
                    LIMIT 5
                """)
                stats['editor_stats'] = cursor.fetchall()
            finally:
                cursor.close()

            return stats

        except Exception as e:
            logging.error(f"获取统计信息失败: {e}")
            raise
        finally:
            # MySQL官方连接池使用close()方法归还连接
            if connection:
                connection.close()


def main_with_pool(connection_pool):
    """
    使用MySQL官方连接池的主函数

    Args:
        connection_pool: MySQL官方连接池实例
    """
    # 配置日志
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

    try:
        # 创建数据生成器
        generator = NewsDataGenerator(connection_pool)

        # 生成测试数据
        logging.info("正在生成测试数据...")
        test_data = generator.generate_test_data(count=200)  # 生成200条测试数据
        logging.info(f"生成了 {len(test_data)} 条测试数据")

        # 显示数据样例
        logging.info("=== 数据样例 ===")
        for i, data in enumerate(test_data[:3]):
            logging.info(f"第{i + 1}条: 标题={data['title']}, 状态={data['state']}")

        # 批量插入数据
        logging.info("=== 开始批量插入 ===")
        inserted_count = generator.insert_batch_with_pool(test_data, batch_size=50)
        logging.info(f"批量插入完成，成功插入 {inserted_count} 条记录")

        # 查询验证
        logging.info("=== 验证插入结果 ===")
        recent_data = generator.query_data_with_pool(limit=5)
        for row in recent_data:
            logging.info(f"ID: {row[0]}, 标题: {row[1]}, 状态: {row[6]}")

        # 获取统计信息
        logging.info("=== 统计信息 ===")
        stats = generator.get_statistics_with_pool()

        logging.info(f"新闻表总记录数: {stats['total_count']}")
        logging.info(f"置顶文章数量: {stats['top_count']}")
        logging.info(f"最近7天文章数量: {stats['recent_count']}")

        logging.info("按状态统计:")
        for state, count in stats['state_stats']:
            logging.info(f"  {state}: {count} 条")

        logging.info("按编辑统计（前5名）:")
        for editor_id, count in stats['editor_stats']:
            logging.info(f"  编辑ID {editor_id}: {count} 条")

    except Exception as e:
        logging.error(f"程序执行错误: {e}")
        raise


# 简化版本的快速插入函数
def quick_insert_test_data(connection_pool, count=50):
    """
    快速插入测试数据（适配MySQL官方连接池）

    Args:
        connection_pool: MySQL官方连接池
        count: 插入数据条数
    """
    connection = None

    try:
        # 从MySQL官方连接池获取连接
        connection = connection_pool.get_connection()

        # 准备测试数据
        test_data = []
        states = ['草稿', '待审批', '已审批', '隐藏']

        for i in range(count):
            test_data.append((
                f"测试新闻标题 - {i + 1}",  # title
                random.randint(1, 5),  # editor_id
                random.randint(1, 3),  # type_id
                f"CONT{i + 1:08d}",  # content_id
                random.randint(0, 1),  # is_top
                random.choice(states),  # state
                datetime.now() - timedelta(days=random.randint(0, 30)),  # create_time
                datetime.now()  # update_time
            ))

        # 批量插入
        sql = """
        INSERT INTO t_news 
        (title, editor_id, type_id, content_id, is_top, state, create_time, update_time)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        """

        cursor = connection.cursor()
        try:
            affected_rows = cursor.executemany(sql, test_data)
            connection.commit()

            print(f"成功插入 {len(test_data)} 条测试数据")
            return len(test_data)
        finally:
            cursor.close()

    except Exception as e:
        if connection:
            connection.rollback()
        print(f"插入失败: {e}")
        raise
    finally:
        # MySQL官方连接池使用close()方法归还连接
        if connection:
            connection.close()


# 使用示例
if __name__ == "__main__":
    # 假设您已经有了连接池实例
    main_with_pool(pool)
    pass
