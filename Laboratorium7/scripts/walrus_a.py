from walrus import *
db = Database(host='localhost', port=6379, db=0)

#jest to odpowiednik SET test 11
db['test']=11 

redis_list = db.List('test_list')

#odpowiednik RPUSH test_list 22
redis_list.append('22')
#to również RPUSH
redis_list.extend([22,44])

redis_set = db.Set('test_set')

#odpowiednik SADD test_set 22
redis_set.add(22)
#odpowiednik SREM, który usuwa określony element ze zbioru o określonym kluczu
redis_set.remove(22)

redis_sorted_set = db.ZSet('test_sorted_set')
#odpowiednik ZADD
redis_sorted_set.add({'w': 11,"e": 33})

