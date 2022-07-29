import React ,{useEffect, useState} from 'react'
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import { auth,provider } from '../firebase';
import { useNavigate } from 'react-router-dom'

import {setActiveUser,setUserLogoutState,selectUserName,selectUserEmail} from '../reducer/userSlice'

const Header = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName)
    const userEmail = useSelector(selectUserEmail)
    const [userInfo , setUserInfo] = useState(userEmail);

    useEffect(()=>{
        setUserInfo(userEmail)
    },[userEmail])

    const handleLogin = () => {
        navigate('/login',{replace: true})
        // auth.signInWithPopup(provider).then((result)=>{
        //     dispatch(setActiveUser({
        //         userName : result.user.displayName,
        //         userEmail : result.user.email,
        //     }))
        // })
    }

    const handleLogout = () => {
        auth.signOut().then(()=>{
            dispatch(setUserLogoutState())
            navigate('/login',{replace: true})
        })
    }

    console.log(userEmail,'user name')

  return (
    <div className='navbar'>
        {
            userInfo !=null ? <>
                 <div className='logo'>
                    <Link to='/'>
                        Task Management App
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