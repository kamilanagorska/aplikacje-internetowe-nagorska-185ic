from walrus import *

db = Database(host='localhost', port=6379, db=0)

class Book(Model):
    __database__ = db
    id= UUIDField()
    title = TextField()
    description = TextField()
    pages = IntegerField()
    tags = SetField

book = Book.create(title="Opowieści po zmroku", description="czyli jak się nie bać", pages=250, tags={'straszne','dla młodzieży'})
