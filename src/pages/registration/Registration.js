import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
  } from "firebase/auth";
import '../../firebase'

import {setActiveUser,selectUserName} from '../../reducer/userSlice'
import {useSelector,useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Registration = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const userName = useSelector(selectUserName)
    const [registrationForm,setRegistrationForm] = useState({
        username : '',
        email : '',
        password : '',
    });

    const [error,setError] = useState({});

    let registrationPageDesign = {
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
        setRegistrationForm({
            ...registrationForm,
            [e.target.name] : e.target.value
        })
    }

    const registrationData = async(e) => {
        e.preventDefault();
        if(validatonCheck()){
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, registrationForm.email, registrationForm.password);
            const user = auth.currentUser;
            // dispatch(setActiveUser({
            //     userName : user.displayName,
            //     userEmail : user.email,
            // }))

            setError({})
            navigate('/login',{replace: true})

        }
    }

    const validatonCheck = () => {
        let error = {};
        for(let key in registrationForm){
            if(registrationForm[key] ==''){
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
            <div style={registrationPageDesign}>
                <Form>
                    <Form.Group className="mb-3">
                        {/* <Form.Label>Title: </Form.Label> */}
                        <Form.Control value={registrationForm.username} name='username' onChange={handleChange} type="text" placeholder='please enter username' />
                        {
                            Object.keys(error).length !=0 && error['username'] != '' && 
                            <p style={{color: 'red'}}>please enter username</p>

                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {/* <Form.Label>Title: </Form.Label> */}
                        <Form.Control value={registrationForm.email} name='email' onChange={handleChange} type="email" placeholder='please enter email' />
                        {
                            Object.keys(error).length !=0 && error['email'] != '' && 
                            <p style={{color: 'red'}}>please enter email</p>

                        }
                    </Form.Group>

                    <Form.Group className="mb-3">
                        {/* <Form.Label>Title: </Form.Label> */}
                        <Form.Control value={registrationForm.password}  name='password' onChange={handleChange} type="password" placeholder='please enter password' />
                        {
                            Object.keys(error).length !=0 && error['password'] != '' && 
                            <p style={{color: 'red'}}>please enter password</p>

                        }
                    </Form.Group>

                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={registrationData}>Submit</Button>

                </Form>
            </div>
   
</div>
  )
}

export default Registration