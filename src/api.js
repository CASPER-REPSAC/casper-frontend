import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function getAllPosts() {
  return axios.get('/posts/?format=json');
}

function getPost(id) {
  return axios.get('/posts/' + id + '/?format=json');
}

function createPost(data) {
  return axios.post('/posts', data);
}

export { getAllPosts, getPost, createPost };
