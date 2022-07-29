import React, { useState } from 'react'
import Default from '../../layout/Default'
import { Form, Button } from 'react-bootstrap'
import {db} from '../../firebase'
import { doc, updateDoc ,Timestamp} from "firebase/firestore";
import { useNavigate } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux';
import {taskInfo} from '../../reducer/taskSlice'

const MemberEdit = () => {
    let navigate = useNavigate();
    const editMember = useSelector(taskInfo)
    let addFormDesign = {
        height:'400px',
        width:'400px', 
        marginLeft: "auto",
        marginRight: "auto",
        marginTop : '80px',
        border : '1px solid gray',
        padding: '20px',
        borderRadius : '5px'
    }

    const [memberForm,setMemberForm] = useState({
        id : editMember.memberDetail.id,
        name : editMember.memberDetail.data.name,
        email : editMember.memberDetail.data.email,
    });

    const [error,setError] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setMemberForm({
            ...memberForm,
            [e.target.name] : e.target.value
        })
    }

    const submitMember = async (e) => {
        e.preventDefault();
        if(validatonCheck()){

            const memberDocRef = doc(db, 'members', memberForm.id)
            try{
              await updateDoc(memberDocRef, {
                name: memberForm.name,
                email: memberForm.email,
              })

              navigate('/members',{replace: true})

            } catch (err) {
              console.log(err)
            } 
        }
    }

    const validatonCheck = () => {
        let error = {};
        for(let key in memberForm){
            if(key == 'name' && memberForm[key] ==''){
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
    <Default>
        <div className='page'>
            <div style={addFormDesign}>
                <Form>
                    <Form.Group className="mb-3">
                        {/* <Form.Label>Title: </Form.Label> */}
                        <Form.Control value={memberForm.name}  name='name' onChange={handleChange} type="text" placeholder='please enter name' />
                        {
                            Object.keys(error).length !=0 && error['name'] != '' && 
                            <p style={{color: 'red'}}>please requird this field</p>

                        }
                    </Form.Group>

                    <Form.Group  className="mb-3">
                        {/* <Form.Label>Description : </Form.Label> */}
                        <Form.Control value={memberForm.email} name='email' onChange={handleChange}  type="email" placeholder='please enter email' />
                    </Form.Group>

                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={submitMember}>Submit</Button>

                </Form>
            </div>
           
        </div>
    </Default>
    
  )
}

export default MemberEdit