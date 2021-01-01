from redis import Redis
redis_connection = Redis(decode_responses=True)

list_key ="example-list"

print(redis_connection.lpop(list_key))
print(redis_connection.rpop(list_key))
print(redis_connection.lrange(list_key, 0, -1))