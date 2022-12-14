import {
    GET_USER,
    UPDATE_USER,
    UPLOAD_PHOTO,
    ADD_FOLLOWER,
    ADD_FOLLOWING,
    REMOVE_FOLLOWER,
    REMOVE_FOLLOWING,
    LOGOUT
} from "../actions/user.actions";

const initialSate = {};

export default function userReducer(state = initialSate, action) {
    switch (action.type) {
        case GET_USER:
            return action.payload;
        case UPDATE_USER:
            return {
                ...state,
                bio: action.payload
            }
        case UPLOAD_PHOTO:
            return {
                ...state,
                photo: action.payload
            }
        case ADD_FOLLOWER:
            return {
                ...state,
                followers: [action.payload, ...state.user.followers]
            }
        case ADD_FOLLOWING:
            return {
                ...state,
                following: [action.payload, ...state.user.following]
            }
        case REMOVE_FOLLOWER:
            return {
                ...state,
                followers: state.user.followers.filter(
                    (id) => id !== action.payload
                )
            }
        case REMOVE_FOLLOWING:
            return {
                ...state,
                following: state.user.following.filter(
                    (id) => id !== action.payload
                )
            }
        case LOGOUT : 
            return{
                ...state = initialSate
            }
        default:
            return state
    }
}