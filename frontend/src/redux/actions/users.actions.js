import Axios from "../../utils/services/callerService";

export const GET_USERS = 'GET_USERS';
export const ADMIN_UPDATE_USER = 'ADMIN_UPDATE_USER';

export const getUsers = () => {
    return (dispatch) => {
        return Axios.get("/user")
            .then((res) => {
                dispatch({ type: GET_USERS, payload: res.data.data.users })
            })
            .catch((err) => console.log(err))
    }
}


export const adminUpdateUser = (userId, data) => {
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/admin/${userId}`,
            data
        })
            .then((res) => {
                dispatch({ type: ADMIN_UPDATE_USER, payload: [userId, { data }] })
            })
            .catch((err) => console.log(err))
    }
}