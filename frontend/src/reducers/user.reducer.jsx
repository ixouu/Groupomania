import { GET_USERS } from "../actions/user.actions";

const initialSate = {};

export default function userReducer (state = initialSate, action){
    switch (action.type) {
        case GET_USERS :
            return action.payload
        default : 
            return state
    }
}