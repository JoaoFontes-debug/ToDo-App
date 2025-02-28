

let todos = [];
let AtualizarPorId = null;


function carregarTodos() {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        todos = JSON.parse(storedTodos);
    }
    listarTodos();
}


function savarTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
}


function listarTodos() {
    const todoList = document.getElementById('todoList');
    todoList.innerHTML = '';

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors';

        if (todo.id === AtualizarPorId) {
 
            const input = document.createElement('input');
            input.type = 'text';
            input.value = todo.text;
            input.className = 'flex-1 border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400';
            
            input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    updateTodo(todo.id, input.value);
                }
            });

            const saveButton = document.createElement('button');

            saveButton.textContent = 'Salvar';
            saveButton.className = 'bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded transition-colors';
            saveButton.onclick = () => updateTodo(todo.id, input.value);

            li.appendChild(input);
            li.appendChild(saveButton);

        } else {
            

            const checkbox = document.createElement('input');

            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.className = 'todo-checkbox w-5 h-5 cursor-pointer rounded border-gray-300';
            checkbox.onchange = () => toggleCompleted(todo.id);


            const span = document.createElement('span');

            span.className = `flex-1 ${todo.completed ? 'line-through text-gray-400' : 'text-gray-700'}`;
            span.textContent = todo.text;


            const editButton = document.createElement('button');

            editButton.textContent = 'Editar';
            editButton.className = 'text-blue-500 hover:text-blue-600 transition-colors';


            const deleteButton = document.createElement('button');

            deleteButton.textContent = 'Excluir';
            deleteButton.className = 'text-red-500 hover:text-red-600 transition-colors';


            editButton.onclick = () => {
                AtualizarPorId = todo.id;
                listarTodos();
            };

            deleteButton.onclick = () => deleteTodo(todo.id);

            li.appendChild(checkbox);
            li.appendChild(span);
            li.appendChild(editButton);
            li.appendChild(deleteButton);
        }

        todoList.appendChild(li);
    });
}



function addTodo(text) {
    todos.push({

        id: Date.now(),
        text,
        completed: false

    });

    savarTodos();

    listarTodos();
}



function updateTodo(id, newText) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, text: newText} : todo
    );

    AtualizarPorId = null;

    savarTodos();

    listarTodos();
}



function deleteTodo(id) {

    todos = todos.filter(todo => todo.id !== id);

    savarTodos();

    listarTodos();
}



function toggleCompleted(id) {
    todos = todos.map(todo => 
        todo.id === id ? {...todo, completed: !todo.completed} : todo
    );

    savarTodos();
    listarTodos();


}



function addTodoFromInput() {
    const input = document.getElementById('todoInput');
    const text = input.value.trim();
    
    if (text) {

        addTodo(text);
        input.value = '';
        input.focus();

    }
}



document.getElementById('todoInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodoFromInput();
    }


});


carregarTodos();