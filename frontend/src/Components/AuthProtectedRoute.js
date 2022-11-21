import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const AuthProtectedRoute = () => {
    const {isAuth} = useSelector(state => state.authUser)

  return (
    (isAuth) ? <Outlet/> : <Navigate to='/Login' />
  )
}

export default AuthProtectedRoute