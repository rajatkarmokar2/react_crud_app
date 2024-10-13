import axios from 'axios'

const baseurl = axios.create( {
    baseURL: 'http://localhost:5000/api/v1/'
    // baseURL: 'https://mongo-node-crud-api.netlify.app/.netlify/functions/api/' // wrong api
} )

export default baseurl