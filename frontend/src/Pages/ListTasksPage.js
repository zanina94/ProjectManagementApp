import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { listProjects } from '../Actions/projectActions'
import { listTasks } from '../Actions/taskActions'
import { getAllUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Project from '../Components/Project'
import Task from '../Components/Task'

const ListTasksPage = () => {
    const {projects} = useSelector(state=>state.listProjects)
    const {loading,errors,tasks} = useSelector(state=>state.listTasks)
    const {isAuth} = useSelector(state=>state.authUser)
    const dispatch = useDispatch()
 


        useEffect(()=>{
            dispatch(listProjects())
            dispatch(listTasks())
            
            dispatch(getAllUsers())
        
            // window.location.reload()

          },[dispatch]) 
  return (
    <Container className='mt-4'>
      <Row className='mb-1'>
      <Col>
        <h1 className='float-start mx-0 px-0 my-3'>List Of Tasks</h1>
      </Col>
        <Col>
        {(isAuth) && <Link style={{width:'177px'}} className='btn btn-primary my-2 float-end' to='/AddTask'><i className='fas fa-plus'></i>&nbsp;Add Task</Link>}
        </Col>
      </Row>
    {loading ? <Loader/> : errors ? <Message variant='danger'>{errors}</Message> : 
    <div>
       <Row className='my-2 bg-dark text-light ' style={{height:60}}>
        <Col className='my-auto'><b>Title</b></Col>
        <Col className='my-auto'><b>Description</b></Col>
        <Col className='my-auto'><b>Project</b></Col>
        <Col className='my-auto'><b>Creation Date</b></Col>
        <Col className='my-auto'><b>Completion Date</b></Col>
        <Col className='my-auto'><b>Status</b></Col> 
        <Col className='my-auto'><b>Creator</b></Col>
        <Col className='my-auto'><b>Assigned To</b></Col>
        <Col className='my-auto'><b>Open</b></Col>
        {isAuth && <Col className='my-auto'><b>Action</b></Col>}
    </Row> 

      {(tasks.length >0 ) && tasks.map(task => (
          <Task key={task._id} task={task}/>
      ))}
      </div>
      }
</Container>
  )
}

export default ListTasksPage