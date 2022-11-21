import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { closeProject } from '../Actions/projectActions';
import BootstrapSwitchButton from 'bootstrap-switch-button-react';
import EditProjectPage from '../Pages/EditProjectPage';


const Project = ({project}) => {
    const dispatch = useDispatch()
    const {isAuth, userInfo} = useSelector((state)=>state.authUser)
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);


  return (
    <>
<Row className='my-2 bg-dark text-light' style={{height:'120px'}}>
    <Col className='my-auto'>{project.Title}</Col>
    <Col className='my-auto'>{project.Description}</Col>
    <Col className='my-auto'>{new Date(project.CreationDate).toLocaleString('fr-FR')}</Col>
    <Col className='my-auto'>{project.Status === 'Green' ? <span className="badge bg-success fs-4">GREEN</span> : 
                              project.Status === 'Yellow'? <span className="badge bg-warning fs-4">YELLOW</span> :
                              <span className="badge bg-danger fs-4">RED</span>}
                              </Col>
    <Col className='my-auto'><ul>{project.Tasks.map(task=><li key={task._id +(Math.floor(Math.random() * 1000)).toString()}>{task.Title}</li>)}</ul></Col> 
    <Col className='my-auto'><ul>{project.Users.map(user=><li key={user._id +(Math.floor(Math.random() * 1000)).toString()}>{user.FirstName}:{user.Role}</li>)}</ul></Col>     
    <Col className='my-auto'>{project.IsClosed ? 'YES' : 'NO'}</Col>     
    {(isAuth && userInfo.role ==='Admin') && (<Col className='my-auto'><i style={{cursor : 'pointer'}} onClick={handleShowEdit} className='fs-3 fas fa-edit'></i>  
                       &nbsp;
          
                       <BootstrapSwitchButton 
           checked={project.IsClosed} width={105} height={15}
           onlabel='Open'
           onstyle='success'
           offlabel='Close'
           offstyle='danger'
        //    style='w-100 my-auto mx-auto py-auto'
           onChange={(checked) => {
            // event.preventDefault()
            dispatch(closeProject(project._id,{isClosed : checked}))
            window.location.reload()
           }
        }
        />
        </Col> )
}   
</Row>

 <EditProjectPage show={showEdit} handleClose={handleCloseEdit} Project={project} />

</>
  )
}

export default Project