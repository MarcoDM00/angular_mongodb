import json, socket
import pymongo as pym
from bson.objectid import ObjectId

from flask_cors import CORS
from flask import Flask, request
app = Flask(__name__)
cors = CORS(app)

client = pym.MongoClient("mongodb+srv://admin:admin@cluster0.htz5o5w.mongodb.net/?retryWrites=true&w=majority")
db = client['Prova']
collection = db['provina']
print(list(collection.find()))

def getData():
    lista = []
    for a in collection.find():
        id = a.pop("_id")
        lista.append(a)
        print(lista)
    return lista

def cancelladb():
    collection.delete_many({})

def insertPost(post):
    collection.insert_one(post)
 
@app.route('/index',methods = ['GET'])
def index():
  return getData()

@app.route('/add',methods = ['POST'])
def add_post():
  data = request.get_json()
  try:
    post = {
      "id": data["id"],
      "title": data["title"],
      "content": data["content"],
      "like": data['like'],
      "dislike": data['dislike'],
      'img' : data['img'],
      'commenti': data['commenti']
    }
    insertPost(post)
    return {"esito": "OK"}    
  except Exception as e:
    print(e)
    return {"esito": "Errore"}



cancelladb()
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip = s.getsockname()[0]
s.close()
print(ip)
app.run(host=ip, port=8080)
