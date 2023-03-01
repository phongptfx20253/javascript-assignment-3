"use strict";

const loginModal = document.querySelector("#login-modal");
const mainContent = document.querySelector("#main-content");
const welcomeMessage = document.querySelector("#welcome-message");
const btnLogout = document.querySelector("#btn-logout");
const btnSubmit = document.querySelector("#btn-submit");

function home() {
  if (currentUser) {
    loginModal.style.display = "none";
    mainContent.style.display = "block";
    welcomeMessage.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    loginModal.style.display = "block";
    mainContent.style.display = "none";
  }
}

home();

btnLogout.addEventListener("click", function () {
  const isConfirm = confirm("Bạn có chắc chắc muốn đăng xuất?");
  if (isConfirm) {
    // Xoá currentUser trong localStorage để đăng xuất
    localStorage.removeItem("currentUser");

    // chuyển sang trang home (Refresh lại trang)
    window.location.href = "../index.html";
  }
});
