from redis import Redis
redis_connection = Redis(decode_responses=True)

redis_connection.zadd("sk",{"kamila": 10})
redis_connection.zadd("sk",{"kasia": 21})
redis_connection.zadd("sk",{"mateusz": 104})
redis_connection.zadd("sk",{"robert": 62})
redis_connection.zadd("sk",{"kinga": 222})

print(redis_connection.zrange("sk",0, -1, withscores=True))
print(redis_connection.zpopmax("sk"))
print(redis_connection.zpopmin("sk"))
print(redis_connection.zrange("sk",0, -1, withscores=True))