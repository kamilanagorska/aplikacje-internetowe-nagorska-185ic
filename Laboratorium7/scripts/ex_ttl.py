from redis import Redis
from time import sleep
from datetime import datetime

redis_connection = Redis(decode_responses=True)

redis_connection.setex("k",20,"kamila")

print(datetime.now().time(), redis_connection.get("k"))
sleep(10)
print(datetime.now().time(), redis_connection.get("k"))
sleep(15)
print(datetime.now().time(), redis_connection.get("k"))