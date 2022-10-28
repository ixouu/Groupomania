import Axios from "../../utils/services/callerService";
import { accountServices } from "../../utils/services/accountServices";
import toast from 'react-hot-toast';

export const GET_USER = 'GET_USER';
export const UPDATE_USER = 'UPDATE_USER'
export const UPLOAD_PHOTO = 'UPLOAD_PHOTO'
export const ADD_FOLLOWER = 'ADD_FOLLOWER'
export const ADD_FOLLOWING = 'ADD_FOLLOWING'
export const REMOVE_FOLLOWER = 'REMOVE_FOLLOWER'
export const REMOVE_FOLLOWING = 'REMOVE_FOLLOWING'
export const LOGOUT = 'LOGOUT'


export const getUser = (userId) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'get',
            url:`user/${userId}`,
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                dispatch({ type: GET_USER, payload: res.data.data })
            })
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const updateUser = (userId, bio) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data: { bio }
        })
            .then((res) => {
                dispatch({ type: UPDATE_USER, payload: bio })
            })
            .then( toast.success('Profil mis à jour', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const uploadPhoto = (userId, data) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                return Axios({
                    method: 'get',
                    url: `http://localhost:5000/api/user/${userId}`,
                })
                    .then((res) => {
                        dispatch({ type: UPLOAD_PHOTO, payload: res.data.photo })
                    })
                    .then( toast.success('Photo mis à jour', {
                        duration: 2000
                    }))
            })
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const addFollower = (userId, data, followerId) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/add-follower-user/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: ADD_FOLLOWER, payload: followerId })
            })
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const addFollowing = (userId, data, userIdToFollow) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/add-following-user/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: ADD_FOLLOWING, payload: userIdToFollow })
            })
            .then( toast.success('Vous suivez cet utilisateur', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const removeFollower = (userId, data, followerId) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/remove-follower/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: REMOVE_FOLLOWER, payload: followerId })
            })
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const removeFollowing = (userId, data, userIdToRemove) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `user/remove-following/${userId}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: REMOVE_FOLLOWER, payload: userIdToRemove })
            })
            .then( toast.success('Vous ne suivez plus cet utilisateur', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const logoutRedux = () => {
    return (dispatch) => {
        dispatch({type: LOGOUT});
    }
}

