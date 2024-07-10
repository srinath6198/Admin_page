import JobAdmin from "./Admin/JobAdmin/JobAdmin";
import Login from "./Admin/Login/Login";
import SignUp from "./Admin/Sign Up/SignUp";
import Career from "./Pages/Career";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import CareerForm from "./Pages/Form/CareerForm";
import Required from "./Admin/required/required";
import AdminPage from "./Admin/AdminPage/AdminPage";

function App() {
  return (
    <div>
   <BrowserRouter>
   <Routes>
   <Route path='/' element={<Career/>}/>
   {/* <Route path='/admin' element={<SignUp/>}/> */}
   <Route path='/admin' element={<Login/>}/>
   <Route path='/careerform' element={<CareerForm/>}/>
   <Route path='/login' element={<Login/>}/>
   <Route path='/adminpage' element={<Required><AdminPage/></Required> }/>
   <Route path='/jobadmin' element={<JobAdmin/> }/>
   </Routes>
   </BrowserRouter>
    </div>
  );
}

export default App;
