import React from 'react'
// import { Link } from 'react-router-dom'
import {Navbar,Container, Nav} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {LinkContainer} from 'react-router-bootstrap'
import { logoutUser } from '../Actions/userActions'

const Header = () => {
  const {isAuth, userInfo} = useSelector((state)=>state.authUser)
  const dispatch = useDispatch()
  const logOut =()=>{
    dispatch(logoutUser())
  }
  return (
    <header>    
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/">PROJECT MANAGEMENT APP</Navbar.Brand>
          <Nav className="header-navbar me-auto">
          <LinkContainer to="/">
          <Nav.Link ><i className='fas fa-diagram-project'></i> Projects</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/Tasks'>
            <Nav.Link><i className='fas fa-file-invoice'></i> Tasks</Nav.Link>
          </LinkContainer>
          {isAuth &&
          <LinkContainer to='/History'>
            <Nav.Link><i className='fas fa-calendar-week'></i> History</Nav.Link>
          </LinkContainer>
          }
          </Nav>
          <Nav className="header-navbar">
          {isAuth ? (
            <>
            <span className='text-light' style={{cursor : 'pointer'}}>{userInfo.firstName}</span>&nbsp;&nbsp;&nbsp;
            <span className='text-light' style={{cursor : 'pointer'}} onClick={logOut}>Logout</span>
            </>
          ) :
          <>
          <LinkContainer to='/Register'>
            <Nav.Link><i className='fas fa-id-card'></i> Register</Nav.Link>
          </LinkContainer>
          <LinkContainer to='/Login'>
            <Nav.Link><i className='fas fa-user'></i> Login</Nav.Link>
          </LinkContainer>
          </>
           }
          </Nav>
        </Container>
      </Navbar>
  </header>
  )
}

export default Header 
