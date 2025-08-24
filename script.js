
document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('.inputArea');
    const taskInput = document.getElementById('newTask')
    const taskDescricao = document.getElementById('description')
    const taskList = document.getElementById('taskList')
    const apiUrl = 'http://127.0.0.1:5000';
    
    async function loadTasks() {
        try {
            const response = await fetch(`${apiUrl}/todo/getall`);
            if (!response.ok) {
                throw new Error('Erro ao buscar tarefas');
            }
            const tasks = await response.json();
            // O backend retorna uma lista de listas, ex: [[1, 'Nome', 'Desc']]
            tasks.forEach(taskData => {
                const taskObject = { 
                    id: taskData[0], 
                    nome: taskData[1], 
                    descricao: taskData[2],
                    concluido: taskData.length > 3 ? taskData[3] : 0
                };
                addTaskToUI(taskObject);
            });
        } catch (error) {
            console.error('Falha ao carregar tarefas:', error);
            alert('Não foi possível carregar as tarefas.');
        }
    }
     
    function addTaskToUI(task) {
        
        const taskItem = document.createElement('li');
        if (task.concluido === 1) { 
            taskItem.classList.add('completed');
        }

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.concluido === 1;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'X'; 
        deleteBtn.classList.add('delete-btn');

        const taskTextSpan = document.createElement('span');
        taskTextSpan.textContent = task.nome;
        taskTextSpan.classList.add('task-text');

        checkbox.addEventListener('change', async function(){
            taskItem.classList.toggle('completed');
            const isCompleted = this.checked;

            try {
                const response = await fetch(`${apiUrl}/todo/update/${task.id}`, {
                    method: 'PUT', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        nome: task.nome, 
                        descricao: task.descricao, 
                        concluido: isCompleted ? 1 : 0
                    }),
                });
                if (!response.ok) throw new Error('Erro ao atualizar tarefa');
            } catch (error) {
                console.error('Falha ao atualizar status: ', error);
                alert('Não foi possível atualizar o status da tarefa. ');
                this.checked = !isCompleted;
                taskItem.classList.toggle('completed');
            }
        });

         deleteBtn.addEventListener('click', async function() {
            try{ 
              const response = await fetch(`${apiUrl}/todo/delete/${task.id}`, {
                method: 'DELETE',
              });
              if (!response.ok) {
                  throw new Error('Erro ao adicionar a tarefa');
              }
              taskItem.remove();

            } catch (error) {
                console.error('Falha ao deletar: ', error);
                alert('Não foi possível deletar a tarefa.');
            }
        });
 
        taskList.appendChild(taskItem);
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskTextSpan);
        taskItem.appendChild(deleteBtn);
    }



     form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim();
        const descriptionTask = taskDescricao.value.trim();

        if (taskText === '') {
            alert('Por favor, insira o nome da tarefa.');       
            return;
        }


        const newTaskData = {
            nome: taskText,
            descricao: descriptionTask
        };

        try {
            const response = await fetch(`${apiUrl}/todo/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTaskData),
           
        });

        if (!response.ok) {
            throw new Error('Erro ao criar tarefa');
        }

        const createdTask = await response.json(); 
        addTaskToUI(createdTask);

        taskInput.value = ''; 
        taskDescricao.value = '';
        taskInput.focus();

    } catch (error) {
        console.error('Falha na requisição:', error);
        alert('Não foi possível adicionar a tarefa.');
    }
    });
    loadTasks();

});
