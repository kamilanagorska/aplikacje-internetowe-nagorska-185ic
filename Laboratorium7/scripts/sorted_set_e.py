from redis import Redis
redis_connection = Redis(decode_responses=True)

redis_connection.zadd("ske",{"kamila": 10})
redis_connection.zadd("ske",{"kasia": 21})
redis_connection.zadd("ske",{"mateusz": 104})
redis_connection.zadd("ske",{"robert": 62})
redis_connection.zadd("ske",{"kinga": 222})

print(redis_connection.zrange("ske",0, -1, withscores=True))
print(redis_connection.zincrby("ske",10,"kamila"))
print(redis_connection.zcount("ske",50,250))
print(redis_connection.zscore("ske","mateusz"))