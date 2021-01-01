from redis import Redis
redis_connection = Redis(decode_responses=True)

list_key ="example-list"

print(redis_connection.lrange(list_key, 0, -1))
print(redis_connection.lindex(list_key,2))
print(redis_connection.llen(list_key))