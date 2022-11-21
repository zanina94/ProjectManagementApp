import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AdminProtectedRoute = () => {
    const {isAuth , userInfo} = useSelector(state => state.authUser)

  return (
    (isAuth && userInfo.role ==='Admin') ? <Outlet/> : <Navigate to='/Login'/> 
  )
}

export default AdminProtectedRoute