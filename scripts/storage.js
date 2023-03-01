"use strict";

// Các biến toàn cục
const apiKey = "ae2f34e58c6c4c74b1cebc30fe2d9e87";

function saveToStorage(key, value) {
  // localStorage.setItem(key, value);
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromStorage(key, defaultValue) {
  return JSON.parse(localStorage.getItem(key)) ?? defaultValue;
}
const user1 = {
  firstName: "Phong",
  lastName: "Pham",
  username: "phongpham",
  password: "phongpham",
  pageSize: 10,
  category: "Business",
};

let currentUser = getFromStorage("currentUser")
  ? parseUser(getFromStorage("currentUser"))
  : null;

const users = getFromStorage("userArr")
  ? getFromStorage("userArr")
  : saveToStorage("userArr", [user1]);

// Chuyển về dạng Class Instance
const userArr = users.map((user) => parseUser(user));

const todos = getFromStorage("todoArr") ? getFromStorage("todoArr") : [];

const todoArr = todos.map((todo) => parseTodo(todo));

// Lưu ý: Do khi lưu xuống LocalStorage, bạn chỉ có thể lưu được các JS Object chứ không phải Class Instance (chỉ lưu được các thuộc tính chứ các hàm trong class đó sẽ không lưu được). Bạn sẽ cần viết một hàm để chuyển từ JS Object sang Class Instance như sau:
function parseUser(userData) {
  const user = new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password,
    userData.pageSize,
    userData.category
  );

  return user;
}

function parseTodo(todoData) {
  const todo = new Todo(todoData.task, todoData.owner, todoData.isDone);

  return todo;
}
