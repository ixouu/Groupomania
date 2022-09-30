import Axios from "../../utils/services/callerService";


export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER'
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const ADD_FOLLOWING = 'ADD_FOLLOWING'
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING'


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

export const addFollower = (userId, data, followerId ) => {
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `user/add-follower-user/${userId}`,
            data
        })
        .then((res) => {
            dispatch({type : ADD_FOLLOWER , payload : followerId })
        })
        .catch((err) => console.log(err))
    }
}

export const addFollowing = (userId, data,userIdToFollow ) => {
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `user/add-following-user/${userId}`,
            data
        })
        .then((res) => {
            dispatch({type : ADD_FOLLOWING, payload : userIdToFollow })
        })
        .catch((err) => console.log(err))
    }
}

export const removeFollower = (userId, data, followerId) => {
    return (dispatch) => {
        return Axios({
            method: 'put',
            url : `user/remove-follower/${userId}`,
            data
        })
        .then((res) => {
            dispatch({ type : REMOVE_FOLLOWER, payload : followerId })
        })
        .catch((err) => console.log(err))
    }
}

export const removeFollowing = (userId, data, userIdToRemove) => {
    return (dispatch) => {
        return Axios({
            method: 'put',
            url : `user/remove-following/${userId}`,
            data
        })
        .then((res) => {
            dispatch({ type : REMOVE_FOLLOWER, payload : userIdToRemove })
        })
        .catch((err) => console.log(err))
    }
}
