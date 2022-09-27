import Axios from "../../utils/services/callerService";


export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER'
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'



export const getUser = (userId) => {
    return (dispatch) => {
        return Axios.get(`user/${userId}`)
        .then((res) => {
            dispatch({type : GET_USER, payload : res.data.data})
        })
        .catch((err) => console.log(err))
    }
}

export const updateUser = (userId, bio) => {
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `user/${userId}`,
            data: { bio }
        })
        .then((res) => {
            dispatch({ type: UPDATE_USER , payload: bio})
        })
        .catch((err) => console.log(err))
    }
}

export const uploadPhoto = (userId, data) => {
    console.log(userId)
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `user/${userId}`,
            data 
        })
        .then((res) => {
            return Axios({
                method: 'get',
                url : `http://localhost:5000/api/user/${userId}`,
            })
            .then((res) =>{
                dispatch({ type: UPLOAD_PHOTO, payload: res.data.photo})
            })
        })
        .catch((err) => console.log(err))
    }
}
