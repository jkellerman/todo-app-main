import "../styles/main.scss";
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const list = document.querySelector("#list");
const listItems = Array.from(list.children);
const template = document.querySelector("#list-item-template");
const LOCAL_STORAGE_PREFIX = "FE_TODO_LIST";
const TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-todos`;
const DEFAULT_TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-default-todos`;
const REMOVED_DEFAULT_TODOS_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-removed-default-todos`;
const ITEMS_LEFT_STORAGE_KEY = `${LOCAL_STORAGE_PREFIX}-items-left-total`;
const all = document.querySelectorAll(".all-btn");
const active = document.querySelectorAll(".active-btn");
const completed = document.querySelectorAll(".completed-btn");
const clear = document.querySelector("#clear");
const itemsLeft = document.querySelector("[data-items-left]");
const toggle = document.querySelector(".toggle");

// ======== On reload
let todos = loadTodos();
todos.forEach((todo) => renderTodo(todo));
let defaultTodos = loadDefaultTodos();
defaultTodos.forEach((todo) => renderDefaultTodo(todo));
let removedDefaultTodos = loadRemovedDefaultTodos();
removedDefaultTodos.forEach((todo) => {
  const removedDefaultTodoId = todo.id;
  const listItem = listItems.find(
    (item) => item.dataset.todoId === removedDefaultTodoId
  );
  listItem.remove();
});
let newTotal = loadItemsTotal();
itemsLeft.innerText = `${newTotal} items left`;

// ===========

list.addEventListener("change", (e) => {
  if (!e.target.matches(["[data-list-item-checkbox]"])) return;
  if (listItems.includes(e.target.closest(".list-item"))) return;
  // Get the todo that is checked
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  const todo = todos.find((t) => t.id === todoId);
  todo.complete = e.target.checked;
  saveTodos();
});

list.addEventListener("change", (e) => {
  if (!e.target.matches(["[data-list-item-checkbox]"])) return;
  if (!listItems.includes(e.target.closest(".list-item"))) return;

  //   add default todos to local storage
  const parent = e.target.closest(".list-item");
  const defaultTodo = {
    name: parent.innerText,
    complete: false,
    id: parent.dataset.todoId,
  };
  defaultTodos = defaultTodos.filter((todo) => todo.id !== defaultTodo.id);
  defaultTodos.push(defaultTodo);
  const defaultTodoId = defaultTodo.id;
  const checkedDefault = defaultTodos.find((t) => t.id === defaultTodoId);
  checkedDefault.complete = e.target.checked;
  saveDefaultTodos();
});

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;
  if (listItems.includes(e.target.closest(".list-item"))) return;
  let listTotal = document.querySelector("#list").children.length;
  const parent = e.target.closest(".list-item");
  const todoId = parent.dataset.todoId;
  // remove todo from list
  parent.remove();
  // remove todo from localstorage
  todos = todos.filter((todo) => todo.id !== todoId);
  saveTodos();
  //   update items left
  listTotal--;
  itemsLeft.innerText = `${listTotal} items left`;
  newTotal.splice(0, 1, listTotal);
  saveItemsTotal();
});

list.addEventListener("click", (e) => {
  if (!e.target.matches("[data-button-delete]")) return;
  if (!listItems.includes(e.target.closest(".list-item"))) return;
  let listTotal = document.querySelector("#list").children.length;
  const parent = e.target.closest(".list-item");
  const removedDefaultTodo = {
    name: parent.innerText,
    complete: false,
    id: parent.dataset.todoId,
  };
  // remove todo from list
  parent.remove();
  // add to removed list in localstorage
  removedDefaultTodos.push(removedDefaultTodo);
  saveRemovedDefaultTodos();
  //   update items left
  listTotal--;
  itemsLeft.innerText = `${listTotal} items left`;
  newTotal.splice(0, 1, listTotal);
  saveItemsTotal();
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoName = todoInput.value;
  let listTotal = document.querySelector("#list").children.length;
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
  listTotal++;
  itemsLeft.innerText = `${listTotal} items left`;
  newTotal.splice(0, 1, listTotal);
  saveItemsTotal();
});

// When all button is clicked, show all items

all.forEach((element) => {
  element.addEventListener("click", () => {
    const newList = Array.from(document.querySelector("#list").children);
    newList.forEach((item) => {
      item.style.display = "flex";
    });
    all.forEach((element) => {
      element.style.color = "var(--Bright-Blue)";
    });
  });
});

// When active button is clicked

active.forEach((element) => {
  element.addEventListener("click", () => {
    const newList = Array.from(document.querySelector("#list").children);
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

// When completed button is clicked

completed.forEach((element) => {
  element.addEventListener("click", () => {
    const newList = Array.from(document.querySelector("#list").children);
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

// clear completed button is clicked

clear.addEventListener("click", () => {
  const newList = Array.from(document.querySelector("#list").children);
  let listTotal = document.querySelector("#list").children.length;
  newList.forEach((item) => {
    if (listItems.includes(item.closest(".list-item"))) return;
    if (item.firstElementChild.firstElementChild.checked == true) {
      const itemId = item.dataset.todoId;
      item.remove();
      todos = todos.filter((todo) => todo.id !== itemId);
      saveTodos();
      listTotal--;
      itemsLeft.innerText = `${listTotal} items left`;
      newTotal.splice(0, 1, listTotal);
      saveItemsTotal();
    }
  });
});

clear.addEventListener("click", () => {
  const newList = Array.from(document.querySelector("#list").children);
  let listTotal = document.querySelector("#list").children.length;
  newList.forEach((item) => {
    if (!listItems.includes(item.closest(".list-item"))) return;
    if (item.firstElementChild.firstElementChild.checked == true) {
      const removedDefaultTodo = {
        name: item.innerText,
        complete: false,
        id: item.dataset.todoId,
      };
      item.remove();
      removedDefaultTodos.push(removedDefaultTodo);
      saveRemovedDefaultTodos();
      listTotal--;
      itemsLeft.innerText = `${listTotal} items left`;
      newTotal.splice(0, 1, listTotal);
      saveItemsTotal();
    }
  });
});

// Theme switcher

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

function renderDefaultTodo(todo) {
  const defaultTodoId = todo.id;
  const listItem = listItems.find(
    (item) => item.dataset.todoId === defaultTodoId
  );
  const listItemChild = listItem.firstElementChild.firstElementChild;
  listItemChild.checked = todo.complete;
}

function saveTodos() {
  localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
}
function saveDefaultTodos() {
  localStorage.setItem(DEFAULT_TODOS_STORAGE_KEY, JSON.stringify(defaultTodos));
}

function saveRemovedDefaultTodos() {
  localStorage.setItem(
    REMOVED_DEFAULT_TODOS_STORAGE_KEY,
    JSON.stringify(removedDefaultTodos)
  );
}

function saveItemsTotal() {
  localStorage.setItem(ITEMS_LEFT_STORAGE_KEY, JSON.stringify(newTotal));
}

function loadTodos() {
  const todosString = localStorage.getItem(TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}
function loadDefaultTodos() {
  const todosString = localStorage.getItem(DEFAULT_TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}
function loadRemovedDefaultTodos() {
  const todosString = localStorage.getItem(REMOVED_DEFAULT_TODOS_STORAGE_KEY);
  return JSON.parse(todosString) || [];
}

function loadItemsTotal() {
  const todosString = localStorage.getItem(ITEMS_LEFT_STORAGE_KEY);
  return JSON.parse(todosString) || [6];
}
