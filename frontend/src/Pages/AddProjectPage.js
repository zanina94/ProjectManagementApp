import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Select from 'react-select';
import { addProject } from '../Actions/projectActions'

const AddProjectPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {users,admins} = useSelector(state=>state.listUsers)
    const {loading,errors} = useSelector(state=>state.manageProject)
    const [addProjectInput, setAddProjectInput] = useState({})
    const [valuesUsers, setValuesUsers] = useState([])
    const [valuesAdmins, setValuesAdmins] = useState([])
    // const [adminsValues, setAdminsValues] = useState([])
    //fill data  in userDropdownList

    const handleChangeListAdmins = (e) => {
        setValuesAdmins(e)
    }

    const handleChangeListUsers = (e) => {
        setValuesUsers(e)
    }

    const handleChange = (e) => { 
        setAddProjectInput({...addProjectInput, [e.target.name] : e.target.value})
     }

        
     useEffect(()=>{
       dispatch(getAllUsers())
       
        
      },[dispatch])   

const handleSubmit = (e) => { 
    e.preventDefault()
    // setAddProjectInput({...addProjectInput, users:values.map(v=> v.value)})
    dispatch(addProject({...addProjectInput, users:(valuesUsers.map(v=> v.value).concat(valuesAdmins.map(v=> v.value)))},
   navigate))
    // console.log({...addProjectInput, users:valuesUsers.map(v=> v.value).concat(valuesAdmins.map(v=> v.value))})
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

    <Form.Group className="mb-3" controlId="formBasicAdmins">
      <Form.Label>Admins</Form.Label>
      <Select options={admins}       isMulti={true}
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListAdmins.bind(this)} />
        {/* {
          values === null ? "" : values.map(v => <h4 key={v.value}>{v.value}</h4>)
        } */}
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicUsers">
      <Form.Label>Users</Form.Label>
      <Select options={users}       isMulti={true}
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListUsers.bind(this)} />
        {/* {
          values === null ? "" : values.map(v => <h4 key={v.value}>{v.value}</h4>)
        } */}
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

export default AddProjectPage