import axios from "axios";

export const WEB_SERVER_URL = `${process.env.REACT_APP_FRONT_SERVER_BASE_URL}`;
export const API_SERVER_URL = `${process.env.REACT_APP_BACK_SERVER_BASE_URL}`;

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
