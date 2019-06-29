const url = document.getElementById("site_url").getAttribute("data-url");

const handler = axios.create({
  baseURL: `${url}/api/sneaker`
});

const getProductsByTagId = (ids, cat) => {
  var tagQueries = "";
  ids.forEach((id, i) => {
    tagQueries += `id_tag_${i}=${id}`;
    if (ids.length > 1 && i < ids.length - 1) tagQueries += "&";
  });
  return handler.get(`/by-tags-ids?category=${cat}&` + tagQueries);
};

const destroy = id => handler.delete(`/${id}`);

export default {
  getProductsByTagId,
  destroy
};
