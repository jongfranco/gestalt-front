import axios from 'axios'
import store from '@/store'

const api = axios.create({
  baseURL: 'https://gestalt-search.herokuapp.com/',
  // baseURL: 'httP://localhost:3001',
  timeout: 120000,
  headers: {
    'Content-Type': 'application/json'
  }
})

api.interceptors.request.use(config => {
  store.commit('changeLoadingStatus', true)
  return config
}, error => {
  // Handle errors
  console.log(error)
})

api.interceptors.response.use(response => {
  store.commit('changeLoadingStatus', false)
  return response
}, error => {
  // Handle errors
  console.log(error)
})

export default api
