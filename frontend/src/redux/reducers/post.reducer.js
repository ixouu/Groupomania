import {
  LIKE_POST, 
  GET_POSTS, 
  DISLIKE_POST,
  ADMIN_DELETE_POST, 
  ADMIN_EDIT_POST,
  EDIT_POST, 
  DELETE_POST 
  } from "../actions/post.actions";

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
        case ADMIN_DELETE_POST : 
          return state.filter((post) => 
            post._id !== action.payload.id
          )
        case DELETE_POST : 
          return state.filter((post) => 
            post._id !== action.payload.id
          )
        case ADMIN_EDIT_POST : 
          return state.map((post) => { 
              if (post._id === action.payload.id && action.payload.data.content !== undefined){
                return{
                  ...post,
                  content: action.payload.data.content
                }
              }else if (post._id === action.payload.id && action.payload.data.imageUrl !== undefined){
                return {
                  ...post,
                  imageUrl: action.payload.data.imageUrl
                }
              }else {
                return post
              }
            })
          case EDIT_POST: 
            return state.map((post) => {
              if (post._id === action.payload.id && action.payload.data.content !== undefined){
                return{
                  ...post,
                  content: action.payload.data.content
                }
              }else if (post._id === action.payload.id && action.payload.data.imageUrl !== undefined){
                return {
                  ...post,
                  imageUrl: action.payload.data.imageUrl
                }
              }else {
                return post
              }
            })
        default : 
            return state
    }
}

