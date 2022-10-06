import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.scss';
import App from './App';
import { Provider } from "react-redux";
import store from "./redux/reducers/index";

import { getUsers } from './redux/actions/users.actions';
import { getPosts } from './redux/actions/post.actions';
import { getComments } from './redux/actions/comment.actions'; 

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

store.dispatch(getUsers());
store.dispatch(getPosts());
store.dispatch(getComments());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <Provider store={store}>
            <Routes>
                <Route path='/*' element={<App />}/>
            </Routes>
        </Provider>
    </Router>
);
