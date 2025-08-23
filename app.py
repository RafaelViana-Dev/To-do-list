import sqlite3
import json
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

database = 'sqlite-python/dados.db'

CORS(app)

#API - GET
@app.route('/todo/getall',methods=['GET'])
def getTasks():
    with sqlite3.connect(database) as conn:
        cursor = conn.cursor()
        
        cursor.execute('SELECT * FROM task')
        dados = cursor.fetchall()
    return jsonify(dados)

@app.route('/todo/create',methods=['POST'])
def createTask():
    req_data = request.get_json()
    task_nome = req_data['nome']
    task_descricao = req_data['descricao']

    with sqlite3.connect(database) as conn:
        cursor = conn.cursor()

        cursor.execute('INSERT INTO task (nome, descricao) VALUES (?, ?)', (task_nome, task_descricao,))
        new_id = cursor.lastrowid
        req_data['id'] = new_id
    return jsonify(req_data)
    #return 'Create new task'

@app.route('/todo/update/<int:task_id>',methods=['PUT'])
def updateTask(task_id):
    req_data = request.get_json()
    task_nome = req_data['nome']
    task_descricao = req_data['descricao']

    with sqlite3.connect(database) as conn:
        cursor = conn.cursor()

        cursor.execute('UPDATE task SET nome = ?, descricao = ? WHERE id = ?', (task_nome, task_descricao, task_id,))

    return jsonify(req_data)

@app.route('/todo/delete/<int:task_id>',methods=['DELETE'])
def deleteTask(task_id):
    with sqlite3.connect(database) as conn:
        cursor = conn.cursor()

        cursor.execute('DELETE from task WHERE id = ?', (task_id,))
    return jsonify({"message": "Tarefa deletada com sucesso!", "id_deletado": task_id})

if __name__ == '__main__':
    app.run(debug=True)