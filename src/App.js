import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import SubmitProject from "./pages/SubmitProject";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/submit-project" element={<SubmitProject />} />
      </Routes>
    </Router>
  );
}

export default App;
