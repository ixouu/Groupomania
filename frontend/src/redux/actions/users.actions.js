import Axios from "../../utils/services/callerService";
import { accountServices } from "../../utils/services/accountServices";

export const GET_USERS = 'GET_USERS';
export const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER';

export const getUsers = () => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method : 'get',
            url :'/user',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data.data.users })
            })
            .catch((err) => console.log(err))
    }
}


export const adminUpdateUser = (userId, data) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/admin/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: ADMIN_UPDATE_USER, payload: [userId, { data }] })
            })
            .catch((err) => console.log(err))
    }
}