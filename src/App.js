import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "mapbox-gl/dist/mapbox-gl.css";
import Home from "./pages/Home";
import SubmitProject from "./pages/SubmitProject";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/submit-project" element={<SubmitProject />} />
        <Route exact path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  );
}

export default App;
