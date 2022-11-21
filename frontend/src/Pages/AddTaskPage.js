import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Select from 'react-select';
import { addTask } from '../Actions/taskActions'
import { listProjects } from '../Actions/projectActions'

const AddTaskPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {users,admins} = useSelector(state=>state.listUsers)
    const {projectsForDropDownList} = useSelector(state=>state.listProjects)
    const {loading,errors} = useSelector(state=>state.manageTask)
    const [taskInput, setTaskInput] = useState({})
    const [valueCreator, setValueCreator] = useState({})
    const [valueAssigned, setValueAssigned] = useState({})
    const [valueProjects, setValueProjects] = useState({})
    //fill data  in userDropdownList

    const handleChangeListCreators = (e) => {
        setValueCreator({value : e.value, label : e.label})
    }

    const handleChangeListAssigned = (e) => {
        setValueAssigned({value : e.value, label : e.label})
    }

    const handleChangeListProjects = (e) => {
        setValueProjects({value : e.value, label : e.label})
    }

    const handleChange = (e) => { 
        setTaskInput({...taskInput, [e.target.name] : e.target.value})
     }

        
     useEffect(()=>{
       dispatch(getAllUsers())
       dispatch(listProjects())
       
        
      },[dispatch])   

const handleSubmit = (e) => { 
    e.preventDefault()
    dispatch(addTask({...taskInput, creator:valueCreator.value,
                                          assignedTo : valueAssigned.value,
                                          project:valueProjects.value},navigate))
}

  return (
    <Container style={{width:'50%'}} className='mt-5'>
    <Form>
        <Row>
    <Col md={12}>
    <Form.Group className="mb-3" controlId="formBasicTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" name="title" onChange={handleChange} placeholder="Enter project title" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name="description" onChange={handleChange} placeholder="Enter project description" />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicCreationDate">
      <Form.Label>Creation Date</Form.Label>
      <Form.Control type="date"  name="creationDate" onChange={handleChange} placeholder="Enter creation date" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCompletionDate">
      <Form.Label>Completion Date</Form.Label>
      <Form.Control type="date"  name="completionDate" onChange={handleChange} placeholder="Enter completion date" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicProject">
      <Form.Label>Project</Form.Label>
      <Select options={projectsForDropDownList}     
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListProjects.bind(this)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicUser">
      <Form.Label>Creator</Form.Label>
      <Select options={users.concat(admins)}       
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListCreators.bind(this)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicUser">
      <Form.Label>Assigned To</Form.Label>
      <Select options={users.concat(admins)}       
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListAssigned.bind(this)} />
    </Form.Group>

    </Col>
    </Row>
    {errors && <Message variant='danger'>{errors}</Message>}
    <Button style={{width:'150px'}} className='mt-3' variant="primary" type="submit" onClick={handleSubmit}>
     {loading ? <Loader/> : 'ADD'}
    </Button>
  </Form>
  </Container>
    
  )
}

export default AddTaskPage