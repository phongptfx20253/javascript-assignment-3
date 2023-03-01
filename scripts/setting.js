"use strict";

const inputPageSize = document.querySelector("#input-page-size");
const inputCategory = document.querySelector("#input-category");
const btnSubmit = document.querySelector("#btn-submit");

if (currentUser) {
  inputPageSize.value = currentUser.pageSize;
  inputCategory.value = currentUser.category;

  btnSubmit.addEventListener("click", function () {
    if (inputPageSize.value === "") {
      alert(`New per page không hợp lệ, vui lòng kiểm tra lại!`);
    } else {
      // Gán lại giá trị từ input vào currentUser
      currentUser.pageSize = Number.parseInt(inputPageSize.value);
      currentUser.category = inputCategory.value;
      // Lưu vào currentUser localStorage
      saveToStorage("currentUser", currentUser);

      // Tìm index của currentUser
      const userIndex = userArr.findIndex(
        (user) => user.username === currentUser.username
      );
      // Gán lại currentUser
      userArr[userIndex] = currentUser;
      // Lưu vào localStorage
      saveToStorage("userArr", userArr);

      // Thông báo thiết lập thành công
      alert(`Thiết lập thành công !`);

      // Reset lại giá trị trường nhập liệu
      inputPageSize.value = "";
      inputCategory.value = "General";
    }
  });
} else {
  alert(`Vui lòng đăng nhập !`);
  // chuyển sang trang login nếu chưa đăng nhập
  window.location.href = "../pages/login.html";
}
