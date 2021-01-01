from redis import Redis
redis_connection = Redis(decode_responses=True)

list_key ="example-list"

while True:
    print(redis_connection.blpop(list_key))