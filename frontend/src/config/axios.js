import axios from 'axios';

const API = axios.create({
    baseURL:"https://backendalkemy-production.up.railway.app/",
    headers: {'X-Custom-Header': 'foobar'}
});

export default API;