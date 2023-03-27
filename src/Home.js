import React from 'react'
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import App from './App';
import Login from './Login';
import Signup from './Signup';

function Home() {
  return (
    <div>
      <Router>
        <Link className="" to="/login">Login</Link>
        <p></p>
        <Link className="" to="/signup">Sign Up</Link>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<App /> } />
          </Routes>
      </Router>
    </div>
  )
}

export default Home