import { GET_POSTS } from "../actions/posts.actions";

const initialSate = {};

export default function postsReducer (state = initialSate, action){
    switch (action.type) {
        case GET_POSTS :
            return action.payload;
        default : 
        return state
    }
}