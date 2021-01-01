from redis import Redis
redis_connection = Redis()
print(redis_connection.ping())