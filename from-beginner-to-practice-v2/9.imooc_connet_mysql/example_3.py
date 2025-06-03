# import mysql.connector
# try:
#     con=mysql.connector.connect(
#         host="localhost",
#         port=3306,
#         user="root",
#         password="chen1234",
#         database="test"
#     )
#     con.start_transaction()
#     cursor=con.cursor()
#     sql="INSERT INTO t_emp(empno,ename,job,mgr,hiredate,sal,comm,deptno) " \
#         "VALUES(%s,%s,%s,%s,%s,%s,%s,%s)"
#     cursor.execute(sql,(9601,"赵娜","SALESMAN",None,"1985-12-1",2500,None,10))
#     con.commit()
# except Exception as e:
#     if "con" in dir():
#         con.rollback()
#     print(e)
# finally:
#     if "con" in dir():
#         con.close() # 关闭数据库

import mysql.connector
try:
    conSql=mysql.connector.connect(
        host="localhost",
        port=3306,
        user='root',
        password='chen1234',
        database='test',
    )
    conSql.start_transaction()
    cursor=conSql.cursor()
    sql = "INSERT INTO t_emp(empno,ename,job,mgr,hiredate,sal,comm,deptno) " \
    "VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
    cursor.execute(sql, (9000, 'testchen', 'SALESMAN', None, '2014-10-01', 9000, None, 10))
    conSql.commit()
except Exception as e:
    if "conSql" in dir():
        conSql.rollback()
    print(e)
finally:
    if "conSql" in dir():
        conSql.close()