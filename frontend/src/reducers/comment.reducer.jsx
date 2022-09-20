import { GET_COMMENTS } from "../actions/comment.actions";

const initialSate = {};

export default function comnmentReducer (state = initialSate, action){
    switch (action.type) {
        case GET_COMMENTS :
            return action.payload
        default : 
            return state
    }
}