from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)

stream_name ='tstr'

redis_connection.xadd(stream_name,{'test_key': 'test_value'})
message = redis_connection.xread({stream_name: '0-0'}, block=None, count=3)
print(message)