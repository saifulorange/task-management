import { Routes, Route } from "react-router-dom";
import {useSelector} from 'react-redux';
import {selectUserEmail} from './reducer/userSlice'
import { useNavigate } from 'react-router-dom'
import React ,{useState,useEffect} from "react";

export default function PublicRoutes({ children }) {
    let navigate = useNavigate();
  const userEmail = useSelector(selectUserEmail)

  const [userInfo , setUserInfo] = useState(userEmail);

  useEffect(()=>{
      setUserInfo(userEmail)
  },[userEmail])

  return !userInfo ? (
       children
    
  ) : (
    navigate('/',{replace: true})
  );
}
