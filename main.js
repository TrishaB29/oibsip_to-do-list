const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);

function createTodoItem(task) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = task;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);

  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check-circle"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

function addTodo(event) {
  event.preventDefault();
  const task = todoInput.value.trim();
  if (task !== "") {
    const todoItem = createTodoItem(task);
    todoList.appendChild(todoItem);
    saveLocalTodos(task);
    todoInput.value = "";
  }
}

function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList.contains("trash-btn")) {
    todo.classList.add("slide");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList.contains("complete-btn")) {
    todo.classList.toggle("completed");
  }
}

function filterTodo() {
  const todos = Array.from(todoList.children);
  const selectedOption = filterOption.value;

  todos.forEach((todo) => {
    const isCompleted = todo.classList.contains("completed");
    switch (selectedOption) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        todo.style.display = isCompleted ? "flex" : "none";
        break;
      case "incomplete":
        todo.style.display = isCompleted ? "none" : "flex";
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos = getLocalTodosArray();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getLocalTodosArray() {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  }
  
  function getLocalTodos() {
    const todos = getLocalTodosArray();
    todos.forEach((todo) => {
      const todoItem = createTodoItem(todo);
      todoList.appendChild(todoItem);
    });
  }
  
  function removeLocalTodos(todo) {
    const todoText = todo.querySelector(".todo-item").innerText;
    let todos = getLocalTodosArray();
    const todoIndex = todos.indexOf(todoText);
    if (todoIndex !== -1) {
      todos.splice(todoIndex, 1);
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }
 