import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from '../../pages/Welcome';
import Signup from '../../pages/Signup';
import Error from '../../pages/Error'

const Index = () => {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />}/>
                <Route path='/signup' element={<Signup />}/>
                <Route path='*' element={<Error />}/>
            </Routes>
        </Router>
    );
}

export default Index;
