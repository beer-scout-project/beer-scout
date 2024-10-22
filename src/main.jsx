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

const trackingId = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

const loadGoogleAnalytics = () => {
  if (!trackingId) return;

  const script = document.createElement("script");
  script.src = `https://www.googletagmanager.com/gtag/js?id=${trackingId}`;
  script.async = true;
  document.body.appendChild(script);

  window.datalayer = window.datalayer || [];
  function gtag() {
    window.datalayer.push(arguments);
  }
  window.gtag = gtag;
  gtag("js", new Date());
  gtag("config", trackingId);
};

const usePageTracking = () => {
  const location = useLocation();

  useEffect(() => {
    if (window.gtag) {
      window.gtag("config", trackingId, {
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
  useEffect(loadGoogleAnalytics, []);
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
