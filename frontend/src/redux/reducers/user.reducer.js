import { GET_USER, UPDATE_USER, UPLOAD_PHOTO } from "../actions/user.actions";

const initialSate = {};

export default function userReducer (state = initialSate, action){
    switch (action.type) {
        case GET_USER :
            return action.payload;
        case UPDATE_USER:
            return {
                ...state,
                bio : action.payload
            }
        case UPLOAD_PHOTO : 
            return {
                ...state,
                photo : action.payload
            }
        default : 
            return state
    }
}