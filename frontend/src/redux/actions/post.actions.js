import Axios from "../../utils/services/callerService";

export const CREATE_POST = 'CREATE_POST';
export const LIKE_POST = 'LIKE_POST';
export const DISLIKE_POST = 'DISLIKE_POST';
export const GET_POSTS = 'GET_POSTS';
export const DELETE_POST = 'DELETE_POSTS';
export const ADMIN_EDIT_POST = 'ADMIN_EDIT_POST'

export const getPosts = () => {
    return (dispatch) => {
        return Axios({
            method: 'get',
            url: 'post'
        })
            .then((res) => {
                dispatch({ type: GET_POSTS, payload: res.data.posts })
            })
            .catch((err) => console.log(err))
    }
}

export const createPost = (data) => {
    return (dispatch) => {
        return Axios({
            method: 'post',
            url: 'post',
            data
        })
            .then((res) => {
                dispatch({ type: CREATE_POST, payload: '' })
            })
            .catch((err) => console.log(err))
    }
}

export const likePost = (postId, data, userId) => {
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `post/like-post/${postId}`,
            data: {
                userId: data.userId,
                like: data.like
            }
        })
            .then((res) => {
                // console.log({...data})
                dispatch({ type: LIKE_POST, payload: { postId, userId } })
            })
            .catch((err) => console.log(err))
    }
}

export const dislikePost = (postId, data, userId) => {
    return (dispatch) => {
        return Axios({
            method: 'put',
            url: `post/like-post/${postId}`,
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

export const deletePost = (id) => {
    return (dispatch) => {
        return Axios({
            method: 'delete',
            url: `post/${id}`
        })
        .then((res) => {
           dispatch({type: DELETE_POST, payload: { id } }) 
        })
        .catch((err) => console.log(err))
    }
}

export const adminEditPost = (id, data) => {
    console.log(id)
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `post/admin/${id}`,
            data
        })
        .then((res) => {
            dispatch({type: ADMIN_EDIT_POST, payload: { id, data } }) 
            })
            .catch((err) => console.log(err))
        }
    }