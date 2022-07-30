import { Link } from 'react-router-dom'
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom'
import { getToken ,clearToken} from '../Utils/Utils';

const Header = () => {
    let navigate = useNavigate();

    const handleLogin = () => {
        navigate('/login',{replace: true})
    }

    const handleLogout = () => {
        auth.signOut().then(()=>{
            clearToken();
           navigate('/login',{replace: true})
        })
    }

  return (
    <div className='navbar'>
        {
            getToken() ? <>
                 <div className='logo'>
                    <Link to='/'>
                         <img src="/taskLogo/taskLogo.png"/>
                    </Link>
                </div>
                <ul>
                    <Link to='/'>Dashboard</Link>
                    <Link to='/tasks'>Task</Link>
                    <Link to='/members'>Member</Link>
                    <button onClick={handleLogout}>Logout</button>
                   

                </ul>
            </> : <>
               <button onClick={handleLogin}>Login</button>
            </>

        }
            
    </div>
  )
}

export default Header