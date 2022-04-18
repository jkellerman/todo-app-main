import "../styles/main.scss";

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");

// Add Todos
// User will type in todo and submit
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  if (todoName === "") return;
  renderTodo(todoName);
  todoInput.value = "";
});

// Delete Todos
// Complete Todos
// Save Todos
// Load Todos

function renderTodo(todoName) {
  const templateClone = template.content.cloneNode(true);
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todoName;
  list.appendChild(templateClone);
}
