"use strict";

const newsContainer = document.querySelector("#news-container");
const defaultImg = "../img/no-image-found.jpg";
const btnPrev = document.querySelector("#btn-prev");
const btnNext = document.querySelector("#btn-next");
const pageNum = document.querySelector("#page-num");

if (currentUser) {
  let totalResults = 0;
  let country = "us";
  let category = currentUser.category;
  let pageSize = currentUser.pageSize;
  let page = 1;

  const loadNews = async function (country, page) {
    try {
      // const dataFetch = await fetch(
      //   `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=d76f69ee348d41aab703a661306b114b`
      const dataFetch = await fetch(
        `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&pageSize=${pageSize}&page=${page}&apiKey=${apiKey}`
      );

      const dataNews = await dataFetch.json();
      totalResults = dataNews.totalResults;
      console.log(dataNews);
      displayNews(dataNews);

      if (dataNews.status === "error" || dataNews.code === "rateLimited")
        throw new Error(dataNews.message);
    } catch (err) {
      alert(`Đã có lỗi xảy ra: ${err.message}`);
    }
  };

  loadNews(country, page);

  function displayNews(news) {
    checkPage();
    let html = "";
    news.articles.forEach(function (article) {
      html += `
      <div class="card flex-row flex-wrap">
      <div class="card mb-3" style="">
        <div class="row no-gutters">
          <div class="col-md-4 col-lg-3">
            <img src="${
              article.urlToImage ? article.urlToImage : defaultImg
            }" class="card-img"
              alt="${article.title}">
          </div>
          <div class="col-md-8 col-lg-9">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.content}</p>
              <a href="${article.url}"
                class="btn btn-primary">View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    `;
    });

    newsContainer.innerHTML = html;
  }

  function checkPage() {
    // Nếu ở trang 1 thì ẩn nút PREVIOUS
    if (pageNum.textContent == 1) {
      btnPrev.style.display = "none";
    } else {
      btnPrev.style.display = "block";
    }

    // Nếu trang hiện tại * pageSize > totalResults thì ẩn nút NEXT
    if (pageSize * pageNum.textContent >= totalResults) {
      btnNext.style.display = "none";
    } else {
      btnNext.style.display = "block";
    }
  }

  btnPrev.addEventListener("click", function () {
    page--;
    pageNum.textContent = page;
    loadNews(country, page);
  });
  btnNext.addEventListener("click", function () {
    page++;
    pageNum.textContent = page;
    loadNews(country, page);
  });
} else {
  alert(`Vui lòng đăng nhập !`);
  // chuyển sang trang login nếu chưa đăng nhập
  window.location.href = "../pages/login.html";
}
