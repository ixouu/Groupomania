import { GET_POSTS } from "../actions/post.actions";

const initialSate = {};

export default function postReducer (state = initialSate, action){
    switch (action.type) {
        case GET_POSTS :
            return action.payload
        default : 
            return state
    }
}