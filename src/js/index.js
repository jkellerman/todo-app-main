import "../styles/main.scss";
import { sampleTodos } from "./sampletodos";
import Sortable from "sortablejs";

const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.getElementById("list");
const LOCAL_STORAGE_PREFIX = "FE_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
const THEME_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-theme`;
const all = document.querySelectorAll(".all-btn");
const active = document.querySelectorAll(".active-btn");
const completed = document.querySelectorAll(".completed-btn");
const clear = document.querySelector("#clear");
const itemsLeft = document.querySelector("[data-items-left]");
const toggle = document.querySelector(".toggle");
const body = document.querySelector("body");
const listItems = [];

// ==========  On page reload
let todos = loadTodos();
todos.map((todo) => {
  createTodo(todo);
  saveTodos();
});

itemsLeft.innerText = `${todos.length} items left`;
//  ==========================

// Switch theme

let theme = JSON.parse(localStorage.getItem(THEME_STORAGE_KEY)) || "";
if (theme == JSON.parse(localStorage.getItem(THEME_STORAGE_KEY))) {
  body.classList.add(`${theme}-mode`);
} else {
  body.classList.remove(`${theme}-mode`);
}

toggle.addEventListener("click", () => {
  if (window.matchMedia("(prefers-color-scheme:dark)").matches) {
    body.classList.toggle("light-mode");
    if (body.classList.contains("light-mode")) {
      theme = "light";
      saveTheme();
    } else {
      theme = "";
      removeTheme();
      body.classList.remove("light-mode");
    }
  } else if (!window.matchMedia("(prefers-color-scheme:dark)").matches) {
    body.classList.toggle("dark-mode");
    if (body.classList.contains("dark-mode")) {
      theme = "dark";
      saveTheme();
    } else {
      theme = "";
      removeTheme();
      body.classList.remove("dark-mode");
    }
  }
});

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

//  Delete items when buttons are clicked
list.addEventListener("click", (e) => {
  if (!e.target.matches(".delete-btn")) return;
  let listTotal = list.children.length;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  parent.remove(); // remove todo from list
  todos = todos.filter((todo) => todo.id !== todoId); // remove todo from localstorage
  saveTodos();
  listTotal--;
  itemsLeft.innerText = `${listTotal} items left`;
});

// when clear completed button is clicked, remove items
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

// When completed button is clicked show completed items
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

// drag & drop (sortableJS)
let sortable = new Sortable(list, {
  animation: 100,
  draggable: ".list-item",
  onSort: () => {
    let items = [...list.children];
    let results = [];
    let localStorageBefore = loadTodos();
    let localStorageAfter = [];

    items.forEach((item) => results.push(item.dataset.todoId));
    results.forEach((result) => {
      let found = false;
      localStorageBefore.forEach((item, index) => {
        if (found) return;
        if (item.id == result) {
          localStorageAfter.push(item);
          localStorageBefore.splice(index, 1);
          found = true;
        }
      });
    });
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(localStorageAfter));
  },
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
            <span class="checkbox-background"></span>
            <span class="checkbox-foreground"></span>
          </label>
          <button aria-label="Close" class="delete-btn">
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

function saveTheme() {
  localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
}

function removeTheme() {
  localStorage.removeItem(THEME_STORAGE_KEY);
}
