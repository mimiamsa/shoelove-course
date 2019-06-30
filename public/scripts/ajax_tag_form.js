import apiTagHandler from "./api_handlers/tag.js";

const input = document.getElementById("new_tag_name");
const btn = document.getElementById("btn_new_tag");
const tagList = document.getElementById("tags");
const tagMessage = document.getElementById("add-tag-message");

function addTagOption(id) {
    tagList.innerHTML += `<option value="${id}">${input.value}</option>`;
    input.value = "";
}

function addMessage(status, clbk) {
    tagMessage.innerHTML = "Tag succesfully created";
    tagMessage.className += "status";
    setTimeout(() => {
        tagMessage.className = "message"
        tagMessage.innerHTML = "";
    }, 4000);
    clbk()
}

btn.onclick = function (evt) {
    if (input.value && input.value.length >= 3) {
        apiTagHandler.create(input.value)
            .then((apiRes) => {
                addTagOption(apiRes.data._id);
                addMessage("success");
            })
            .catch((apiErr) => console.warn(apiErr))
    } else {
        alert("wrong tag format")
    }
}