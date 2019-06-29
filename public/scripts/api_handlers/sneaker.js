const url = document.getElementById("site_url").getAttribute("data-url");

const handler = axios.create({
    baseURL: `${url}/api/sneaker`
});

const getProductsByTagId = (id) => handler.get(`/all/${id}`);

const destroy = (id) => handler.delete(`/${id}`);


export default {
    getProductsByTagId,
    destroy
}