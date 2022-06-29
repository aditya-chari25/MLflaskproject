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
    conn = MongoClient('localhost', 27017)
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
minq=0
maxq=0

@app.route('/')
def returnAll():
    db1=db['file_corpus']
    print("hello")
    arr_x=[]
    sum=0
    for x in db1.find():
        sum = sum + len(x['contents'])
    print(sum)
    return json.dumps(col_array)

@app.route('/<name>',methods=['GET'])
def returnIds(name):
    global vartemp
    # coll_display = db[name]
    global var_collections 
    var_collections=[]
    query = {'ticker_symbol':name}
    mydoc = db['file_corpus'].find(query)
    for x in mydoc:
            var_collections.append(x)
    # for rec in coll_display.find():
    #     var_collections.append(rec)
    colec = json_util.dumps(var_collections)
    return jsonify(colec)

@app.route('/<name>/<ids>',methods=['GET','POST'])
def returnques(name,ids):
    global query
    print(ids)
    query = {'_id':ObjectId(ids)}
    all_docs=[]

    alldocs1 = db['file_corpus'].find(query)
    for x in alldocs1:
        all_docs=json_util.dumps(x)

    return jsonify(all_docs)

@app.route('/<name>/<ids>/<con>',methods=['GET','POST'])
def returnques1(name,ids,con):
    global query
    print(ids)
    query = {'_id':ObjectId(ids)}
    all_docs=[]

    alldocs1 = db['file_corpus'].find(query)
    # print(alldocs1)
    for x in alldocs1:
        #print(x)
        all_docs=json_util.dumps(x)

    return jsonify(all_docs)

@app.route('/checker/<name>/<ids>/<con>',methods=['GET'])
def checklabel(name,ids,con):
    if(con=="undefined"):
        con='0'
    query = {'file_id':ids,'sentnum':con}
    dbins = db['labelled_sentences']
    arrvar=[]
    alldor = dbins.find(query)
    for x in alldor:
        if(x['sentnum']==con):
            arrvar.append(x['labels'])
    retlabel={}
    if(len(arrvar)):
        retlabel={'labels':arrvar,'present':'yes'}
        return retlabel
    else:
        retlabel={'labels':[],'present':'no'}
        return retlabel

@app.route('/updater/<name>/<ids>/<con>/<item1>/<item2>/<item3>/<item4>/<item5>/<item6>',methods=['GET'])
def updation(name,ids,con,item1,item2,item3,item4,item5,item6):
    print("welcome to updation:-")
    arr = [item1,item2,item3,item4,item5,item6]
    arrins=[]
    for arr1 in arr:
        if(arr1 != "na"):
            arrins.append(arr1)
    #---------------------------------------------------------------
    arr1 = ["Relevance","Sentiment","Type","Timeline","Bfr","Extm"]
    dblabeller = db['topic_labels']
    tracking=[]
    k=0
    for x in arr1:
        query1 = {'set_name':x}
        quesearch=dblabeller.find(query1)
        print(quesearch)
        for y in quesearch:
            for z in y['labels_array']:
                print('inside labels_array:',z)
                if(arr[k]=="na"):
                    print(k)
                else:
                    if(arr[k]==z['label_name']):
                        tracking.append({arr[k]:z['label_id']})
                        print(k)
        k=k+1
    #---------------------------------------------------------------
    dbins = db['labelled_sentences']
    dbins.update_one({"file_id":ids,'sentnum':con},{"$set":{"labels":arrins,"labelling":tracking}})
    mes = {'first':arrins}
    return mes


@app.route('/<name>/<ids>/<con>/<item1>/<item2>/<item3>/<item4>/<item5>/<item6>',methods=['GET','POST'])
def array_postnum(name,ids,con,item1,item2,item3,item4,item5,item6):

    arr = [item1,item2,item3,item4,item5,item6]
    arrins=[]
    for arr1 in arr:
        if(arr1 != "na"):
            arrins.append(arr1)
    print(arrins)
    #-----------------------------------------------------------------------------------
    dbins = db['labelled_sentences']
    all_docs=[]
    query = {'_id':ObjectId(ids)}
    alldocs1 = db['file_corpus'].find(query)
    print(alldocs1)
    for x in alldocs1:
        all_docs.append(x)
    #-------------------------------------------------------------------------------------
    arr1 = ["Relevance","Sentiment","Type","Timeline","Bfr","Extm"]
    dblabeller = db['topic_labels']
    tracking=[]
    k=0
    for x in arr1:
        query1 = {'set_name':x}
        quesearch=dblabeller.find(query1)
        print(quesearch)
        for y in quesearch:
            for z in y['labels_array']:
                print('inside labels_array:',z)
                if(arr[k]=="na"):
                    print(k)
                else:
                    if(arr[k]==z['label_name']):
                        tracking.append({arr[k]:z['label_id']})
                        print(k)
        k=k+1
    print(tracking)
    #---------------------------------------------------------------------------------------

    dbins.insert_one({'file_id':ids,'company':name,'sentnum':con,'labels':arrins,'sentence':all_docs[0]['contents'][int(con)],'labelling':tracking})
    print(all_docs[0]['contents'][int(con)])
    success = {'first':arrins}
    return success

# @app.route('/labeling/<name>/<ids>/<con>',methods=['GET','POST'])
# def array_post(name,ids,con):
#     if request.method =='POST':
#         a = request.form.getlist("contacts[]")
#         for x in a:
#             print(x)
#     print("I am in array_post function",name,ids,con)
#     return " "