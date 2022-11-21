import React, { useState } from 'react'
import { Button, Form, Modal, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { editTask } from '../Actions/taskActions';
// import { editUser } from '../actions/userActions';
import Loader from '../Components/Loader';
import Message from '../Components/Message';

const EditTaskPage = ({show,handleClose,Task}) => {

    const {loading,errors} = useSelector(state=>state.manageTask)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {users,admins} = useSelector(state=>state.listUsers)
    const {projectsForDropDownList} = useSelector(state=>state.listProjects)

    const [editTaskInput,setEditTaskInput] = useState({
        title : Task.Title,
        description : Task.Description,
        creationDate : Task.CreationDate,
        completionDate : Task.CompletionDate,       
        // creator : Task.Creator,
        // assignedTo : Task.AssignedTo,
        // project : Task.Project
    })
    const [status,setStatus] = useState({value : 0, label: Task.Status})
    const [valueCreator, setValueCreator] = useState({value:Task.Creator._id,
                                                     label:Task.Creator.FirstName+' '+Task.Creator.LastName})
    const [valueAssigned, setValueAssigned] = useState({value:Task.AssignedTo._id,
                                                     label:Task.AssignedTo.FirstName+' '+Task.AssignedTo.LastName})
    const [valueProjects, setValueProjects] = useState({value:Task.Project._id,
                                                     label:Task.Project.Title})
    const [isOpen,setIsOpen]= useState(Task.IsOpen)
    console.log({isOpen})
    const handleChangeListCreators = (e) => { 
        setValueCreator({value : e.value, label : e.label})
    }
    
    const handleChangeStatus = (e) => {
      setStatus({value : e.value, label:e.label})
    }

    const handleChangeListAssigned = (e) => {
        setValueAssigned({value : e.value, label : e.label})
    }

    const handleChangeListProjects = (e) => {
        setValueProjects({value : e.value, label : e.label})
    }

    const handleChangeChecked = (e) => {
        setIsOpen(!isOpen)
    }

    const handleChange = (e) => { 
        setEditTaskInput({...editTaskInput, [e.target.name] : e.target.value})
        // setEditTaskInput({...editTaskInput, isOpen : !editTaskInput.isOpen })
        console.log(editTaskInput)
     }

     const handleSubmit = (e) => { 
        dispatch(editTask(Task._id,({...editTaskInput,status : status.label, isOpen : isOpen, creator:valueCreator.value,
                                                      assignedTo : valueAssigned.value,
                                                      project:valueProjects.value}), navigate))

        console.log({...editTaskInput,isOpen : isOpen, creator:valueCreator.value,
                                                      assignedTo : valueAssigned.value,
                                                      project:valueProjects.value})
                                                     
    }

  return (
    <div>
        <Modal size='lg' show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Edit Task {Task.Title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>
              <Form>
        <Row className='mx-2'>
    <Form.Group className="mb-3" controlId="formBasicTitle">
      <Form.Label>Title</Form.Label>
      <Form.Control type="text" name="title"  onChange={handleChange} placeholder={Task.Title} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicDescription">
      <Form.Label>Description</Form.Label>
      <Form.Control type="text" name="description" onChange={handleChange} placeholder={Task.Description} />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicCreationDate">
      <Form.Label>Creation Date</Form.Label>
      <Form.Control type="date"  name="creationDate" onChange={handleChange} placeholder={Task.CreationDate} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCompletionDate">
      <Form.Label>Completion Date</Form.Label>
      <Form.Control type="date"  name="completionDate" onChange={handleChange} placeholder={Task.CompletionDate} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicStatus">
      <Form.Label>Status</Form.Label>
      <Select options={[{value : 0,label:"New"},
                        {value : 1,label:"Active"},
                        {value : 2,label:"Done"}]}     
                                hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeStatus.bind(this)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicProject">
      <Form.Label>Project</Form.Label>
      <Select options={projectsForDropDownList}     
                                hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListProjects.bind(this)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicCreator">
      <Form.Label>Creator</Form.Label>
      <Select options={users.concat(admins)}       
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListCreators.bind(this)} />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicAssignedTo">
      <Form.Label>Assigned To</Form.Label>
      <Select options={users.concat(admins)}       
                                     hideSelectedOptions={false}
                                closeMenuOnSelect={false}
                                isSearchable={true} onChange={handleChangeListAssigned.bind(this)} />
    </Form.Group>

    <div class="form-check fs-4 ms-3">
  <input class="form-check-input" name="isOpen" type="checkbox"  id="flexCheckDefault" checked={isOpen}  onChange={handleChangeChecked} />
  <label class="form-check-label" for="flexCheckDefault">
   Open
  </label>
</div>

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

export default EditTaskPage