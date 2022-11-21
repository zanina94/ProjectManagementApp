import React, { useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../Actions/userActions'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const RegisterPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {loading,errors} = useSelector(state=>state.authUser)
    const [registerInput, setRegisterInput] = useState({})

    const handleChange = (e) => { 
        setRegisterInput({...registerInput, [e.target.name] : e.target.value})
     }

const handleSubmit = (e) => { 
    e.preventDefault()
    dispatch(registerUser(registerInput,navigate))
    // console.log('button')
}

  return (
    <Container style={{width:'50%'}} className='mt-5'>
    <Form>
        <Row>
    <Col md={12}>
    <Form.Group className="mb-3" controlId="formBasicFirstName">
      <Form.Label>First Name</Form.Label>
      <Form.Control type="text" name="firstName" onChange={handleChange} placeholder="Enter first name" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicLastName">
      <Form.Label>Last Name</Form.Label>
      <Form.Control type="text" name="lastName" onChange={handleChange} placeholder="Enter last name" />
    </Form.Group>
    
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control type="email" name="email" onChange={handleChange} placeholder="Enter email" />
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicPassword">
      <Form.Label>Password</Form.Label>
      <Form.Control type="password" name="password" onChange={handleChange} placeholder="Password" />
    </Form.Group>

    </Col>
    </Row>
    {errors && <Message variant='danger'>{errors}</Message>}
    <Button variant="primary" type="submit" onClick={handleSubmit}>
     {loading ? <Loader/> : 'Register'}
    </Button>
  </Form>
  </Container>
    
  )
}

export default RegisterPage