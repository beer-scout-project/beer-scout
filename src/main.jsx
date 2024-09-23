console.log("Main file loaded");

import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Nav from "./components/nav.jsx";
import Home from "./pages/home.jsx";
import BarList from "./pages/barList.jsx";
import AddBarForm from "./pages/addBarForm.jsx";
// temp
import TempDisplay from "./pages/tempDisplay.jsx";
import AboutPage from "./pages/aboutPage.jsx";

const App = () => (
  <Router>
    <div className="app-container">
      <Nav />
      <div className="content-container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/bar-list" element={<BarList />} />
          <Route path="/add-bar" element={<AddBarForm />} />
          {/* temp */}
          <Route path="/temp" element={<TempDisplay />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </div>
  </Router>
);

const container = document.getElementById("root");
if (!container.__reactRoot) {
  container.__reactRoot = ReactDOM.createRoot(container);
}

container.__reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
