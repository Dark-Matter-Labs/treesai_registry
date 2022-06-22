import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Home from "./pages/Home";
import SubmitProject from "./pages/SubmitProject";
import Portfolio from "./pages/Portfolio";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
  let loggedIn = false;
  if (sessionStorage.getItem("token") !== null) {
    loggedIn = true;
  }

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home loggedIn={loggedIn} />} />
        <Route
          exact
          path="/submit-project"
          element={<SubmitProject loggedIn={loggedIn} />}
        />
        <Route
          exact
          path="/portfolio"
          element={<Portfolio loggedIn={loggedIn} />}
        />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
