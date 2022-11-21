import React, { useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { editProject } from '../Actions/projectActions';
import { editTask } from '../Actions/taskActions';
// import { editUser } from '../actions/userActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

const EditProjectPage = ({show,handleClose,Project}) => {

    const {loading,errors} = useSelector(state=>state.manageProject)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {users,admins} = useSelector(state=>state.listUsers)

    const [editProjectInput,setEditProjectInput] = useState({
        title : Project.Title,
        description : Project.Description,
        creationDate : Project.CreationDate,
        status : Project.Status,     
    })

    const arrUsers=[]
    const arrAdmins =[]
    Project.Users.filter(u=>u.Role === "User").map(user => arrUsers.push({value:user._id , label: user.FirstName+' '+ user.LastName}))
    Project.Users.filter(u=>u.Role === "Admin").map(user => arrAdmins.push({value:user._id , label: user.FirstName+' '+ user.LastName}))
    const [valuesUsers, setValuesUsers] = useState(arrUsers)
    const [valuesAdmins, setValuesAdmins] = useState(arrAdmins)

    // const [valueCreator, setValueCreator] = useState({value:Task.Creator._id,
    //                                                  label:Task.Creator.FirstName+' '+Task.Creator.LastName})
    // const [valueAssigned, setValueAssigned] = useState({value:Task.AssignedTo._id,
    //                                                  label:Task.AssignedTo.FirstName+' '+Task.AssignedTo.LastName})
    // const [valueProjects, setValueProjects] = useState({value:Task.Project._id,
    //                                                  label:Task.Project.Title})
    const handleChangeListUsers = (e) => { 
        setValuesUsers(e)
    }

    const handleChangeListAdmins = (e) => {
        setValuesAdmins(e)
    }


    const handleChange = (e) => { 
        setEditProjectInput({...editProjectInput, [e.target.name] : e.target.value})
        console.log(editProjectInput)
     }

     const handleSubmit = (e) => { 
        e.preventDefault()
        dispatch(editProject(Project._id,{...editProjectInput, users:(valuesUsers.map(v=> v.value).concat(valuesAdmins.map(v=> v.value)))},navigate))
                                                      
                                                       
        console.log({...editProjectInput, users:(valuesUsers.map(v=> v.value).concat(valuesAdmins.map(v=> v.value)))})
                                                      // navigate('/')
    }

  return (
    <div>
        <Modal size='lg' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Project {Project.Title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
        <Row className='mx-2'>
        <Form.Group className="mb-3" controlId="formBasicTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" name="title" onChange={handleChange} placeholder={Project.Title}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name="description" onChange={handleChange} placeholder={Project.Description} />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicCreationDate">
      <Form.Label>Creation Date</Form.Label>
      <Form.Control type="date"  name="creationDate" onChange={handleChange} placeholder={Project.CreationDate} />
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

    </Row>
    {errors && <Message variant='danger'>{errors}</Message>}
    {/* <Button variant="primary" type="submit" onClick={handleSubmit}>
     {loading ? <Loader/> : 'Submit'}
    </Button> */}
  </Form>
              </Modal.Body>
              <Modal.Footer>
              <Button variant="info" onClick={(e)=>{handleSubmit(e)}}>
               {loading ? <Loader/> : 'Submit'}
               </Button>
               <Button variant="danger" onClick={handleClose}>
                Close
               </Button>
              </Modal.Footer>
            </Modal>
    </div>
  )
}

export default EditProjectPage