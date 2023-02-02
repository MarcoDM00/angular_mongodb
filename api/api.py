import socket
from bson.objectid import ObjectId
import pymongo as pym

from flask_cors import CORS
from flask import Flask, request
app = Flask(__name__)
cors = CORS(app)

client = pym.MongoClient("mongodb+srv://admin:admin@cluster0.htz5o5w.mongodb.net/?retryWrites=true&w=majority")
db = client['Prova']
collection = db['provina']

def getData():
    lista = []
    for a in collection.find():
        a["_id"] = str(a["_id"])
        lista.append(a)
    return lista

def insertPost(post):
    id = collection.insert_one(post)
    return str(id.inserted_id)

def cancelladb():
    collection.delete_many({})

def delete(id):
   collection.delete_one({"_id": ObjectId(id)})

def update(post):
   collection.update_one({"_id": ObjectId(post['id'])}, {"$set": {
      "like": post['like'],
      "dislike": post['dislike'],
      "commenti": post['commenti'],
   }})
 
@app.route('/index',methods = ['GET'])
def index():
  return getData()

@app.route('/add',methods = ['POST'])
def add_post():
  try:
    data = request.get_json()
    post = {
      "title": data["title"],
      "content": data["content"],
      "like": data['like'],
      "dislike": data['dislike'],
      'img' : data['img'],
      'commenti': data['commenti']
    }
    id = insertPost(post)
    return {"esito": "OK add", "id": id}
  except Exception as e:
    print(e)
    return {"esito": "Errore add"}

@app.route('/delete', methods = ['POST'])
def delete_post():
  try:
   data = request.get_json()
   id = data['id']
   delete(id)
   return {"esito": "OK delete"}
  except Exception as e:
   print(e)
   return {"esito": "Errore delete"}
  
@app.route('/update', methods = ['POST'])
def update_post():
   try:
      data = request.get_json()
      post = {
        "id": data['id'],
        "like": data['like'],
        "dislike": data['dislike'],
        'commenti': data['commenti']
      }
      update(post)
      return {"esito": "OK update"}
   except Exception as e:
      print(e)
      return {"esito": "Errore update"}

cancelladb()
s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
s.connect(("8.8.8.8", 80))
ip = s.getsockname()[0]
s.close()
print(ip)
app.run(host=ip, port=8080)
