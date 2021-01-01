from redis import Redis
redis_connection = Redis(decode_responses=True)

redis_connection.zadd("skey",{"kamila": 1})
redis_connection.zadd("skey",{"kasia": 1})
redis_connection.zadd("skey",{"mateusz": 1})
redis_connection.zadd("skey",{"robert": 1})
redis_connection.zadd("skey",{"kinga": 1})

print(redis_connection.zrange("skey",0, -1, withscores=True))