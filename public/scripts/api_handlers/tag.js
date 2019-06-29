const url = document.getElementById("site_url").getAttribute("data-url");

const handler = axios.create({
    baseURL: `${url}/api/tag/`
});

const create = (name) => handler.post("", {name});


export default {
    create
}