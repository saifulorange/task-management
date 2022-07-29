import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Default from '../../layout/Default'
import { useNavigate } from 'react-router-dom'
import Table from 'react-bootstrap/Table';
import { Button } from 'react-bootstrap'
import {taskInfo,setTaskDetail} from '../../reducer/taskSlice'
import {useSelector,useDispatch} from 'react-redux';

import {db} from '../../firebase'

import {collection, query, orderBy, onSnapshot} from "firebase/firestore"

const TaskDetail = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const task  = useSelector(taskInfo)
    const taskCollectionRef = collection(db,'tasks')


    const editTask = () => {
        navigate(`/task/edit/${task.taskDetail.id}`,{replace: true})
    }
  return (
    <Default>
        <div className='page'>
            <h2> Task Detail</h2>
            <div style={{marginLeft:'20px',marginRight: '20px'}}>
                <Table striped bordered hover>
                    <tbody>
                        {
                           task && <>
                                <tr>
                                    <td>Id</td>
                                    <td>{task.taskDetail.id}</td>
                                </tr>
                                <tr>
                                    <td>Title</td>
                                    <td>{task.taskDetail.data.title}</td>
                                </tr>
                                <tr>
                                    <td>Description</td>
                                    <td>{task.taskDetail.data.description}</td>
                                </tr>
                                <tr>
                                    <td>Assign people</td>
                                    <td>{task.taskDetail.data.assign_to}</td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={editTask}>Edit</Button>
                                    </td>
                                    
                                </tr>
                           </>
                        }
                       
                    </tbody>
                </Table>
            </div>
        </div>
    </Default>
  )
}

export default TaskDetail