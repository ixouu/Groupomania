import Axios from "../../utils/services/callerService";

export const GET_POSTS = 'GET_POSTS';

export const getPosts= () => {
    return (dispatch) => {
        return Axios.get("/post")
        .then((res)=> {
            dispatch({type: GET_POSTS, payload : res.data.data.posts})
        })
        .catch((err) => console.log(err))
    }
}