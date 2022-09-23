import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './users.reducer';
import userReducer from "./user.reducer";
import postReducer from './post.reducer';
import postsReducer from './posts.reducer';
import commentReducer from './comment.reducer';
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware} from "redux";


const store = configureStore({
    reducer: {
    userReducer,
    usersReducer,
    postReducer,
    postsReducer,
    commentReducer,
    }
}, composeWithDevTools(applyMiddleware(thunk)));



export default store