import axios from 'axios';
import { accountServices } from './accountServices';


export const token = accountServices.getUserToken();

const dbURL = process.env.REACT_APP_BACKEND_SERVER_URL+'/api'

const Axios = axios.create({
    baseURL: dbURL,
    timeout: 5000,
})
export default Axios