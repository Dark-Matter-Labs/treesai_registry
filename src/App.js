import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from './pages/Home';
import SubmitProject from './pages/SubmitProject';
import Portfolio from './pages/Portfolio';
import Register from './pages/Register';
import Login from './pages/Login';
import ScrollToTop from './utils/ScrollToTop';

function App() {
  let loggedIn = false;
  if (sessionStorage.getItem('token') !== null && sessionStorage.getItem('token') !== undefined) {
    loggedIn = true;
  }

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route exact path='/' element={<Home loggedIn={loggedIn} />} />
        <Route exact path='/develop' element={<SubmitProject loggedIn={loggedIn} />} />
        <Route exact path='/explore' element={<Portfolio loggedIn={loggedIn} />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
