import {LIKE_POST, GET_POSTS, DISLIKE_POST, DELETE_POST, ADMIN_EDIT_POST } from "../actions/post.actions";

const initialSate = {};

export default function postReducer (state = initialSate, action){
    switch (action.type) {
        case GET_POSTS :
              return action.payload;
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
        case DELETE_POST : 
          return state.filter((post) => 
            post._id !== action.payload.id
          )
        case ADMIN_EDIT_POST : 
        console.log(action.payload.id)
          return state.map((post) => { 
              if (post._id === action.payload.id){
                return{
                  ...post,
                  content: action.payload.data.content
                }
              } else {
                return post
              }
            })
        default : 
            return state
    }
}

