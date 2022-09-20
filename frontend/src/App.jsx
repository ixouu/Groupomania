import React from "react";
import Router from './components/Routes/index';
import { useSelector } from "react-redux";


const App = () => {

  const users = useSelector((state) => state.userReducer)
  console.log(users)
  return (
    <div className="App">
    <Router />
    </div>
  );
}

export default App;
