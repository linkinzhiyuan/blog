import mysql.connector.pooling

config={
    "host":"localhost",
    "port":3306,
    "user":"root",
    "password":"chen1234",
    "database":"test"
}
try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "INSERT INTO t_dept " \
        "(SELECT MAX(deptno) + 10, %s, %s FROM t_dept UNION " \
        "SELECT MAX(deptno) + 20, %s, %s FROM t_dept)"
    cursor.execute(sql,("部门1","bj","部门2","sh"))
    con.commit()
except Exception as e:
    if "con" in dir():
        con.rollback()
    print(e)