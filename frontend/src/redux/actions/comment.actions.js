import Axios from "../../utils/services/callerService";
import { accountServices } from "../../utils/services/accountServices";

export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = ' UPDATE_COMMENT';

export const getComments = () => {
    const token = accountServices.getUserToken();
    return async (dispatch) => {
        return await Axios({
            method: 'get',
            url: 'comment',
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch({ type: GET_COMMENTS, payload: res.data.data })
            })
            .catch((err) => console.log(err))
    }
}

export const createComment = (data) => {
    const token = accountServices.getUserToken();
    return async (dispatch) => {
        return await Axios({
            method: 'post',
            url: 'comment',
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: CREATE_COMMENT, payload: data })
            })
            .catch((err) => console.log(err))
    }
}

export const deleteComment = (id) => {
    const token = accountServices.getUserToken();
    return async (dispatch) => {
        return await Axios({
            method: 'delete',
            url: `comment/${id}`,
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                dispatch({ type: DELETE_COMMENT, payload: id })
            })
            .catch((err) => console.log(err))
    }
}

export const updateComment = (id, data) => {
    const token = accountServices.getUserToken();
    return async (dispatch) => {
        return await Axios({
            method: 'put',
            url: `comment/${id}`,
            headers: { Authorization: `Bearer ${token}` },
            data
        })
            .then((res) => {
                dispatch({ type: UPDATE_COMMENT, payload: { id, data } })
            })
            .catch((err) => console.log(err))
    }
}
