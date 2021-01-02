from redis import Redis
redis_connection = Redis(decode_responses=True)

hash_key ='h'

redis_connection.hset(hash_key,'name','kamila')
redis_connection.hset(hash_key,'lname','nagorska')
redis_connection.hset(hash_key,'password','123')