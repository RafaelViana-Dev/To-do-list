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
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('task-checkbox')
            const taskText = document.createElement('span');
            taskText.textContent = text;
            taskText.classList.add('task-text');
            const task = document.createElement('li')
            task.textContent = text
            task.appendChild(checkbox);
            taskList.appendChild(task)
            
        }
        newTask.value = ''
        newTask.focus();
    }
     

});