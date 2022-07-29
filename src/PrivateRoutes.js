import  {useEffect, useState} from 'react'
import { Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux';
import {selectUserEmail} from './reducer/userSlice'
import { useNavigate ,Navigate} from 'react-router-dom'
import React from "react";

export default function PrivateRoutes({ children }) {
    let navigate = useNavigate();
    const userEmail = useSelector(selectUserEmail)
    const [userInfo , setUserInfo] = useState(userEmail);

  return userEmail ? children : <Navigate to="/login"/>
  ;
}
