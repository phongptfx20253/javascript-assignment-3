"use strict";

// lấy elements
const inputFirstName = document.querySelector("#input-firstname");
const inputLastName = document.querySelector("#input-lastname");
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const inputPasswordConfirm = document.querySelector("#input-password-confirm");
const btnSubmit = document.querySelector("#btn-submit");

// Bắt sự kiện click vào nút register
btnSubmit.addEventListener("click", function () {
  // Lấy dữ liệu từ các Form Input
  const user = new User(
    inputFirstName.value,
    inputLastName.value,
    inputUsername.value,
    inputPassword.value
  );

  // Validate dữ liệu
  // Không có trường nào bị nhập thiếu dữ liệu.
  const validate = validateData(user);
  function validateData(user) {
    // Đặt cờ isValid
    let isValid = true;

    // Kiểm tra first name
    if (user.firstName.trim() === "") {
      alert(`Vui lòng nhập tên của bạn.`);
      isValid = false;
    }

    // Kiểm tra last name
    else if (user.lastName.trim() === "") {
      alert(`Vui lòng nhập họ của bạn.`);
      isValid = false;
    }

    // Kiểm tra username
    else if (user.username.trim() === "") {
      alert(`Vui lòng nhập tên đăng nhập.`);
      isValid = false;
    }

    // Kiểm tra password
    else if (user.password === "") {
      alert(`Vui lòng nhật mật khẩu`);
      isValid = false;
    }

    // Kiểm tra confirm password
    else if (inputPasswordConfirm.value === "") {
      alert(`Vui lòng nhập xác nhận mật khẩu.`);
      isValid = false;
    }

    // Kiểm tra password - confirm password
    else if (inputPasswordConfirm.value !== user.password) {
      alert(`Xác nhận mật khẩu không đúng.`);
      isValid = false;
    }

    // Kiểm tra password phải có nhiều hơn 8 ký tự.
    else if (user.password.length < 8) {
      alert(`Mật khẩu phải có nhiều hơn 8 ký tự.`);
      isValid = false;
    }

    // Giá trị ID không được trùng với các thú cưng còn lại. Nếu không hợp lệ, hãy đưa ra thông báo "ID must unique!".
    for (let i = 0; i < userArr.length; i++) {
      if (userArr[i].username === user.username) {
        alert(`Tên đăng nhập đã tồn tại.`);
        isValid = false;
      }
    }

    return isValid;
  }
  if (validate) {
    // Thêm người dùng vào userArr
    userArr.push(parseUser(user));

    alert(`Đã đăng ký thành công, Xin chào ${user.firstName}`);
    // Lưu dữ liệu vào LocalStorage
    saveToStorage("userArr", userArr);

    // Xóa các dữ liệu nhập trong Form Input
    clearInput();

    // chuyển sang trang login nếu đăng ký thành công
    window.location.href = "../pages/login.html";
  }
});

function clearInput() {
  inputFirstName.value = "";
  inputLastName.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  inputPasswordConfirm.value = "";
}
