from redis import Redis
redis_connection = Redis(decode_responses=True)

key ="n"
value ="kamila"

redis_connection.set(key, value)
print(redis_connection.get(key))

redis_connection.append(key," nagorska")
print(redis_connection.get(key))

redis_connection.delete(key)
print(redis_connection.get(key))