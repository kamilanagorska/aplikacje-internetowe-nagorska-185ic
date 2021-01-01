from redis import Redis
from time import sleep
from datetime import datetime

redis_connection = Redis(decode_responses=True)

redis_connection.set("k","kamila")
redis_connection.expire("k",20)

print(datetime.now().time(), redis_connection.get("k"))
sleep(10)
print(datetime.now().time(), redis_connection.get("k"))
sleep(15)
print(datetime.now().time(), redis_connection.get("k"))