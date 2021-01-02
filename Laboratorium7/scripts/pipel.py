import time
from redis import Redis
redis_connection = Redis(decode_responses=True, db=0)

key = "test"
redis_connection.set(key, 0)

tic1=time.perf_counter()
i = 1000
while i >= 0:
    redis_connection.incr(key)
    i -= 1
toc1=time.perf_counter()
print(f"1. time: {toc1-tic1}")

tic2=time.perf_counter()
j = 1000
with redis_connection.pipeline() as pipe:
    while j >= 0:
        pipe.incr(key)
        j -= 1
    pipe.execute()
toc2=time.perf_counter()
print(f"2. time: {toc2-tic2}")



