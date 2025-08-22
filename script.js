document.addEventListener('DOMContentLoaded', function() {

    const form = document.querySelector('.inputArea')
    const newTask = document.getElementById('newTask')
    const taskList = document.getElementById('taskList')
    const addTaskbtn = document.getElementById('addTaskbtn')

    

    form.addEventListener('submit', addTask);

    function addTask(event) {
        event.preventDefault();
        const text = newTask.value.trim() 
           
        if (text !== ''){
            const task = document.createElement('li');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox')
            
            const taskText = document.createElement('span');
            taskText.textContent = text;
            const deleteBtn = document.createElement('button')
            deleteBtn.textContent = 'X';
            deleteBtn.classList.add('deleteBtn');  // class do botão de excluir
            taskText.classList.add('task-text');
            
            checkbox.addEventListener('change', function() {
                task.classList.toggle('completed'); // Adiciona/remove a classe 'completed' do <li>
            });

            deleteBtn.addEventListener('click', function() {
                taskList.removeChild(task); // Remove o <li> (a tarefa inteira) da lista
            });

            // Adiciona a função de marcar como concluída ao checkbox
            

             taskList.appendChild(task)
            task.appendChild(checkbox)
            task.appendChild(taskText)
            task.appendChild(deleteBtn)
           
            
        }
        newTask.value = ''
        newTask.focus();
    }
     

});
