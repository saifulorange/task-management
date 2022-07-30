
import { Navigate} from 'react-router-dom'
import { getToken } from './Utils/Utils';

export default function PublicRoutes({ children }) {
  return !getToken() ? children : <Navigate to="/"/>
}
