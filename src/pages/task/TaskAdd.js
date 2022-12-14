import React, { useState ,useEffect} from 'react'
import Default from '../../layout/Default'
import { Form, Button } from 'react-bootstrap'
import {db} from '../../firebase'
import {collection, addDoc ,Timestamp,query,orderBy,onSnapshot} from 'firebase/firestore'
import { useNavigate } from 'react-router-dom'

const TaskAdd = () => {
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

    const [taskForm,setTaskForm] = useState({
        title : '',
        description : '',
        assign_to : ''
    });
    const [members ,setMembers] = useState();

    const [error,setError] = useState({});

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

            try {
                await addDoc(collection(db, 'tasks'), {
                  title: taskForm.title,
                  description: taskForm.description,
                  assign_to : taskForm.assign_to,
                  created: Timestamp.now()
                })

                navigate('/tasks',{replace: true})
              } catch (err) {
                alert(err)
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
                        <Form.Control  name='title' onChange={handleChange} type="text" placeholder='please enter task title' />
                        {
                            Object.keys(error).length !=0 && error['title'] != '' && 
                            <p style={{color: 'red'}}>please requird this field</p>

                        }
                    </Form.Group>

                    <Form.Group controlId="form.Textarea" className="mb-3">
                        {/* <Form.Label>Description : </Form.Label> */}
                        <Form.Control name='description' onChange={handleChange} as="textarea" rows={3} />
                    </Form.Group>

                    <Form.Select aria-label="Assign To member" name='assign_to' onChange={handleChange}>
                         <option disabled>Assign member</option>
                        {
                           members && members.map((member)=>{
                                return <>
                                 <option value={member.id}>{member.data.name}</option>
                                </>
                            })
                        }
                    </Form.Select>

                    <Button style={{float:'right',marginTop: '10px'}} type='button' onClick={submitTask}>Submit</Button>

                </Form>
            </div>
           
        </div>
    </Default>
    
  )
}

export default TaskAdd