const API_BASE = 'http://localhost:3000';

// Load all todos
async function fetchTodos() {
  const res = await fetch(`${API_BASE}/todos`);
  const todos = await res.json();
  const list = document.getElementById('todo-list');
  list.innerHTML = '';

  todos.forEach(todo => {
    const li = document.createElement('li');
    li.innerHTML = `
      <input type="checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete('${todo._id}', this.checked)">
      <span style="${todo.completed ? 'text-decoration: line-through;' : ''}">${todo.title}</span>
      <button onclick="deleteTodo('${todo._id}')">🗑️</button>
    `;
    list.appendChild(li);
  });
}

// Add a new todo
async function addTodo() {
  const input = document.getElementById('todoInput');
  const title = input.value.trim();
  if (!title) return;

  await fetch(`${API_BASE}/todos`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title })
  });

  input.value = '';
  fetchTodos();
}

// Toggle completed
async function toggleComplete(id, completed) {
  await fetch(`${API_BASE}/todos/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ completed })
  });

  fetchTodos();
}

// Delete todo
async function deleteTodo(id) {
  await fetch(`${API_BASE}/todos/${id}`, {
    method: 'DELETE'
  });

  fetchTodos();
}

fetchTodos();
