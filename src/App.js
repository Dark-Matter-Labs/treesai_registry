import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from './pages/Home';
import Develop from './pages/Develop';
import Explore from './pages/Explore';
import Register from './pages/Register';
import Login from './pages/Login';
import Glasgow from './pages/Glasgow';
import Invest from './pages/Invest';
import Learn from './pages/Learn';
import Contact from './pages/Contact';
import Demo from './pages/Demo';
import Account from './pages/Account';
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
        <Route exact path='/develop' element={<Develop loggedIn={loggedIn} />} />
        <Route exact path='/explore' element={<Explore loggedIn={loggedIn} />} />
        <Route exact path='/demo' element={<Demo />} />
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/glasgow-nbs-portfolio' element={<Glasgow />} />
        <Route exact path='/invest' element={<Invest />} />
        <Route exact path='/learn-more' element={<Learn />} />
        <Route exact path='/contact' element={<Contact />} />
        <Route exact path='/demo' element={<Demo />} />
        <Route exact path='/account' element={<Account loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
