import { GET_USERS } from "../actions/users.actions";

const initialSate = {};

export default function usersReducer (state = initialSate, action){
    switch (action.type) {
        case GET_USERS :
            return [...action.payload];
        default : 
            return state
    }
}