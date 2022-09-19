import { configureStore } from '@reduxjs/toolkit'
import postReducer from "./post.reducer";
import userReducer from "./user.reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { applyMiddleware} from "redux";

const store = configureStore({
    reducer: {
    postReducer,
    userReducer,
    }
}, composeWithDevTools(applyMiddleware(thunk)));

	export default store