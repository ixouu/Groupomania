import { configureStore } from '@reduxjs/toolkit'
import userReducer from "./user.reducer";
import postReducer from './post.reducer';
import commentReducer from './comment.reducer'
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware} from "redux";
import { getUsers } from '../actions/user.actions';
import { getPosts } from '../actions/post.actions';
import { getComments } from '../actions/comment.actions'; 

const store = configureStore({
    reducer: {
    userReducer,
    postReducer,
    commentReducer,
    }
}, composeWithDevTools(applyMiddleware(thunk)));

store.dispatch(getUsers());
store.dispatch(getPosts());
store.dispatch(getComments());

export default store