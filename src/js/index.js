import "../styles/main.scss";

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const todos = [];

// Add Todos
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  if (todoName === "") return;
  todos.push(todoName);
  renderTodo(todoName);
  todoInput.value = "";
});

// Save Todos

// Delete Todos
// Complete Todos
// Load Todos

function renderTodo(todoName) {
  const templateClone = template.content.cloneNode(true);
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todoName;
  list.appendChild(templateClone);
}

function saveTodos() {}
