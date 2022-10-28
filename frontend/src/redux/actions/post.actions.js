import Axios from "../../utils/services/callerService";
import { accountServices } from "../../utils/services/accountServices";


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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
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
            .catch((err) => console.log(err))
    }
}