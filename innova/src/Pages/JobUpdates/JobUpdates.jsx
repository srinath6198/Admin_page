import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './JobUpdates.css';

const JobUpdates = () => {
  const [jobs, setJobs] = useState([]);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch job data from API
    const fetchJobs = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/admin/jobgetData');
        setJobs(response.data.posts); 
      } catch (error) {
        console.error('Error fetching job data:', error);
        setError('Error fetching job data');
      }
    };

    fetchJobs();
  }, []); 


  const handleApplyClick = () => {
    navigate('/careerform'); 
  };

  return (
    <div className='career-table'>
      <h1>Latest Job Openings</h1>
      {error && <div className='error_msg'>{error}</div>}
      <table>
        <thead>
          <tr>
            <th>Job Title</th>
            <th>Salary</th>
            <th>Location</th>
            <th>Date Posted</th>
            <th>Apply</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.jobName}</td>
                <td>{job.salary}</td>
                <td>{job.location}</td>
                <td>{new Date(job.datePosted).toLocaleDateString()}</td> {/* Format date */}
                <td><button onClick={handleApplyClick}>Apply</button></td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5">No job openings available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default JobUpdates;
