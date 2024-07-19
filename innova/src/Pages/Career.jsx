import React from 'react'
import './Career.css'
import {Link} from 'react-router-dom'
import image from '../Assets/carrer1.jpg'
// import CareerForm from './Form/CareerForm'
import JobUpdates from './JobUpdates/JobUpdates'


const Career = () => {
  return (
    <div>
            <section className='container-xs  career'>
        <div className='container-sm carerr-content'>
            <h1>Job Seekers</h1>
            <h2> Innovaskill Technologies provide best opportunities in various sector such as</h2>
            {/* <button><Link to={'/admin'}>ADMIN</Link></button> */}
            {localStorage.getItem('token')?<button onClick={()=>{localStorage.removeItem('token');window.location='/'}}>Logout</button>
            :<button><Link to={'/admin'}>Login</Link></button>}
        </div>
            </section>
            <div className="  career-content">
              <div className='career-content-header'>
              <h1>About Us</h1>
              <h2> Innovaskill Technologies provide best opportunities in various sector such as</h2>
              </div>
              <div className=' row career-flex'>
                <div className=' col-md w-100 career-flex-left'>
                <p>Electronic Design Automation Industrial Automation Information Security Software Development
                 Civil and Mechanical Design Computerised Accounting Digital Marketing And many more</p>
                 <p> Innovaskill is eagerly following up the current requirement of each client and noted the 
                  uniquenes, so we provide services based on individual needs and requirements for young 
                  talents under the umbrella of tech and management profession to provide accurate resolutions. 
                  We serves our clients the best to provide customized solutions by considering Clients’ corporate 
                  culture, management style and philosophy. We work for almost all the sectors and our services are 
                  available across nation (PAN) For any kind of Manpower Requirements please feel free to reach out to 
                  us by filling the details below and we will contact you soon.</p>
                  <p> If you wish to be considered for any of our Openings, you may please submit your Curriculum Vitae 
                    and We will assist you in the best possible manner.</p>
                </div>
                <div className="col-md-8  career-flex-right">
                  <img src={image} alt="" />
                </div>
              </div>
            </div>

            {/* <div className='career-form'>
             <CareerForm/>
            </div> */}
            <div>
              <JobUpdates/>
            </div>
    </div>
  )
}

export default Career