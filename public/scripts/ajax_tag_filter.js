import apiSneakersHandler from "./api_handlers/sneaker.js";

const links = document.querySelectorAll(".category-list-item");

links.forEach(link => {
    link.onclick = function(evt) {
        evt.preventDefault();
        apiSneakersHandler.getProductsByTagId(evt.target.getAttribute("data-tag-id"))
        .then(apiRes => {
            console.log(apiRes)
        })
    }
});
