import React, { useEffect, useState } from 'react'
import { ButtonGroup, Col, Container, Row, ToggleButton } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getAllHistories } from '../Actions/historyActions'
import History from '../Components/History'
import Loader from '../Components/Loader'
import Message from '../Components/Message'

const ListHistoriesPage = () => {
    const {loading,errors,histories} = useSelector(state=>state.listHistories)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [orderedHistories, setOrderedHistories] = useState(histories)
    const [radioValue, setRadioValue] = useState('0');

    const radios = [
      { name: 'Project', value: '1' },
      { name: 'Task', value: '2' },
      { name: 'Date', value: '3' },
    ];

    const orderByProject =  () => {
      navigate('/History')
      setOrderedHistories(histories.sort(function(a, b){
        let x = a.Project.Title.toLowerCase();
        let y = b.Project.Title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0}))
      console.log("by project")
    }

    const orderByTask =  () => {
      navigate('/History')
      setOrderedHistories(histories.sort(function(a, b){
        let x = a.Task == null ? " " : a.Task.Title.toLowerCase();
        let y = b.Task == null ? " " : b.Task.Title.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0}))
      console.log('by task')
    }

    const orderByDate =  () => {
      navigate('/History')
      setOrderedHistories(histories.sort((a,b)=>new Date(b.Date).getTime()-new Date(a.Date).getTime()))   
      console.log('by date')
    }

    const orderHistories =  (e) =>{
      setRadioValue(e.target.value)
      // console.log(e)
      if(e.target.value === '1')
      orderByProject()
      else if(e.target.value === '2')
      orderByTask()
      else if(e.target.value === '3')
      orderByDate()
      // console.log(currentValue)
    }

        useEffect(()=>{
            dispatch(getAllHistories())
          },[dispatch]) 
  return (
    <Container className='mt-4'>
      <Row className='mb-1'>
      <Col>
        <h1 className='float-start mx-0 px-0 my-3'>History</h1>
      </Col>
        <Col lg={7}>
        <Row className='my-3'>
        <Col className='my-auto' lg={4}><span className='fs-3 float-end' style={{fontWeight:'bold'}}>Order By : </span></Col> 
        <Col lg={8}> 
        <ButtonGroup>
        {radios.map((radio, idx) => (
          <ToggleButton
            style={{width:'140px'}}
            key={idx}
            id={`radio-${idx}`}
            type="radio"
            variant={'outline-primary'}
            name="radio"
            value={radio.value}
            checked={radioValue === radio.value}
            onChange={(e)=>orderHistories(e)}
          >
            {radio.name}
          </ToggleButton>
         
        ))}
      </ButtonGroup>
      </Col>
        {/* <Col lg={4}> 
        <Button variant="primary" onClick={orderByProject}>By Project</Button>

        </Col>
        <Col lg={4}> 
        <Button variant="primary" onClick={orderByTask}>By Task</Button>
        </Col>
        <Col lg={4}> 
        <Button variant="primary" onClick={orderByDate}>By Date</Button>
        </Col> */}
        </Row>
        </Col>
      </Row>
    {loading ? <Loader/> : errors ? <Message variant='danger'>{errors}</Message> : 
    <div>
       <Row className='my-2 bg-dark text-light' style={{height:60}}>
        <Col lg={2}className='my-auto'><b>Project</b></Col>
        <Col lg={2}className='my-auto'><b>Task</b></Col>
        <Col lg={2}className='my-auto'><b>Users</b></Col>
        <Col lg={3} className='my-auto'>
      <Row>
      <Col lg={6} className='my-auto mx-auto'><b>Date</b></Col>      
      <Col lg={6} className='my-auto'><b>Type</b></Col>  
      </Row>
    </Col>
        {/* <Col lg={1} className='my-auto'><b>Date</b></Col>
        <Col lg={1} className='my-auto'><b>Type</b></Col> */}
        <Col lg={3} className='my-auto'><b>Details</b></Col> 
       
    </Row> 

        {(histories.length >0 ) && histories.map(history => (
          <History key={history._id} history={history}/>
      ))}
      
      </div>
      }
</Container>
  )
}

export default ListHistoriesPage