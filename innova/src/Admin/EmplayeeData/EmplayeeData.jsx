import React, { useEffect, useState } from 'react';
import './EmplayeeData.css';
import axios from 'axios';

const EmplayeeData = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/admin/emplayeedata')
      .then(response => {
        console.log(response.data.getData);
        setEmployeeData(response.data.getData || []); // Ensure it's always an array
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      });
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div className='emplayee-database'>
      <h1>Employee DataBase</h1>
      <div className='emplayee-database-table'>
        <table>
          <thead>
            <tr>
              <th>NO</th>
              <th>Full Name</th>
              <th>Gender</th>
              <th>Date Of Birth</th>
              <th>Email</th>
              <th>Number</th>
              <th>Address</th>
              <th>Street</th>
              <th>City</th>
              <th>Zip Code</th>
              <th>Qualification</th>
              <th>Experience</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(employeeData) && employeeData.map((employee, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{employee.firstName} {employee.lastName}</td>
                <td>{employee.gender}</td>
                <td>{new Date(employee.dateOfBirth).toLocaleDateString()}</td>
                <td>{employee.email}</td>
                <td>{employee.number}</td>
                <td>{employee.address}</td>
                <td>{employee.street}</td>
                <td>{employee.city}</td>
                <td>{employee.zipCode}</td>
                <td>{employee.qualification}</td>
                <td>{employee.experience}</td>
                <td>
                  {employee.resume ? (
                    <a href={employee.resume} target="_blank" rel="noopener noreferrer">View Resume</a>
                  ) : (
                    'No Resume Available'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmplayeeData;
