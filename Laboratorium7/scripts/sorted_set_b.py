from redis import Redis
redis_connection = Redis(decode_responses=True)

redis_connection.zadd("skey",{"kamila": 11})
redis_connection.zadd("skey",{"kasia": 3})
redis_connection.zadd("skey",{"mateusz": 200})
redis_connection.zadd("skey",{"robert": 5})
redis_connection.zadd("skey",{"kinga": 4})

print(redis_connection.zrange("skey",0, -1))