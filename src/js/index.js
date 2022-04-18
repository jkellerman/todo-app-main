import "../styles/main.scss";

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "FE_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
let todos = loadTodos();
todos.forEach((todo) => renderTodo(todo));

list.addEventListener("change", (e) => {
  if (!e.target.matches(["[data-list-item-checkbox]"])) return;

  //   Get the todo that is checked
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;
  saveTodos();
});

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;

  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  // remove todo from screen
  parent.remove();
  // remove todo from list
  todos = todos.filter((todo) => todo.id !== todoId);
  // save todos
  saveTodos();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  if (todoName === "") return;
  const newTodo = {
    name: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  todos.push(newTodo);
  renderTodo(newTodo);
  saveTodos();
  todoInput.value = "";
});

// Delete Todos
// Complete Todos

function renderTodo(todo) {
  const templateClone = template.content.cloneNode(true);
  const listItem = templateClone.querySelector(".list-item");
  listItem.dataset.todoId = todo.id;
  const textElement = templateClone.querySelector("[data-list-item-text]");
  textElement.innerText = todo.name;
  const checkbox = templateClone.querySelector("[data-list-item-checkbox]");
  checkbox.checked = todo.complete;
  list.appendChild(templateClone);
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}
