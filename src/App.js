import React, { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import 'mapbox-gl/dist/mapbox-gl.css';
import Home from './pages/Home';
import Glasgow from './pages/Glasgow';
import Invest from './pages/Invest';
import Learn from './pages/Learn';
import Contact from './pages/Contact';
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
        <Route exact path='/glasgow-nbs-portfolio' element={<Glasgow loggedIn={loggedIn} />} />
        <Route exact path='/invest' element={<Invest loggedIn={loggedIn} />} />
        <Route exact path='/learn-more' element={<Learn loggedIn={loggedIn} />} />
        <Route exact path='/contact' element={<Contact loggedIn={loggedIn} />} />
        <Route path='*' element={<NotFound loggedIn={loggedIn} />} />
      </Routes>
    </Router>
  );
}

export default App;
