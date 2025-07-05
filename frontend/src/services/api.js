import axios from 'axios'

const API = axios.create({
  baseURL: 'http://localhost:5000/api', 
  headers: {
    'Content-Type': 'application/json'
  }
})


API.interceptors.request.use(config => {
  return config
})

export default API