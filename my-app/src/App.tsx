import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import CarExtras from './Components/CarExtras/CarExtras';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/extras" element={<CarExtras />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
