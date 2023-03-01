"use strict";

// Lấy elements
const inputUsername = document.querySelector("#input-username");
const inputPassword = document.querySelector("#input-password");
const btnSubmit = document.querySelector("#btn-submit");

btnSubmit.addEventListener("click", function (e) {
  const validate = validateData();

  // Hàm validate kiểm tra xem người dùng đã nhập thông tin đăng nhập hay chưa
  function validateData() {
    // Đăt cờ isValid
    let isValid = true;

    // Kiểm tra username
    if (inputUsername.value === "") {
      alert(`Vui lòng nhập tên đăng nhập.`);
      isValid = false;
    }

    // Kiểm tra password
    else if (inputPassword.value === "") {
      alert(`Vui lòng nhật mật khẩu`);
      isValid = false;
    }

    return isValid;
  }
  if (validate) {
    // Tìm kiếm user trong mảng userArr với thông tin người dùng nhập vào xem có hay không?
    const user = userArr.find(
      (user) =>
        user.username === inputUsername.value &&
        user.password === inputPassword.value
    );

    if (user) {
      // Lưu thông tin user đăng nhập hiện tại vào localStorage
      saveToStorage("currentUser", user);

      alert(`Đăng nhập thành công, Xin chào ${user.firstName}`);

      // chuyển sang trang home
      window.location.href = "../index.html";
    } else {
      alert(`Sai tài khoản hoặc mật khẩu, vui lòng thử lại !`);
    }
  }
});
