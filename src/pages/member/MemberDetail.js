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

const MemberDetail = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const member  = useSelector(taskInfo)
    const taskCollectionRef = collection(db,'tasks')


    const editMember = () => {
        navigate(`/member/edit/${member.memberDetail.id}`,{replace: true})
    }
  return (
    <Default>
        <div className='page'>
            <h2> Member Detail</h2>
            <div style={{marginLeft:'20px',marginRight: '20px'}}>
                <Table striped bordered hover>
                    <tbody>
                        {
                           member && <>
                                <tr>
                                    <td>Id</td>
                                    <td>{member.memberDetail.id}</td>
                                </tr>
                                <tr>
                                    <td>Name</td>
                                    <td>{member.memberDetail.data.name}</td>
                                </tr>
                                <tr>
                                    <td>Email</td>
                                    <td>{member.memberDetail.data.email}</td>
                                </tr>

                                <tr>
                                    <td></td>
                                    <td>
                                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={editMember}>Edit</Button>
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

export default MemberDetail