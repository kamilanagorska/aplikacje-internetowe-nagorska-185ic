from redis import Redis
redis_connection = Redis(decode_responses=True)

list_key ="example-list"

redis_connection.rpush(list_key,10,11,12,13,14,15)
print(redis_connection.lrange(list_key,2,4))