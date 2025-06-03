from mysql_db import pool
import logging

# 配置 logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s',
    datefmt='%Y-%m-%d %H:%M:%S'
)

class NewsDao:
    # 查询待审批新闻列表
    def search_unreview_list(self, page):
        try:
            con = pool.get_connection()
            cursor = con.cursor()
            sql = """
            SELECT 
                n.id,
                n.title,
                t.type,
                u.username,
                n.state,
                n.create_time 
            FROM t_news n 
            INNER JOIN t_type t ON n.type_id = t.id 
            INNER JOIN t_user u ON n.editor_id = u.id 
            WHERE n.state = %s 
            ORDER BY n.create_time DESC 
            LIMIT %s, %s
            """
            cursor.execute(sql, ('待审批', (page-1)*10, 10))
            result = cursor.fetchall()
            return result
        except Exception as e:
            logging.error(f"查询新闻列表失败: {e}")
            return None
        finally:
            if "con" in dir():
                con.close()

    # 查询待审批新闻总数量
    def search_unreview_list_total(self):
        try:
            con = pool.get_connection()
            cursor = con.cursor()
            sql = "SELECT COUNT(*) FROM t_news WHERE state = %s;"
            cursor.execute(sql, ['待审批'])
            result = cursor.fetchone()[0]
            return result
        except Exception as e:
            logging.error(f"查询总数量失败: {e}")
            return None
        finally:
            if "con" in dir():
                con.close()

    # 修改新闻审批状态
    def update_news_state(self, id):
        try:
            con = pool.get_connection()
            cursor = con.cursor()
            sql = "UPDATE t_news SET state=%s WHERE id=%s"
            cursor.execute(sql, ('已审批', id))
            con.commit()
            logging.info(f"更新成功，新闻ID: {id}")
            return True
        except Exception as e:
            if 'con' in dir():
                con.rollback()
            logging.error(f"更新失败，新闻ID: {id}, 错误: {e}")
            return False
        finally:
            if "con" in dir():
                con.close()

# 测试
if __name__ == "__main__":
    news_service = NewsDao()
    result = news_service.update_news_state(1)
    if result:
        print("操作成功")
    else:
        print("操作失败")
