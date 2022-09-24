import {CREATE_POST, LIKE_POST } from "../actions/post.actions";

const initialSate = {};

export default function postReducer (state = initialSate, action){
    switch (action.type) {
        case CREATE_POST : 
            return [action.payload, ...state];
        case LIKE_POST : 
            return state
        default : 
            return state
    }
}

