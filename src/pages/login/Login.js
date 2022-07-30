import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import '../../firebase'
import {setActiveUser} from '../../reducer/userSlice'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { checkEmailValidation ,setTokenLocalStorage} from '../../Utils/Utils';

const Login = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [loginForm,setLoginForm] = useState({
        email : '',
        password : '',
    });

    const [error,setError] = useState({});
    const [validationText ,setValidationText] = useState(null)

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

        if(e.target.name == 'email')
        {
           let isValid = checkEmailValidation(e.target.value);
           if(!isValid){
             setValidationText("please enter valid email")
           }else{
             setValidationText(null)
           }
           
        }

        setLoginForm({
            ...loginForm,
            [e.target.name] : e.target.value
        })
    }

    const loginData = (e) => {
        e.preventDefault();
        if(!(validationText) && validatonCheck()){
            const auth = getAuth();
             signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
             .then((result)=>{
                setTokenLocalStorage(result.user.refreshToken);
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

    const navigateRegister = () => {
        navigate('/registration',{replace:true})
    }
    
  return (
    <div className='page'>
            <div style={loginPageDesign}>
                <Form>
                    <Form.Group className="mb-3">
                        <Form.Control value={loginForm.email} name='email' onChange={handleChange} type="text" placeholder='please enter email' />
                        {
                            Object.keys(error).length !=0 && error['email'] != '' && 
                            <p style={{color: 'red'}}>please enter email</p>

                        }

                        {
                            validationText !=null &&
                            <p style={{color: 'red'}}>please enter valid email</p>
                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        <Form.Control value={loginForm.password}  name='password' onChange={handleChange} type="password" placeholder='please enter password' />
                        {
                            Object.keys(error).length !=0 && error['password'] != '' && 
                            <p style={{color: 'red'}}>please enter password</p>

                        }
                    </Form.Group>

                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={loginData}>Login</Button>
                    <Button style={{float:'left',marginTop: '10px'}} type='button' onClick={navigateRegister}>Registration ?</Button>

                </Form>
            </div>
   
    </div>
  )
}

export default Login