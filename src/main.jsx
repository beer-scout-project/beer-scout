console.log("Main file loaded");

import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import "./index.css";
import Nav from "./components/nav.jsx";
import Home from "./pages/home.jsx";
import BarList from "./pages/barList.jsx";
import AddBarForm from "./pages/addBarForm.jsx";
import AboutPage from "./pages/aboutPage.jsx";

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", "G-GGWTJ6V32P", {
        page_path: location.pathname,
      });
    }
  }, [location]);
};

const PageTrackingWrapper = () => {
  usePageTracking();
  return null; // Render nothing
};

const App = () => {
  return (
    <Router>
      <PageTrackingWrapper />
      <div className="app-container">
        <Nav />
        <div className="content-container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/bar-list" element={<BarList />} />
            <Route path="/add-bar" element={<AddBarForm />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

const container = document.getElementById("root");
if (!container.__reactRoot) {
  container.__reactRoot = ReactDOM.createRoot(container);
}

container.__reactRoot.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
