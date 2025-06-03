import mysql.connector.pooling
config={
    "host":"localhost",
    "port":3306,
    "user":"root",
    "password":"chen1234",
    "database":"test",
}

try:
    pool = mysql.connector.pooling.MySQLConnectionPool(
        **config,
        pool_size=10
    )
    con = pool.get_connection()
    con.start_transaction()
    cursor = con.cursor()
    sql = "DROP TABLE IF EXISTS t_emp_new"
    cursor.execute(sql)
    # sql="CREATE TABLE t_emp_new AS (SELECT * FROM t_emp)"
    sql="CREATE TABLE t_emp_new LIKE t_emp"
    cursor.execute(sql)
    # 使用INSERT语句，把部门平均底薪超过公司平均底薪的这样部门里的
    # 员工信息导入到t_emp_new表里，并且让这些员工隶属于sales部门
    sql="SELECT AVG(sal) AS avg FROM t_emp"
    cursor.execute(sql)
    temp_sale = cursor.fetchone()
    print(temp_sale[0])
    avg = temp_sale[0] # 公司平均底薪
    sql="SELECT deptno FROM t_emp GROUP BY deptno HAVING AVG(sal)>%s"
    cursor.execute(sql,[avg])
    temp_dept = cursor.fetchall() # 查出所有符合的部门
    print(temp_dept)
    # 把符合需求的部门人员从t_emp 插入到t_emp_new中
    sql = "INSERT INTO t_emp_new SELECT * FROM t_emp WHERE deptno IN ("
    for index in range(len(temp_dept)):
        temp = temp_dept[index][0]
        if index != len(temp_dept)-1:
            sql += str(temp) + ","
        else:
            sql += str(temp)
    sql += ")"
    print(sql)
    cursor.execute(sql)

    # 删除原表中这些部门的数据
    sql = "DELETE FROM t_emp WHERE deptno IN ("
    for index in range(len(temp_dept)):
        temp = temp_dept[index][0]
        if index != len(temp_dept)-1:
            sql += str(temp) + ","
        else:
            sql += str(temp)
    sql += ')'
    print(sql)
    cursor.execute(sql)

    # 修改deptno为SALES这个部门编号
    sql = "SELECT deptno FROM t_dept WHERE dname=%s"
    cursor.execute(sql,["SALES"])
    deptno = cursor.fetchone()[0]
    print(deptno)
    sql = "UPDATE t_emp_new SET deptno=%s"
    cursor.execute(sql,[deptno])
    con.commit()
except Exception as e:
    if "con" in dir():
        con.rollback()
    print(e)