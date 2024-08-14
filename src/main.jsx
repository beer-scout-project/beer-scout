import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import Nav from './components/nav.jsx';
import Home from './pages/home.jsx';
import Explore from './pages/explore.jsx';

const App = () => (
  <Router>
    <div className='app-container'>
      <Nav />
      <div className='content-container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/explore' element={<Explore />} />
        </Routes>
      </div>
    </div>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
