
import { Navigate} from 'react-router-dom'
import React from "react";
import { getToken } from './Utils/Utils';

export default function PrivateRoutes({ children }) {
  return getToken() ? children : <Navigate to="/login"/>
  ;
}
