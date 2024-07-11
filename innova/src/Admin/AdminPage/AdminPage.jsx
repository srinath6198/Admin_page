import React from 'react'
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';
import JobAdmin from '../JobAdmin/JobAdmin';
import { JobDelete } from '../JobDelete/JobDelete';
import EmplayeeData from '../EmplayeeData/EmplayeeData';


const AdminPage = () => {
    const navigate = useNavigate();
    const redirect =()=>{
        localStorage.removeItem('token')
        navigate('/')
      }
  return (
    <div>
        <nav className='navBar-btn'>
            <button onClick={redirect}>Logout</button>
        </nav>

        {/* job posting */}
        <JobAdmin/>
        <JobDelete/>
        <EmplayeeData/>
    </div>
  )
}

export default AdminPage