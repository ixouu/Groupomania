import Axios from "../../utils/services/callerService";

export const GET_COMMENTS = 'GET_COMMENTS';

export const getComments= () => {
    return (dispatch) => {
        return Axios.get("/comment/")
        .then((res)=> {
            dispatch({type: GET_COMMENTS, payload : res.data.data.comments})
        })
        .catch((err) => console.log(err))
    }
}