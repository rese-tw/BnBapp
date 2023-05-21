import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import Local from './helpers/Local';
import Api from './helpers/Api';
import PrivateRoute from './components/PrivateRoute';
import RoomsContext from './context/RoomsContext';

import AdminView from './views/AdminView.jsx';
import HomeView from './views/HomeView.jsx';
import NavBar from './views/NavBar.jsx';
import LoginView from './views/LoginView.jsx';
import BookingsView from './views/BookingsView.jsx';
import UsersView from './views/UsersView.jsx';
import ManageRoomsView from './views/ManageRoomsView.jsx'

import './App.css';

function App() {
  const [user, setUser] = useState(Local.getUser());
  const [loginErrorMsg, setLoginErrorMsg] = useState('');
  const [rooms, setRooms] = useState([]);
  const [users, setUsers] = useState([]);

const roomsContext = { 
    rooms, 
    addRoomCb: addRoom, 
    addBlockedDatesCb: addBlockedDates,
    deleteBlockedDatesCb: deleteBlockedDates
  }

  const navigate = useNavigate();

  useEffect(() => {
    getRooms();
    getUsers();
  }, []);

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

  async function getUsers() {
    let myresponse = await Api.getUsers();
    if (myresponse.ok) {
      setUsers(myresponse.data)
    } else {
      console.log(`Error: ${myresponse.error}`)
    }
  }

  async function addRoom(values, onSubmitProps) {
    let myresponse = await Api.addRoom(values);
    if (myresponse.ok) {
      console.log(`Room added!`)
    } else {
      console.log(`Error: ${myresponse.error}`)
    }

    let RoomId = myresponse.data.id

    for (let image of values.images) {
      // console.log(`type of image:`, typeof image)
      // console.log(`RoomId:`, RoomId)
      let myresponse2 = await Api.addImage(image, RoomId);
      if (myresponse2.ok) {
        console.log(`Image added!`)
      } else {
        console.log(`Error: ${myresponse2.error}`)
      }
    }

    getRooms()
    // console.log(rooms)

    //this will allow to append image to form info
    // const formData = new FormData();
    // for (let value in values) {
    //   formData.append(value, values[value])
    // }
    // formData.append('images', values.images);
  }
  
  async function getRooms() {
    let myresponse = await Api.getRooms();
    if (myresponse.ok) {
      setRooms(myresponse.data)
    } else {
      console.log(`Error: ${myresponse.error}`)
    }
  }

  async function addBlockedDates(blockedDates) {
    let myresponse = await Api.addBlockedDates(blockedDates);
    if (myresponse.ok) {
      setRooms(myresponse.data)
    } else {
      console.log(`Error: ${myresponse.error}`)
    }
  }

  async function deleteBlockedDates(roomId, blockedDatesId) {
    // console.log("App shares:", roomId, blockedDatesId);
    let myresponse = await Api.deleteBlockedDates(roomId, blockedDatesId);
    getRooms()
    // if (myresponse.ok) {
    //   setRooms(myresponse.data)
    // } else {
    //   console.log(`Error: ${myresponse.error}`)
    // }
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

        <Route path='/admin/rooms' element={
            <PrivateRoute>
              <RoomsContext.Provider value={roomsContext}>
                <ManageRoomsView />
              </RoomsContext.Provider>
            </PrivateRoute>
        } />

        <Route path='/admin/bookings' element={
            <PrivateRoute>
              <RoomsContext.Provider value={roomsContext}>
                <BookingsView />
              </RoomsContext.Provider>
            </PrivateRoute>
        } />
        
        <Route path='/admin/users' element={
            <PrivateRoute>
                <UsersView />
            </PrivateRoute>
        } /> 

      </Routes>

    </div>
  );
}

export default App;
