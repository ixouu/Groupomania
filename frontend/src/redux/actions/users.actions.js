import Axios from "../../utils/services/callerService";

export const GET_USERS = 'GET_USERS';

export const getUsers = () => {
    return (dispatch) => {
        return Axios.get("/user")
        .then((res)=> {
            dispatch({type: GET_USERS, payload : res.data.data.users})
        })
        .catch((err) => console.log(err))
    }
}