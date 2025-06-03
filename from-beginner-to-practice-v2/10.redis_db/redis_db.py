# redis 连接池
import redis

pool = redis.ConnectionPool(host='localhost', port=6379, db=0)