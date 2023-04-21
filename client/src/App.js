import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import Local from './helpers/Local';
import Api from './helpers/Api';
import PrivateRoute from './components/PrivateRoute';

import AdminView from './views/AdminView.js';
import HomeView from './views/HomeView.js';
import NavBar from './views/NavBar.js';
import LoginView from './views/LoginView.js';
import BookingsView from './views/BookingsView.js';
import UsersView from './views/UsersView.js';

import './App.css';

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');

  const navigate = useNavigate();

  async function doLogin(username, password) {
    let myresponse = await Api.loginUser(username, password);
    if (myresponse.ok) {      
      Local.saveUserInfo(myresponse.data.token, myresponse.data.user);
      setUser(myresponse.data.user);
      setLoginErrorMsg('');
      navigate('/admin');
    } else {
      setLoginErrorMsg('Login failed.');
    }
  }

  function doLogout() {
    Local.removeUserInfo();
    setUser(null);
    navigate('/');
  }

  return (
    <div className="App" id="background">
      <NavBar user={user} logoutCb={doLogout} />

      <Routes>
      
        <Route path='/' element={<HomeView />} />
        
        <Route path='/login' element={
              <LoginView 
                  doLoginCb={(u, p)=>doLogin(u, p)}
                  loginErrorMsg={loginErrorMsg}
              />
            } 
          /> 

        <Route path='/admin' element={
          <PrivateRoute>
            <AdminView />
          </PrivateRoute>
        } />

        <Route path='/bookings' element={
            <PrivateRoute>
              <BookingsView />
            </PrivateRoute>
        } />
        
        <Route path='/users' element={
            <PrivateRoute>
                <UsersView />
            </PrivateRoute>
        } /> 

      </Routes>

    </div>
  );
}

export default App;
