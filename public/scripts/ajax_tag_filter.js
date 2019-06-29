import apiSneakersHandler from "./api_handlers/sneaker.js";

const productGrid = document.getElementById("products_grid");
const tagList = document.getElementById("tag_list");
const productsCount = document.getElementById("products_count");
const inputs = document.querySelectorAll("#tag_list input");

var currentCategory;

if (tagList) currentCategory = tagList.getAttribute("data-category");

function drawSneakers(list) {
  function render(s) {
    return `<a href="/one-product/${s._id}" class="product-item-wrapper">
        <div class="product-img">
            <img src="${s.image}" alt="${s.name} : what a nice pair of kicks">
        </div>
        <p class="product-name">${s.name}</p>
        <p class="product-cat">${s.category}</p>
        <p class="product-price">${s.price}</p>
    </a>`;
  }

  list.forEach(sneaker => {
    productGrid.innerHTML += render(sneaker);
  });
}

inputs.forEach(input => {
  input.onchange = function(evt) {
    const checkedInputs = document.querySelectorAll("#tag_list input:checked");
    const tagIds = [...checkedInputs].map(input =>
      input.getAttribute("data-tag-id")
    );

    apiSneakersHandler
      .getProductsByTagId(tagIds, currentCategory)
      .then(apiRes => {
        console.log(apiRes.data);

        productGrid.innerHTML = "";
        productsCount.textContent = apiRes.data.length;
        if (apiRes.data.length) drawSneakers(apiRes.data);
        else
          productGrid.innerHTML = "<p>sorry, no match for these criteria</p>";
      });
  };
});
