import {CREATE_POST, LIKE_POST, GET_POSTS, DISLIKE_POST } from "../actions/post.actions";

const initialSate = {};

export default function postReducer (state = initialSate, action){
    switch (action.type) {
        case GET_POSTS :
              return action.payload;
        case CREATE_POST : 
            return {...state, ...action.payload};
        case LIKE_POST : 
            return state.map((post) => {
                if (post._id === action.payload.postId) {
                  return {
                ...post,
                likes: [action.payload.userId, ...post.likes]
                  };
                }else {
                  return post;
                }
              });
        case DISLIKE_POST :
          return state.map((post) => {
            if (post._id === action.payload.postId) {
              return {
                ...post,
                likes: post.likes.filter((id) => id !== action.payload.userId),
              };
            }
            return post;
          });
        default : 
            return state
    }
}

