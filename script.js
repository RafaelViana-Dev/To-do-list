
document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('.inputArea');
    const taskInput = document.getElementById('newTask')
    const taskList = document.getElementById('taskList')
    const apiUrl = 'http://localhost:3000/tasks';
    

     form.addEventListener('submit', async function(event) {
        event.preventDefault();

        const taskText = taskInput.value.trim() 
        if (taskText === '') return;
        

        const newTaskData = {
        nome: taskText,
        completed: false // Você pode adicionar outros campos que seu back-end espera
    };

    try {
        // 2. Fazendo a requisição POST com o fetch
        const response = await fetch('http://localhost:3000/tasks', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // Informa ao back-end que estamos enviando JSON
            },
            body: JSON.stringify(newTaskData), // Converte o objeto JavaScript em uma string JSON
        });

        if (!response.ok) {
            throw new Error('Erro ao adicionar a tarefa');
        }

        const createdTask = await response.json(); // Converte a resposta do back-end (que deve ser a tarefa criada) de volta para um objeto JS

        // 3. Adiciona a nova tarefa na interface do usuário (UI)
        addTaskToUI(createdTask);

        taskInput.value = ''; 
        taskInput.focus();
    } catch (error) {
        console.error('Falha na requisição:', error);
        alert('Não foi possível adicionar a tarefa.');
    }
    });

    function addTaskToUI(task) {
        
            const taskItem = document.createElement('li');
            taskItem.setAttribute('data-id', task.id);

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox')

            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = task.title;
            taskTextSpan.classList.add('taskTextSpan');

            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('deleteBtn');  // class do botão de excluir
            
            
            checkbox.addEventListener('change', function() {
                taskItem.classList.toggle('completed'); // Adiciona/remove a classe 'completed' do <li>
            });

            deleteBtn.addEventListener('click', function() {
               console.log(`Deletar tarefa com ID: ${task.id}`);
            });

            // Adiciona a função de marcar como concluída ao checkbox
            

             taskList.appendChild(taskItem)
            taskItem.appendChild(checkbox)
            taskItem.appendChild(taskTextSpan)
            taskItem.appendChild(deleteBtn)
              
        }
       
    
     

});
