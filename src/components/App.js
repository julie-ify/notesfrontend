import '../styles/App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom'
import Home from '../pages/Home';
import Auth from '../pages/Auth';
import Dashboard from '../pages/Dashboard';
import Nav from './Nav';
import { useNavigate } from 'react-router';
import { useAppState } from '../redux/appState';
// import { useState } from 'react';

const App = () => {
 const navigate = useNavigate();
const { dispatch } = useAppState();
React.useEffect(() => {
  const auth = JSON.parse(localStorage.getItem('auth'));
  if (auth) {
    dispatch({type: "auth", payload: auth});
    navigate("/dashboard");
  } else {
    navigate("/");
  }
}, [])

  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/auth/:form' element={<Auth />} />
        <Route path='/dashboard' element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
