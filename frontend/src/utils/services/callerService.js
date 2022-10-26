import axios from 'axios'
import { accountServices } from './accountServices'

let token = accountServices.getUserToken();
console.log(token);


const Axios = axios.create({
    baseURL: 'http://localhost:5000/api/',
    timeout: 5000,
    headers: { Authorization: `Bearer ${token}` }
})
export default Axios