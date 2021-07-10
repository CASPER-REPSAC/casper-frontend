import axios from "axios";

export const WEB_SERVER_URL = "http://localhost:3000";
export const API_SERVER_URL = "http://localhost:8000";

const baseURL = API_SERVER_URL;

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
