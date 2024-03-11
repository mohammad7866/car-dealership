import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import CarExtras from './Components/CarExtras/CarExtras';
import Register from './Components/Register/Register';
import HomePage from './Components/HomePage/HomePage'; // Import the new home page component
import OrderPage from './Components/CarOrder/OrderPage';

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Login />} /> {/* Assuming Login component is for login page */}
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<HomePage />} /> {/* Set the home page route */}
          <Route path="/extras" element={<CarExtras />} />
          <Route path="/order" element={<OrderPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
