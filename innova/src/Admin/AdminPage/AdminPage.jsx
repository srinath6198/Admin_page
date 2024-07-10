import React from 'react'
import './AdminPage.css';
import { useNavigate } from 'react-router-dom';
import JobAdmin from '../JobAdmin/JobAdmin';
import { JobDelete } from '../JobDelete/JobDelete';


const AdminPage = () => {
    const navigate = useNavigate();
    const redirect =()=>{
        localStorage.removeItem('token')
        navigate('/')
      }
  return (
    <div>
        <nav>
            <button onClick={redirect}>Logout</button>
        </nav>

        {/* job posting */}
        <JobAdmin/>
        <JobDelete/>
    </div>
  )
}

export default AdminPage