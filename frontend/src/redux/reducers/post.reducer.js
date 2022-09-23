import {CREATE_POST } from "../actions/post.actions";

const initialSate = {};

export default function postReducer (state = initialSate, action){
    switch (action.type) {
        case CREATE_POST : 
            return [action.payload, ...state];
        default : 
            return state
    }
}

