from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)

stream_name ='tstr'

while True:
    message = redis_connection.xread({stream_name: '$'}, block=50, count=1)
    print(message)