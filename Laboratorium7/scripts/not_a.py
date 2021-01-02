from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)
redis_connection.config_set('notify-keyspace-events','K$')

pub_sub = redis_connection.pubsub()
pub_sub.subscribe('__keyspace@0__:test_key')

for message in pub_sub.listen():
    print(message)