import axios from "axios";

export const GET_COMMENTS = 'GET_COMMENTS';

export const getComments= () => {
    return (dispatch) => {
        return axios.get("http://localhost:5000/api/comment/")
        .then((res)=> {
            dispatch({type: GET_COMMENTS, payload : res.data.data.comments})
        })
        .catch((err) => console.log(err))
    }
}