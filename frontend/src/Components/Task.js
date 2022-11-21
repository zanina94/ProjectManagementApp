import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import DeleteTaskPage from '../Pages/DeleteTaskPage';
import EditTaskPage from '../Pages/EditTaskPage';
// import DeleteUserModal from '../pages/DeleteUserModal';
// import EditUserPage from '../pages/EditUserPage';

const Task = ({task}) => {
  const {isAuth} = useSelector((state)=>state.authUser)
    const [showEdit, setShowEdit] = useState(false);

    const handleCloseEdit = () => setShowEdit(false);
    const handleShowEdit = () => setShowEdit(true);


    
  const [showDelete, setShowDelete] = useState(false);

  const handleCloseDelete = () => setShowDelete(false);
  const handleShowDelete = () => setShowDelete(true);
  
//   const closeProject = () => {
//     dispatch(closeProject(project._id,{isClosed : !project.IsClosed}))
// }

  return (
    <>
<Row className='my-2 bg-dark text-light' style={{height:'100px'}}>
    <Col className='my-auto'>{task.Title}</Col>
    <Col className='my-auto'>{task.Description}</Col>
    <Col className='my-auto'>{task.Project.Title}</Col> 
    <Col className='my-auto'>{new Date(task.CreationDate).toLocaleString('fr-FR')}</Col>
    <Col className='my-auto'>{new Date(task.CompletionDate).toLocaleString('fr-FR')}</Col>
    <Col className='my-auto'>{task.Status === 'New' ? <span className="badge bg-warning fs-4">{task.Status}</span> : 
                              task.Status === 'Active'? <span className="badge bg-success fs-4">{task.Status}</span> :
                              <span className="badge bg-info fs-4">{task.Status}</span>}</Col>
    <Col className='my-auto'>{task.Creator.FirstName}&nbsp;{task.Creator.LastName}</Col>   
    <Col className='my-auto'>{task.AssignedTo.FirstName}&nbsp;{task.AssignedTo.LastName}</Col>    
    <Col className='my-auto'>{task.IsOpen ? 'YES' : 'NO'}</Col>     
    {isAuth && <Col className='my-auto'><i style={{cursor : 'pointer'}} onClick={handleShowEdit} className='fs-3 fas fa-edit'></i>  
                       &nbsp;<i style={{cursor : 'pointer'}} onClick={handleShowDelete} className='fs-3 fas fa-trash'></i></Col> }      
</Row>


<EditTaskPage show={showEdit} handleClose={handleCloseEdit} Task={task} />
<DeleteTaskPage show={showDelete} handleClose={handleCloseDelete} task={task} />

</>
  )
}

export default Task