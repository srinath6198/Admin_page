import React, { useState } from 'react';
import axios from 'axios';
import './JobAdmin.css';
// import { useNavigate } from 'react-router-dom';

const JobAdmin = () => {

  // const navigate = useNavigate();
  const [data, setData] = useState({
    jobName: '',
    salary: '',
    location: '',
    datePosted: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = ({ target: { name, value } }) => {
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const newErrors = {};
    if (!data.jobName) newErrors.jobName = "Job Title is required";
    if (!data.salary) newErrors.salary = "Salary is required";
    if (!data.location) newErrors.location = "Location is required";
    if (!data.datePosted) newErrors.datePosted = "Date Posted is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setSuccessMessage('');
      setErrorMessage('');
      try {
        const response = await axios.post('http://127.0.0.1:5000/admin/jobpost', data);
        console.log('Form submitted successfully:', response.data);
        setSuccessMessage('Job Podted successfully');
        setData({
          jobName: '',
          salary: '',
          location: '',
          datePosted: '',
        });
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Error submitting form');
      } finally {
        setLoading(false);
      }
    } else {
      setErrors(newErrors);
    }
  };

  // const redirect =()=>{
  //   localStorage.removeItem('token')
  //   navigate('/login')
  // }

  return (

    <div className='admin_container-header'>
      <h1>Job Post</h1>
      <div className='admin_container'>
      <div className='admin_form_container'>
        <div className='admin_left'>
          <form className='admin_form_container' onSubmit={handleSubmit}>
            {/* <h1 onClick={redirect}>Job Post</h1> */}
            <br />
            <br />
            <input
              type="text"
              placeholder="Job Title"
              name="jobName"
              value={data.jobName}
              onChange={handleChange}
              className='input'
            />
            {errors.jobName && <div className='error_msg'>{errors.jobName}</div>}
            <input
              type="text"
              placeholder="Salary"
              name="salary"
              value={data.salary}
              onChange={handleChange}
              className='input'
            />
            {errors.salary && <div className='error_msg'>{errors.salary}</div>}
            <input
              type="text"
              placeholder="Location"
              name="location"
              value={data.location}
              onChange={handleChange}
              className='input'
            />
            {errors.location && <div className='error_msg'>{errors.location}</div>}
            <input
              type="date"
              placeholder="Date Posted"
              name="datePosted"
              value={data.datePosted}
              onChange={handleChange}
              className='input'
            />
            {errors.datePosted && <div className='error_msg'>{errors.datePosted}</div>}
            <button type="submit" className='admin_green_btn' disabled={loading}>
              {loading ? 'Posting...' : 'Post Job'}
            </button>
            {successMessage && <div className='success_msg'><h2>{successMessage}</h2></div>}
            {errorMessage && <div className='error_msg'>{errorMessage}</div>}
          </form>
        </div>
      </div>
    </div>
    </div>
  );
};

export default JobAdmin;
