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

const MemberList = () => {
    let navigate = useNavigate();
    const dispatch = useDispatch();
    const [members ,setMembers] = useState();
    const taskCollectionRef = collection(db,'tasks')

    useEffect(()=>{

        try{
            const getMembers = async () => {
                const q = query(collection(db, 'members'))
                onSnapshot(q, (querySnapshot) => {
                    setMembers(querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                  })))
                })
            }
            getMembers()
        }catch(error){
            console.log(error)
        }
       
    },[])

    const addMember = () => {
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
        <Button style={{float:'right',marginBottom: '10px',marginTop: '10px',marginRight: '20px'}} type='button' onClick={addMember}>Add New Member</Button>

            <h2> Member List</h2>
            <div style={{marginLeft:'20px',marginRight: '20px'}}>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                           members && members.map((member)=>{
                               return <tr>
                                    <td>{member.id}</td>
                                    <td onClick={()=> getTaskDetail(member)} style={{cursor : 'pointer'}}>
                                        {member.data.name}
                                    </td>
                                    
                                    <td>{member.data.email}</td>
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

export default MemberList