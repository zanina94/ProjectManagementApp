import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { listProjects } from '../Actions/projectActions'
import { getAllUsers } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'
import Project from '../Components/Project'

const ListProjectsPage = () => {
    const {loading,errors,projects} = useSelector(state=>state.listProjects)
    const {isAuth,userInfo} = useSelector(state=>state.authUser)
    const dispatch = useDispatch()
    

        useEffect(()=>{
            dispatch(listProjects())
            dispatch(getAllUsers())
          },[dispatch]) 
  return (
    <Container className='mt-4'>
      <Row className='mb-1'>
      <Col>
         <h1 className='float-start mx-0 px-0 my-3'>List Of Projects</h1> 
      </Col>
        <Col>
        {(isAuth && userInfo.role ==='Admin') && <Link className='btn btn-primary my-2 float-end' to='/AddProject'><i className='fas fa-plus'></i>&nbsp; Add Project</Link>}
        </Col>
      </Row>
    {loading ? <Loader/> : errors ? <Message variant='danger'>{errors}</Message> : 
    <div>
       <Row className='my-2 bg-dark text-light' style={{height:60}}>
        <Col className='my-auto'><b>Title</b></Col>
        <Col className='my-auto'><b>Description</b></Col>
        <Col className='my-auto'><b>Creation Date</b></Col>
        <Col className='my-auto'><b>Status</b></Col> 
        <Col className='my-auto'><b>Tasks</b></Col>
        <Col className='my-auto'><b>Users</b></Col>
        <Col className='my-auto'><b>Closed</b></Col>
        {(isAuth && userInfo.role ==='Admin') && <Col className='my-auto'><b>Action</b></Col>}
    </Row> 

      {(projects.length >0 ) && projects.map(project => (
          <Project key={project._id} project={project}/>
      ))}
      </div>
      }
</Container>
  )
}

export default ListProjectsPage