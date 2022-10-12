import { GET_COMMENTS, CREATE_COMMENT, DELETE_COMMENT, UPDATE_COMMENT } from "../actions/comment.actions";

const initialState = { comments: {} };

export default function commentReducer(state = initialState, action) {
    switch (action.type) {
        case GET_COMMENTS:
            return action.payload
        case CREATE_COMMENT:
            return {
                ...state,
                comments: [...state.comments, action.payload]
            }
        case DELETE_COMMENT:
            return {
                ...state,
                comments: state.comments.filter(comment => comment._id !== action.payload)
            }
        case UPDATE_COMMENT:
            return {
                ...state,
                comments: state.comments.map((comment) => {
                    if (comment._id === action.payload.id) {
                        return {
                            ...comment,
                            content: action.payload.data.content
                        }
                    } else {
                        return comment
                    }
                })
            }
        default:
            return state
    }
}