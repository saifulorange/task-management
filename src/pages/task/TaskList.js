import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Default from '../../layout/Default'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import {setTaskDetail} from '../../reducer/taskSlice' 
import {useSelector,useDispatch} from 'react-redux';

import {db} from '../../firebase'

import {collection, query, orderBy, onSnapshot} from "firebase/firestore"

const TaskList = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [tasks ,setTasks] = useState();
    const taskCollectionRef = collection(db,'tasks')

    useEffect(()=>{

        try{
            const getTasks = async () => {
                const q = query(collection(db, 'tasks'))
                onSnapshot(q, (querySnapshot) => {
                  setTasks(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                  })))
                })
            }
            getTasks()
        }catch(error){
            console.log(error)
        }
       
    },[])

    const addTask = () => {
        navigate('/task/create',{replace: true})
    }

    const getTaskDetail = (task) =>{
        dispatch(setTaskDetail({
            data : task
        }))

        navigate(`/task/${task.id}`,{replace: true})
    }
  return (
    <Default>
        <div className='page'>
        <Button style={{float:'right',marginBottom: '10px',marginTop: '10px',marginRight: '20px'}} type='button' onClick={addTask}>Add New Task</Button>

            <h2 style={{fontSize:'20px',marginTop:'20px'}}> Task List</h2>
            <div style={{marginLeft:'20px',marginRight: '20px'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Title</th>
                            <th>Assign People</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           tasks && tasks.map((task)=>{
                               return <tr>
                                    <td>{task.id}</td>
                                    <td onClick={()=> getTaskDetail(task)} style={{cursor : 'pointer'}}>
                                        {task.data.title}
                                    </td>
                                    
                                    <td>{task.data.assign_to}</td>
                                </tr>
                            })
                        }
                       
                       
                    </tbody>
                </Table>
            </div>
        </div>
    </Default>
  )
}

export default TaskList