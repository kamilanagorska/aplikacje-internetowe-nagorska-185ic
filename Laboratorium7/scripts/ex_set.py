from redis import Redis
redis_connection = Redis(decode_responses=True)

redis_connection.sadd("s","mateusz")
redis_connection.sadd("s","kamila")
redis_connection.sadd("s","kinga")
redis_connection.sadd("s","robert")

print(redis_connection.smembers("s"))