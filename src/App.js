import { Course } from './College/Course';
// import { Context } from './ContextAPI/Context';
// import { Login } from './ContextAPI/login';
// import { Header } from './ContextAPI/Header';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Students } from './College/Students';
import { Staff } from './College/Staff';
import './College/College.css'
import { ToastContainer } from 'react-toastify';
function App() {
  return (
    // <Context>
    //   <Header />
    //   <Login />
    <div>
      <ToastContainer />
      <Router>
        <ul className='navbar'>
          <li><Link to='/'>Staff </Link></li>
          <li><Link to='/course'>Course</Link></li>
          <li><Link to='/student'> Students </Link></li>
        </ul>
        <Routes>
          <Route path='/' element={<Staff />} />
          <Route path='/student' element={<Students />} />
          <Route path='/course' element={<Course />} />
        </Routes>
      </Router>
    </div>

  );
}

export default App;
