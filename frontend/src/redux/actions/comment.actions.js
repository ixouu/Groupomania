import Axios from "../../utils/services/callerService";

export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const getComments = () => {
    return (dispatch) => {
        return Axios({
            method : 'get',
            url : 'comment'
        })
        .then((res)=> {
            dispatch({type: GET_COMMENTS, payload: res.data.data})
        })
        .catch((err) => console.log(err))
    }
}

export const createComment = (data) => {
    return (dispatch) => {
        return Axios({
            method : 'post',
            url : 'comment',
            data
        })
        .then((res) => {
            dispatch({type: CREATE_COMMENT, payload: data })
        })
        .catch((err) => console.log(err))
    }
} 

export const deleteComment = (id) => {
    return (dispatch) => {
        return Axios({
            method : 'delete',
            url : `comment/${id}`
        })
        .then((res) =>{
            dispatch({type : DELETE_COMMENT, payload : id })
        })
        .catch((err) => console.log(err))
    }
} 
