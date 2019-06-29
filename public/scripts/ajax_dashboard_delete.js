import apiHandler from "./api_handlers/sneaker.js";

const links = document.querySelectorAll(".product-manage-table .fa-trash");


function removeRow(row) {
    row.remove();
}

function removeSneaker(evt) {
    evt.preventDefault();
    apiHandler.destroy(evt.target.getAttribute("data-id-sneaker"))
    .then(apiRes => {
        removeRow(evt.target.parentElement.parentElement);
    })
    .catch(apiErr => console.error(apiErr))
}


links.forEach(link => {
    link.onclick = removeSneaker;
})