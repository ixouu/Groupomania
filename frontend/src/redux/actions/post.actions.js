import Axios from "../../utils/services/callerService";
import { accountServices } from "../../utils/services/accountServices";
import toast from 'react-hot-toast';

export const CREATE_POST = 'CREATE_POST';
export const LIKE_POST = 'LIKE_POST';
export const DISLIKE_POST = 'DISLIKE_POST';
export const GET_POSTS = 'GET_POSTS';
export const DELETE_POST = 'DELETE_POST'
export const ADMIN_DELETE_POST = 'ADMIN_DELETE_POST';
export const ADMIN_EDIT_POST = 'ADMIN_EDIT_POST';
export const EDIT_POST = 'EDIT_POST';

export const getPosts = () => {
    const token = accountServices.getUserToken();
    return  (dispatch) => {
        return Axios({
            method: 'get',
            url: 'post',
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data.posts })
            })
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const createPost = (data) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'post',
            url: 'post',
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: CREATE_POST, payload: '' })
            })
            .then( toast.success('Poste créé', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const likePost = (postId, data, userId) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `post/like-post/${postId}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                userId: data.userId,
                like: data.like
            }
        })
            .then((res) => {
                dispatch({ type: LIKE_POST, payload: { postId, userId } })
            })
            .then( toast.success('Post liké', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const dislikePost = (postId, data, userId) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `post/like-post/${postId}`,
            headers: { Authorization: `Bearer ${token}` },
            data: {
                userId: data.userId,
                like: data.like
            }
        })
            .then((res) => {
                // console.log({...data})
                dispatch({ type: DISLIKE_POST, payload: { postId, userId } })
            })
            .then( toast.success('Like supprimé', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const adminDeletePost = (id) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'delete',
            url: `post/admin/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch({ type: ADMIN_DELETE_POST, payload: { id } })
            })
            .then( toast.success('Commentaire créé', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const deletePost = (id, data) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'delete',
            url: `post/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: DELETE_POST, payload: { id } })
            })
            .then( toast.success('Poste supprimé', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const adminEditPost = (id, data) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `post/admin/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: ADMIN_EDIT_POST, payload: { id, data } })
            })
            .then( toast.success('Poste modifié', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}

export const editPost = (id, data) => {
    const token = accountServices.getUserToken();
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `post/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                console.log(res.data)
                dispatch({ type: EDIT_POST, payload: res.data, id })
            })
            .then( toast.success('Post modifié', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}