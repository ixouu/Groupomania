import Axios from "../../utils/services/callerService";

export const CREATE_POST = 'CREATE_POST';
export const LIKE_POST = 'LIKE_POST';
export const DISLIKE_POST = 'DISLIKE_POST'
export const GET_POSTS = 'GET_POSTS';

export const getPosts= () => {
    return (dispatch) => {
        return Axios({
            method: 'get',
            url : 'post'
        })
        .then((res)=> {
            dispatch({type: GET_POSTS, payload : res.data.posts})
        })
        .catch((err) => console.log(err))
    }
}

export const createPost = (data) => {
    return (dispatch) => {
        return Axios({
            method : 'post',
            url : 'post',
            data
        })
        .then((res) => {
            dispatch({type: CREATE_POST, payload: data})
        })
        .catch((err) => console.log(err))
    }
}

export const likePost = (postId, data, userId) => {
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `post/like-post/${postId}`,
            data : {
                userId : data.userId,
                like : data.like
            }
        })
        .then((res) => {
            // console.log({...data})
            dispatch({type: LIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}

export const dislikePost = (postId, data, userId) => {
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `post/like-post/${postId}`,
            data : {
                userId : data.userId,
                like : data.like
            }
        })
        .then((res) => {
            // console.log({...data})
            dispatch({type: DISLIKE_POST, payload: {postId, userId}})
        })
        .catch((err) => console.log(err))
    }
}
