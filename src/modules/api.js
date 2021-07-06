import axios from "axios";
const baseURL = "http://localhost:8000";

function getPost(post_id) {
  return axios.get(baseURL + "/boards/posts/" + post_id + "/");
}

function getCategory(category_id) {
  return axios.get(baseURL + "/boards/categories/" + category_id + "/");
}

function getDataByURL(url) {
  return axios.get(url);
}

export { getPost, getCategory, getDataByURL };
