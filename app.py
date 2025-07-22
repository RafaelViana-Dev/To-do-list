import sqlite3
import json
from flask import Flask, request, jsonify
app = Flask(__name__)

database = 'sqlite-python/dados.db'

@app.route('/todo/getall',methods=['GET'])
def getTasks():
    with sqlite3.connect(database) as conn:
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM task')
        dados = cursor.fetchall()
    return jsonify(dados)

@app.route('/todo/create',methods=['POST'])
def createTask():
    return 'Create new task'

@app.route('/todo/update',methods=['UPDATE'])
def updateTask():
    return 'Update task'

@app.route('/todo/delete',methods=['DELETE'])
def deleteTask():
    return 'Delete task'

if __name__ == '__main__':
    app.run(debug=True)