from redis import Redis
redis_connection = Redis(decode_responses=True)

redis_connection.sadd("s2","mateusz")
redis_connection.sadd("s2","kamila")
redis_connection.sadd("s2","kinga")
redis_connection.sadd("s2","robert")
redis_connection.sadd("s2","clemens")
redis_connection.sadd("s2","kasia")
redis_connection.sadd("s2","justyna")

print(redis_connection.smembers("s"))
print(redis_connection.smembers("s2"))
print(redis_connection.sdiff("s2","s"))
print(redis_connection.sinter("s2","s"))
print(redis_connection.sunion("s2","s"))