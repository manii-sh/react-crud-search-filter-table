import React from 'react'
import "./Navbar.css"
import {useNavigate} from "react-router-dom"

const Navbar = () => {
    const navigate = useNavigate();

    const navChange = (path) => {
        navigate(path);
    }

  return (
    <div className='navbarMainDiv'>
        <span className='title' onClick={()=>navChange('/')}>DigiMantra Employees</span>

        <div className='navLinks'>
            <span className='link' onClick={()=>navChange('/registration')}>Register</span>
            <span>|</span>
            <span className='link' onClick={()=>navChange('/viewemployees')}>View Employees</span>
        </div>
    </div>
  )
}

export default Navbar