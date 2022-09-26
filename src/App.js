import './App.css';
import Navbar from './components/navbar/Navbar';
import {Routes, Route} from 'react-router-dom';
import EmployeeRegistration from './pages/registrationform/EmployeeRegistration';
import ViewEmployees from './pages/viewemployees/ViewEmployees';
import HomePage from './pages/homepage/HomePage';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
          <Route path='/' exact element={<HomePage />}/>
          <Route path='/registration' exact element={<EmployeeRegistration />}/>
          <Route path='/viewemployees' exact element={<ViewEmployees />} />
      </Routes>
      <ToastContainer autoClose={1200} position="top-right" />
    </div>
  );
}

export default App;
