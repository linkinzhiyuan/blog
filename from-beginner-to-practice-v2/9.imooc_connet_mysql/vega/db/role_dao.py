from mysql_db import pool

class RoleDao:
    # 查询用户角色
    def search_role_list(self):
        try:
            con = pool.get_connection()
            cursor = con.cursor()
            sql = "SELECT id,role FROM t_role"
            cursor.execute(sql)
            return cursor.fetchall()
        except Exception as e:
            print(f"获取角色列表失败:",e)
        finally:
            if "con" in dir():
                con.close()

roleService = RoleDao()
result = roleService.search_role_list()
print(result)