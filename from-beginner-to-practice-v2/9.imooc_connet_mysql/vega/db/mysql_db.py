import mysql.connector.pooling

__config={
    "host":"localhost",
    "port":3306,
    "user":"root",
    "password":"chen1234",
    "database":"vega"
}

try:
    pool=mysql.connector.pooling.MySQLConnectionPool(
        **__config,
        pool_size=10
    )
except Exception as e:
    print(f"数据库连接池连接失败：",e)