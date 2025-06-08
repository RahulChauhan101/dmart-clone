import React from 'react'
import Navbar from '../components/Navbar'
import { useLocation, Outlet } from 'react-router-dom'

const Rootlayout = ({setUser}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <>
    {!isLoginPage && <Navbar setUser={setUser}/>}
    <Outlet />
    </>
  )
}

export default Rootlayout