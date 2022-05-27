from flask import Flask, jsonify, render_template
from matplotlib.font_manager import json_dump
from pymongo import MongoClient
from flask import request
from flask_cors import CORS, cross_origin
from flask import jsonify
from bson.json_util import loads, dumps
from bson import ObjectId, json_util
import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'application/json'

try:
    conn = MongoClient()
    print("Connected successfully!!!")
except:  
    print("Could not connect to MongoDB")

db=conn.mlproject

col_array =[]
for coll_name in db.list_collection_names():
    col_array.append(str(coll_name))

vartemp=[]
var_collections=[]
query=[]

@app.route('/')
def returnAll():
    return json.dumps(col_array)

@app.route('/<name>',methods=['GET'])
def returnIds(name):
    global vartemp
    coll_display = db[name]
    global var_collections 
    var_collections=[]
    for rec in coll_display.find():
        var_collections.append(rec)
    colec = json_util.dumps(var_collections)
    return jsonify(colec)

@app.route('/<name>/<ids>',methods=['GET','POST'])
def returnques(name,ids):
    global query
    print(ids)
    query = {'_id':ObjectId(ids)}
    all_docs=[]

    alldocs1 = db[name].find(query)
    for x in alldocs1:
        print(x)
        all_docs=json_util.dumps(x)

    return jsonify(all_docs)

@app.route('/<name>/<ids>/<con>',methods=['GET','POST'])
def returnques1(name,ids,con):
    global query
    print(ids)
    query = {'_id':ObjectId(ids)}
    all_docs=[]

    alldocs1 = db[name].find(query)
    for x in alldocs1:
        print(x)
        all_docs=json_util.dumps(x)

    return jsonify(all_docs)
