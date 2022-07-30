import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import '../../firebase'
import {setActiveUser} from '../../reducer/userSlice'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginForm,setLoginForm] = useState({
        email : '',
        password : '',
    });

    const [error,setError] = useState({});

    let loginPageDesign = {
        height:'200px',
        width:'400px', 
        marginLeft: "auto",
        marginRight: "auto",
        marginTop : '80px',
        border : '1px solid gray',
        padding: '20px',
        borderRadius : '5px'
    }

    const handleChange = (e) => {
        e.preventDefault();
        setLoginForm({
            ...loginForm,
            [e.target.name] : e.target.value
        })
    }

    const loginData = (e) => {
        e.preventDefault();
        if(validatonCheck()){
            const auth = getAuth();
             signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
             .then((result)=>{
                dispatch(setActiveUser({
                userName : result.user.displayName,
                userEmail : result.user.email,
                }))
                navigate('/',{replace: true})

             });
           

        }
    }

    const validatonCheck = () => {
        let error = {};
        for(let key in loginForm){
            if(loginForm[key] ==''){
              error[key] = 'required'
            }
        }

        if(Object.keys(error).length >0 ){
            setError({
                ...error
            })
            return false
        }else{
            return true
        }
    }
    
  return (
    <div className='page'>
            <div style={loginPageDesign}>
                <Form>
                    <Form.Group className="mb-3">
                        {/* <Form.Label>Title: </Form.Label> */}
                        <Form.Control value={loginForm.email} name='email' onChange={handleChange} type="text" placeholder='please enter email' />
                        {
                            Object.keys(error).length !=0 && error['email'] != '' && 
                            <p style={{color: 'red'}}>please enter email</p>

                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {/* <Form.Label>Title: </Form.Label> */}
                        <Form.Control value={loginForm.password}  name='password' onChange={handleChange} type="password" placeholder='please enter password' />
                        {
                            Object.keys(error).length !=0 && error['password'] != '' && 
                            <p style={{color: 'red'}}>please enter password</p>

                        }
                    </Form.Group>

                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={loginData}>Submit</Button>

                </Form>
            </div>
   
</div>
  )
}

export default Login