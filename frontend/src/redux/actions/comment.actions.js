import Axios from "../../utils/services/callerService";

export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = ' UPDATE_COMMENT';

export const getComments = () => {
    return async (dispatch) => {
        return await Axios({
            method: 'get',
            url: 'comment'
        })
            .then((res) => {
                dispatch({ type: GET_COMMENTS, payload: res.data.data })
            })
            .catch((err) => console.log(err))
    }
}

export const createComment = (data) => {
    return async (dispatch) => {
        return await Axios({
            method: 'post',
            url: 'comment',
            data
        })
            .then((res) => {
                dispatch({ type: CREATE_COMMENT, payload: data })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteComment = (id) => {
    return async (dispatch) => {
        return await Axios({
            method: 'delete',
            url: `comment/${id}`
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: id })
            })
            .catch((err) => console.log(err))
    }
}

export const updateComment = (id, data) => {
    return async (dispatch) => {
        return await Axios({
            method: 'put',
            url: `comment/${id}`,
            data
        })
            .then((res) => {
                dispatch({ type: UPDATE_COMMENT, payload: { id, data } })
            })
            .catch((err) => console.log(err))
    }
}
