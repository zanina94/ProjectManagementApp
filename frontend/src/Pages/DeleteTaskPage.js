import React from 'react'
import { Button, Modal } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteTask, listTasks } from '../Actions/taskActions'

const DeleteTaskPage = ({show,handleClose,task}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
const handleClick =  e =>{
    dispatch(deleteTask(task._id,navigate))
    // dispatch(listTasks())
    // navigate('/')
    // window.location.reload()
    // navigate('/Tasks')
    // setTimeout(() => { navigate('/Task') ; window.location.reload() }, 1500);
}

  return (
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Task</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure, you want to delete  <b>{task.Title}</b> ??</Modal.Body>
    <Modal.Footer>
    <Button variant="primary" onClick={(e)=>{handleClose();handleClick(e);window.location.reload()}}>
        Delete
      </Button>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  )
}

export default DeleteTaskPage