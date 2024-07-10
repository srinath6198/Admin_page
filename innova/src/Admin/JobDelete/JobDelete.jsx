import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './JobDelete.css';

export const JobDelete = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        // Fetch job data from API
        const fetchJobs = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/admin/jobgetData');
                setJobs(response.data.posts);
            } catch (error) {
                console.error('Error fetching job data:', error);
                
            }
        };

        fetchJobs();
    }, []);

    const handleDeleteClick = async (jobId) => {
        console.log('Deleting job with ID:', jobId); // Log the job ID
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/admin/jobdataDelete/${jobId}`);
            console.log('Delete response:', response); 
            // Update state to remove the deleted job
            setJobs(jobs.filter(job => job._id !== jobId));
        } catch (error) {
            console.error('Error deleting job post:', error);
          
        }
    };

    return (
        <div className='admin-table'>
            <h1>Latest Job Openings Updated</h1>
           
            <table>
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Salary</th>
                        <th>Location</th>
                        <th>Date Posted</th>
                        <th>Delete</th>
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
                                <td>
                                    <button onClick={() => handleDeleteClick(job._id)}>Delete Post</button>
                                </td>
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
