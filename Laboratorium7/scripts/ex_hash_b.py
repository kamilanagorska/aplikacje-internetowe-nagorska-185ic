from redis import Redis
redis_connection = Redis(decode_responses=True)

hash_key ='h'

print(redis_connection.hkeys(hash_key))
print(redis_connection.hexists(hash_key, 'name'))
print(redis_connection.hexists(hash_key, 'age'))
print(redis_connection.hvals(hash_key))