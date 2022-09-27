import {CREATE_POST, LIKE_POST } from "../actions/post.actions";

const initialSate = {};

export default function postReducer (state = initialSate, action){
    switch (action.type) {
        case CREATE_POST : 
            return {...state, ...action.payload};
        case LIKE_POST : 
        return state.map((post) => {
            if (post._id === action.payload.postId) {
              return {
                ...post,
                likers: [action.payload.userId, ...post.likers],
              };
            }
            return post;
          });
        default : 
            return state
    }
}

