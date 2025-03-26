import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import CarExtras from './Components/CarExtras/CarExtras';
import Register from './Components/Register/Register';
import HomePage from './Components/HomePage/HomePage'; // Import the new home page component
import OrderPage from './Components/CarOrder/OrderPage';
import M3Information from './Components/CarInformation/M3Information';
import M4Information from './Components/CarInformation/M4Information';
import M5Information from './Components/CarInformation/M5Information';



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
          <Route path="/M3-information" element={<M3Information />} />
          <Route path="/M4-information" element={<M4Information />} />
          <Route path="/M5-information" element={<M5Information />} />


        </Routes>
      </div>
    </Router>
  );
};

export default App;
