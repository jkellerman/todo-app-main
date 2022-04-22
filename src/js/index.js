import "../styles/main.scss";
import { sampleTodos } from "./sampletodos";

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.getElementById("list");
const LOCAL_STORAGE_PREFIX = "FE_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
const all = document.querySelectorAll(".all-btn");
const active = document.querySelectorAll(".active-btn");
const completed = document.querySelectorAll(".completed-btn");
const clear = document.querySelector("#clear");
const itemsLeft = document.querySelector("[data-items-left]");
const toggle = document.querySelector(".toggle");
// Store listItems
const listItems = [];

let todos = loadTodos();
todos.forEach((todo) => {
  createTodo(todo);
  saveTodos();
});

// items left

itemsLeft.innerText = `${todos.length} items left`;

// Submit new todo
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let listTotal = list.children.length;
  const todoName = todoInput.value;
  if (todoName === "") return;
  const newTodo = {
    text: todoName,
    complete: false,
    id: new Date().valueOf().toString(),
  };
  todos.push(newTodo);
  saveTodos(); //   save to local storage
  todoInput.value = "";
  listTotal++;
  itemsLeft.innerText = `${listTotal} items left`;
  //   Add new todo to DOM
  createTodo(newTodo);
});

// detect change when checkbox is checked

list.addEventListener("change", (e) => {
  if (!e.target.matches("[data-list-item-checkbox]")) return;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  const item = listItems.find((t) => t.dataset.todoId === todoId);
  todo.complete = item.firstElementChild.firstElementChild.checked;
  saveTodos();
});

//  Delete items when button is clicked

list.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-btn")) return;
  let listTotal = list.children.length;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  // remove todo from list
  parent.remove();
  // remove todo from localstorage
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
  //   decrease items left
  listTotal--;
  itemsLeft.innerText = `${listTotal} items left`;
});

// clear completed button is clicked remove items

clear.addEventListener("click", () => {
  const newList = [...list.children];

  let listTotal = list.children.length;
  newList.forEach((item) => {
    if (item.firstElementChild.firstElementChild.checked == true) {
      const itemId = item.dataset.todoId;
      item.remove();
      todos = todos.filter((todo) => todo.id !== itemId);
      saveTodos();
      listTotal--;
      itemsLeft.innerText = `${listTotal} items left`;
    }
  });
});

// When all button is clicked, show all items

all.forEach((element) => {
  element.addEventListener("click", () => {
    const newList = [...list.children];
    newList.forEach((item) => {
      item.style.display = "flex";
    });
    all.forEach((element) => {
      element.style.color = "var(--Bright-Blue)";
    });
  });
});

// When active button is clicked show active items

active.forEach((element) => {
  element.addEventListener("click", () => {
    const newList = [...list.children];
    newList.forEach((item) => {
      if (item.firstElementChild.firstElementChild.checked == true) {
        item.style.display = "none";
      } else {
        item.style.display = "flex";
      }
    });
    all.forEach((element) => {
      element.style.color = "inherit";
    });
  });
});

completed.forEach((element) => {
  element.addEventListener("click", () => {
    const newList = [...list.children];
    newList.forEach((item) => {
      if (item.firstElementChild.firstElementChild.checked == true) {
        item.style.display = "flex";
      } else {
        item.style.display = "none";
      }
    });
    all.forEach((element) => {
      element.style.color = "inherit";
    });
  });
});

// Switch theme

toggle.addEventListener("click", () => {
  const body = document.querySelector("body");
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    body.classList.remove("dark-mode");
    body.classList.toggle("light-mode");
  } else if (window.matchMedia("(prefers-color-scheme:light)").matches) {
    body.classList.remove("light-mode");
    body.classList.toggle("dark-mode");
  } else {
    body.classList.toggle("dark-mode");
  }
});

// Insert listItems into DOM

function createTodo(todo) {
  const listItem = document.createElement("li");
  listItem.classList.add("list-item");
  listItem.setAttribute("draggable", true);
  listItem.setAttribute("data-todo-id", todo.id);
  listItem.innerHTML = `
          <label class="list-item-label">
            <input type="checkbox" data-list-item-checkbox />
            <span class="list-item-text" data-list-item-text
              >${todo.text}</span
            >
          </label>
          <button class="delete-btn">
          </button>`;
  listItems.push(listItem);
  list.appendChild(listItem);
  listItem.firstElementChild.firstElementChild.checked = todo.complete;
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [...sampleTodos];
}
function removeTodos() {
  const todosString = localStorage.removeItem(TODOS_STORAGE_KEY);
}
