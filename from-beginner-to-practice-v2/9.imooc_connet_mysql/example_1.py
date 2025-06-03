import mysql.connector
conSql=mysql.connector.connect(
    host="localhost",port="3306",
    user="root",password="chen1234",
    database="test"
)
cursor=conSql.cursor()
sql="SELECT empno,ename,hiredate FROM t_emp;"
cursor.execute(sql)
for one in cursor:
    print(one[0],one[1],one[2])
conSql.close()