import React, { useEffect, useState } from "react";
import { Routes, Route}  from 'react-router-dom';
import { UidContext } from './components/AppContext'

import Layout from "./components/Layout";
import Welcome from './pages/Welcome';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';
import Profil from './pages/Profil';
import AdminDashboard from './pages/AdminDashboard';
import Unauthorized from './pages/Unauthorized';
import User from "./components/User/Index";


import AuthGuard from "./utils/AuthGuard";
import AuthAdmin from "./utils/AuthAdmin";
import { useSelector } from "react-redux";
import { accountServices } from './utils/services/accountServices';
import { useDispatch } from "react-redux";
import { getUser } from './redux/actions/user.actions'

const App = () => {

  const [userId, setUserId] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setUserId(accountServices.getUserId())
    if (userId) dispatch(getUser(userId))
  },[dispatch, userId])

  const currentUser = useSelector((state) => state.userReducer);

  
  return (
   <UidContext.Provider value={userId}>
      <Routes>
        <Route path="/" element={<Layout/>}>
          {/* Public Routes */}
          <Route path='/' element={<Welcome />}/>
          <Route path='signup' element={<Signup />}/>
          <Route path='unauthorized' element={<Unauthorized />}/>

          {/* Protected Routes */}
            
            {currentUser.user && <> <Route path='home' element={
            <AuthGuard>
              <Home />
            </AuthGuard>}/>

            <Route path='profil' element={
            <AuthGuard>
              <Profil />
            </AuthGuard>}/>
            
            <Route path='profil/:id' element={ 
            <AuthGuard>
              <Profil />
            </AuthGuard>}/>

            <Route path='user/' element={ 
            <AuthGuard>
              <User />
            </AuthGuard>}/> 

            <Route path='user/:id' element={ 
            <AuthGuard>
              <User />
            </AuthGuard>}/> 

            <Route path='admin' element={
            <AuthAdmin>
              <AdminDashboard />
            </AuthAdmin>
            }/> </>}
            
          {/* Error */}
          <Route path='*' element={<Error />}/>

        </Route>
      </Routes>
    </UidContext.Provider>
  );
}

export default App;
