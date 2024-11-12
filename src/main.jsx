import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import Nav from "./components/nav";
import Home from "./pages/home";
import BarList from "./pages/barList";
import AddBarForm from "./pages/addBarForm";
import AboutPage from "./pages/aboutPage";
import AdminLogin from "./pages/adminLogin";
import AdminPanel from "./pages/adminPanel";
import ProtectedRoute from "./utils/protectedRoute";
import { AuthProvider } from "./utils/authProvider";
import ContactPage from "./pages/contactPage";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Nav />
          <div className="content-container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/bar-list" element={<BarList />} />
              <Route path="/add-bar" element={<AddBarForm />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/admin-panel"
                element={
                  <ProtectedRoute>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
