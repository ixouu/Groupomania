import { GET_COMMENTS, CREATE_COMMENT } from "../actions/comment.actions";

const initialSate = {};

export default function commentReducer (state = initialSate, action){
    switch (action.type) {
        case GET_COMMENTS :
            return action.payload
        case CREATE_COMMENT : 
            return [action.payload, ...state];
        default : 
            return state
    }
}