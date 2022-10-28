import Axios from "../../utils/services/callerService";
import { accountServices } from "../../utils/services/accountServices";
import toast from 'react-hot-toast';

export const GET_COMMENTS = 'GET_COMMENTS';
export const CREATE_COMMENT = 'CREATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = ' UPDATE_COMMENT';

export const getComments = (action) => {
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
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
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

export const deleteComment = (id, action) => {
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
            .then( toast.success('Commentaire supprimé', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
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
            .then( toast.success('Commentaire modifié', {
                duration: 2000
            }))
            .catch((err) =>{
                toast.error(`${err}`, {
                    duration: 5000,
                })
            })
    }
}
