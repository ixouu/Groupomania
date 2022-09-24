import Axios from "../../utils/services/callerService";

export const CREATE_POST = 'CREATE_POST';
export const LIKE_POST = 'LIKE_POST'

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

export const likePost = (postId, data) => {
    return (dispatch) => {
        return Axios({
            method : 'put',
            url : `post/like-post/${postId}`,
            data
        })
        .then((res) => {
            dispatch({type: LIKE_POST,payload: data})
        })
        .catch((err) => console.log(err))
    }
}