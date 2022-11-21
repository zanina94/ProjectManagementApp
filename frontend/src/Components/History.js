import React from 'react'
import { Col, Row } from 'react-bootstrap'


const History = ({history}) => {

  return (
    <>
<Row className='my-2 bg-dark text-light' style={{height:'130px'}}>
    <Col lg={2} className='my-auto'>{history.Project == null ? " " : history.Project.Title}</Col>
    <Col lg={2} className='my-auto'>{history.Task == null ? " " : history.Task.Title}</Col>
    <Col lg={2} className='my-auto'><ul>{history.Users.map(user=><li key={user._id+(Math.floor(Math.random() * 1000)).toString()}>{user.FirstName}&nbsp;{user.LastName}</li>)}</ul></Col> 
    <Col lg={3} className='my-auto'>
      <Row>
      <Col lg={6} className='my-auto mx-auto'>{new Date(history.Date).toLocaleString('fr-FR')}</Col>      
      <Col lg={6} className='my-auto'>{history.Type === "New" ? <span className="badge bg-info fs-4">{history.Type}</span> : 
                              history.Type === "Update"? <span className="badge bg-warning fs-4">{history.Type}</span> :
                              <span className="badge bg-danger fs-4">{history.Type}</span>}</Col>  
      </Row>
    </Col>
    {/* <Col lg={1} className='my-auto mx-auto'>{new Date(history.Date).toLocaleString('fr-FR')}</Col>
    <Col lg={1} className='my-auto'>{history.Type}</Col> */}
    <Col lg={3} className='my-auto'>{history.Details}</Col>        
</Row>


</>
  )
}

export default History