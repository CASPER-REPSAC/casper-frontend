import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8000';

function getAllPosts() {
  return axios.get('/posts/?format=json');
}

function getPost(id) {
  return axios.get('/posts/' + id + '/?format=json');
}

function getBoard(id) {
  return axios.get('boards/' + id + '/?format=json');
}

function createPost(data) {
  return axios.post('/posts', data);
}

function getDataByUrl(url) {
  return axios.get(url);
}

export { getAllPosts, getPost, getBoard, createPost, getDataByUrl };
