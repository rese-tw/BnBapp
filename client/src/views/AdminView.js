import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from 'react-router-dom';

import Local from '../helpers/Local';
import Api from '../helpers/Api';
import PrivateRoute from '../components/PrivateRoute';

import BookingsView from './BookingsView.js';
import UsersView from './UsersView.js';


export default function AdminView(props) {
  const [users, setUsers] = useState([]);

  return (
    <div className="AdminView">
      SUMMARY DASHBOARD

    </div>
  )
}
