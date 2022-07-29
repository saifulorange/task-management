import React, { useState } from 'react'
import Default from '../../layout/Default'
import { Form, Button } from 'react-bootstrap'
import {useSelector,useDispatch} from 'react-redux';
import {db} from '../../firebase'
import { doc, updateDoc ,Timestamp} from "firebase/firestore";
import {taskInfo} from '../../reducer/taskSlice'
import { useNavigate } from 'react-router-dom'



const TaskEdit = () => {
    let navigate = useNavigate();
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
    const editTask = useSelector(taskInfo)

    const [taskForm,setTaskForm] = useState({
        id : editTask.taskDetail.id,
        title : editTask.taskDetail.data.title,
        description : editTask.taskDetail.data.title,
        assign_to : editTask.taskDetail.data.assign_to
    });

    const [error,setError] = useState({});

    const handleChange = (e) => {
        e.preventDefault();
        setTaskForm({
            ...taskForm,
            [e.target.name] : e.target.value
        })
    }

    const submitTask = async (e) => {
        e.preventDefault();
        if(validatonCheck()){

            const taskDocRef = doc(db, 'tasks', taskForm.id)
            try{
              await updateDoc(taskDocRef, {
                title: taskForm.title,
                description: taskForm.description,
                assign_to : taskForm.assign_to
              })

              navigate('/tasks',{replace: true})

            } catch (err) {
              console.log(err)
            } 

        }
    }

    const validatonCheck = () => {
        let error = {};
        for(let key in taskForm){
            if(key == 'title' && taskForm[key] ==''){
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
                        <Form.Control value={taskForm.title}  name='title' onChange={handleChange} type="text" placeholder='please enter task title' />
                        {
                            Object.keys(error).length !=0 && error['title'] != '' && 
                            <p style={{color: 'red'}}>please requird this field</p>

                        }
                    </Form.Group>

                    <Form.Group controlId="form.Textarea" className="mb-3">
                        {/* <Form.Label>Description : </Form.Label> */}
                        <Form.Control value={taskForm.description} name='description' onChange={handleChange} as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Select value={taskForm.assign_to} aria-label="Assign To member" name='assign_to' onChange={handleChange}>
                        <option>Open this select menu</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                    </Form.Select>

                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={submitTask}>Update</Button>

                </Form>
            </div>
           
        </div>
    </Default>
    
  )
}

export default TaskEdit