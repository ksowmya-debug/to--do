const API_URL = "http://localhost:8080/todos";

const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

// Load todos when page opens
loadTodos();

addBtn.addEventListener("click", addTodo);

// Get all todos from backend
async function loadTodos() {
    taskList.innerHTML = "";

    const response = await fetch(API_URL);
    const todos = await response.json();

    todos.forEach(todo => {
        createTodoElement(todo);
    });
}

// Add new todo
async function addTodo() {
    const text = taskInput.value.trim();

    if (text === "") {
        alert("Enter a task");
        return;
    }

    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: text,
            completed: false
        })
    });

    const savedTodo = await response.json();

    createTodoElement(savedTodo);

    taskInput.value = "";
}

// Create UI element
function createTodoElement(todo) {
    const li = document.createElement("li");

    li.innerHTML = `
        <span>${todo.title}</span>
        <button class="delete-btn">Delete</button>
    `;

    li.querySelector(".delete-btn").addEventListener("click", async () => {
        await deleteTodo(todo.id);
        li.remove();
    });

    taskList.appendChild(li);
}

// Delete todo
async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });
}