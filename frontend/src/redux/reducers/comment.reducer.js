import { GET_COMMENTS, CREATE_COMMENT, DELETE_COMMENT } from "../actions/comment.actions";

const initialState = {comments : {}};

export default function commentReducer (state = initialState, action){
    switch (action.type) {
        case GET_COMMENTS :
            return action.payload
        case CREATE_COMMENT :
            return {
                ...state,
                comments : [...state.comments, action.payload]
            }
        case DELETE_COMMENT :
            console.log(action.payload)
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            }
        default :
            return state
    }
}
