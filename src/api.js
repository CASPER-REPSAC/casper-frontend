import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function getAllPosts() {
  return axios.get('/posts');
}

function createPost(data) {
  return axios.post('/posts', data);
}

export { getAllPosts, createPost };
