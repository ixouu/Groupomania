import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from '../../pages/Welcome';
import Signup from '../../pages/Signup';
import Home from '../../pages/Home'
import Error from '../../pages/Error';

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Welcome />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='/home' element={<Home />}/>
                <Route path='*' element={<Error />}/>
            </Routes>
        </Router>
    );
}

export default Index;
