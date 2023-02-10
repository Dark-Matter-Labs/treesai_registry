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
import Account from './pages/Account';
import NotFound from './pages/NotFound';
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
        <Route exact path='/register' element={<Register />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/glasgow-nbs-portfolio' element={<Glasgow loggedIn={loggedIn} />} />
        <Route exact path='/invest' element={<Invest loggedIn={loggedIn} />} />
        <Route exact path='/learn-more' element={<Learn loggedIn={loggedIn} />} />
        <Route exact path='/contact' element={<Contact loggedIn={loggedIn} />} />
        <Route exact path='/account' element={<Account loggedIn={loggedIn} />} />
        <Route path='*' element={<NotFound loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
