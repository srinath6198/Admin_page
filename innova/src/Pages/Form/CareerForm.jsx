import React from 'react';
import './CareerForm.css';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const CareerForm = () => {


  
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      dateOfBirth: '',
      email: '',
      number: '',
      address: '',
      street: '',
      city: '',
      zipCode: '',
      qualification: '',
      experience: '',
      resume: null,
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required('First Name is required'),
      lastName: Yup.string().required('Last Name is required'),
      gender: Yup.string().required('Gender is required'),
      dateOfBirth: Yup.date().required('Date of Birth is required'),
      email: Yup.string().email('Invalid email address').required('Email is required'),
      number: Yup.string().required('Number is required'),
      address: Yup.string().required('Address is required'),
      street: Yup.string().required('Street is required'),
      city: Yup.string().required('City is required'),
      zipCode: Yup.string().required('Zip Code is required'),
      qualification: Yup.string().required('Qualification is required'),
      experience: Yup.string().required('Experience is required'),
      resume: Yup.mixed().required('Resume is required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (values[key] !== null) {
          formData.append(key, values[key]);
        }
      });
      axios.post('http://127.0.0.1:5000/submit', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(response => {
        console.log(response.data);
        alert('Your application has been submitted successfully!');
      })
      .catch(error => {
        console.error(error);
        alert('An error occurred while submitting your application.');
      });
      
     console.log(formData);
    },
  });

  return (
   <div className='career-form-header'>
    <h1>Career Form</h1>
     <div className='career-form'>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            id="firstName"
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.firstName && formik.errors.firstName ? (
            <div className="error">{formik.errors.firstName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            id="lastName"
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.lastName && formik.errors.lastName ? (
            <div className="error">{formik.errors.lastName}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            name="gender"
            value={formik.values.gender}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {formik.touched.gender && formik.errors.gender ? (
            <div className="error">{formik.errors.gender}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="dateOfBirth">Date Of Birth</label>
          <input
            id="dateOfBirth"
            type="date"
            name="dateOfBirth"
            value={formik.values.dateOfBirth}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
            <div className="error">{formik.errors.dateOfBirth}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="Enter Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="error">{formik.errors.email}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="number">Number</label>
          <input
            id="number"
            type="text"
            name="number"
            placeholder="Number"
            value={formik.values.number}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.number && formik.errors.number ? (
            <div className="error">{formik.errors.number}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            type="text"
            name="address"
            placeholder="Enter Address"
            value={formik.values.address}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="street">Street</label>
          <input
            id="street"
            type="text"
            name="street"
            placeholder="Enter Street"
            value={formik.values.street}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.street && formik.errors.street ? (
            <div className="error">{formik.errors.street}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="city">City</label>
          <input
            id="city"
            type="text"
            name="city"
            placeholder="Enter City"
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="error">{formik.errors.city}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="zipCode">Zip Code</label>
          <input
            id="zipCode"
            type="text"
            name="zipCode"
            placeholder="Enter Zip code"
            value={formik.values.zipCode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.zipCode && formik.errors.zipCode ? (
            <div className="error">{formik.errors.zipCode}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="qualification">Qualification</label>
          <input
            id="qualification"
            type="text"
            name="qualification"
            placeholder="Enter Qualification"
            value={formik.values.qualification}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.qualification && formik.errors.qualification ? (
            <div className="error">{formik.errors.qualification}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="experience">Experience</label>
          <select
            id="experience"
            name="experience"
            value={formik.values.experience}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            <option value="">Select Experience</option>
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
          </select>
          {formik.touched.experience && formik.errors.experience ? (
            <div className="error">{formik.errors.experience}</div>
          ) : null}
        </div>

        <div className="form-group">
          <label htmlFor="resume">Resume</label>
          <input
            id="resume"
            type="file"
            name="resume"
            onChange={(event) => {
              formik.setFieldValue("resume", event.currentTarget.files[0]);
            }}
            onBlur={formik.handleBlur}
          />
          {formik.touched.resume && formik.errors.resume ? (
            <div className="error">{formik.errors.resume}</div>
          ) : null}
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
   </div>
  );
};

export default CareerForm;
