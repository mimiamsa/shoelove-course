const url = document.getElementById("site_url").getAttribute("data-url");

const handler = axios.create({
  baseURL: `${url}/api/sneaker`
});

const getProductsByTagId = (ids, cat) => {
  var tagQueries = ""; // initializing an empty string
  
  ids.forEach((id, i) => { // parsing each id (if any)
    tagQueries += `id_tag_${i}=${id}`; // append infos to the query string (key:value)
    // so for each id, we'll end up with :
    // id_tag_0=5d176b38c158be0ae19a50ab&id_tag_1=5d176eb11d3aba0bdbb49863 , etc.
    if (ids.length > 1 && i < ids.length - 1) tagQueries += "&";
  });
  // next, the full query string will contain the current category (men, women, kids)
  // 
  const fullQuery = `?category=${cat}${tagQueries.length ? '&' : ""}${tagQueries}`;
  // return the axios promise performed with the query param
  return handler.get(`/by-tags-ids${fullQuery}`);
};

// delete a sneaker
const destroy = id => handler.delete(`/${id}`);

export default {
  getProductsByTagId,
  destroy
};
