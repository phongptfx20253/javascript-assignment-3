"use strict";

const btnAdd = document.querySelector("#btn-add");
const inputTask = document.querySelector("#input-task");
const todoList = document.querySelector("#todo-list");
/* 
Đầu tiên, bạn sẽ xử lý việc người dùng thêm mới một Todo List. Bạn cần tạo một Class mới là Task để chứa các thông tin về Task trong Todo List. Class này sẽ bao gồm các trường như sau:

task: Nội dung công việc.
owner: username của người tạo ra task.
isDone: Task này đã hoàn thành hay chưa.
Sau đó, bạn cần tạo một mảng todoArr để chứa các Instance tượng trưng cho mỗi task. Và lưu dữ liệu đó xuống dưới LocalStorage.

Mỗi khi người dùng nhấn vào nút để thêm mới một Todo, bạn sẽ xử lý việc lấy dữ liệu từ Input, các trường thông tin sẽ như sau:

task: được lấy từ thẻ input mà người dùng nhập vào.
owner: Username sẽ lấy theo User hiện đang login vào hệ thống.
isDone: Khi tạo mới thì mặc định là false.
Sau đó, bạn sẽ thêm phần tử này vào todoArr và cập nhật xuống LocalStorage.
*/

// Kiểm tra currentUser xem đã đăng nhập hay chưa
// Tạo hàm displayTask hiển thị task
// Lọc ra user có username trùng với currentUser hiện tại
// Lặp qua mỗi task gán vào biến html để hiển thị ra template
if (currentUser) {
  function displayTask() {
    let html = "";
    todoArr
      .filter((todo) => todo.owner == currentUser.username)
      .forEach((todo) => {
        html += `
      <li ${todo.isDone ? 'class="checked"' : ""}>${
          todo.task
        }<span class="close">×</span></li>
      `;
      });

    todoList.innerHTML = html;

    taskCheck();
    deleteTask();
  }

  displayTask();

  function taskCheck() {
    // Lấy tất cả các li element của todo-list
    const liEls = document.querySelectorAll("#todo-list li");

    // Lặp qua mỗi li element
    liEls.forEach((liEl) => {
      // Bắt sự kiện click vào li element
      liEl.addEventListener("click", function (e) {
        if (e.target !== liEl.children[0]) {
          // Thêm class checked vào thẻ li khi click vào và ngược lại
          liEl.classList.toggle("checked");

          // Tìm task với currentUser
          const task = todoArr.find(
            (todo) =>
              todo.owner === currentUser.username &&
              todo.task ===
                liEl.textContent.substring(0, liEl.textContent.length - 1)
            // liEL.textContent sẽ lấy phần nội dung của thẻ li, bao gồm cả dấu x delete trong thẻ span nên dùng hàm substring cắt chuỗi từ vị trí đầu đến vị trí cuối - 1 của chuỗi.
          );

          // Nếu thẻ li có chứa class checked thì sẽ là true và ngược lại.
          task.isDone = liEl.classList.contains("checked") ? true : false;

          // Lưu vào localStorage
          saveToStorage("todoArr", todoArr);
        }
      });
    });
  }

  function deleteTask() {
    // Lấy tất cả các phần tử chứa class close
    const closes = document.querySelectorAll("#todo-list .close");
    closes.forEach(function (closeEl) {
      // Bắt sự kiện click vào nút xoá (class close)
      closeEl.addEventListener("click", function () {
        const isConfirm = confirm("Bạn chắc chắc muốn xoá Task này?");

        if (isConfirm) {
          // Tìm index của task tương ứng với currentUser
          const taskIndex = todoArr.findIndex(
            (task) =>
              task.owner === currentUser.username &&
              task.task ===
                closeEl.parentElement.textContent.substring(
                  0,
                  closeEl.parentElement.textContent.length - 1
                )
          );

          // Xoá 1 phần tự tại vị trí taskIndex trong mảng todoArr
          todoArr.splice(taskIndex, 1);

          // Lưu vào localStorage
          saveToStorage("todoArr", todoArr);

          // Hiển thị lại danh sách task
          displayTask();
        }
      });
    });
  }

  btnAdd.addEventListener("click", function () {
    if (inputTask.value === "") {
      alert("Vui lòng nhập Task cần thêm vào !!!");
    } else {
      const todo = new Todo(inputTask.value, currentUser.username, false);

      // Thêm vào mảng todoArr và lưu xuống localStorage
      todoArr.push(todo);
      saveToStorage("todoArr", todoArr);

      inputTask.value = "";
      displayTask();
    }
  });
} else {
  alert("Vui lòng đăng nhập !");
  // chuyển sang trang login
  window.location.href = "../pages/login.html";
}
