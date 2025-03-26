import React from 'react';
import './CarInformation.scss';
import { Link } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const BMWM4 = () => {
  return (
        <div>
        <div className="header-buttons">
            <Link to="/home"><FaHome className="extra-icon" /></Link>
            <Link to="/"><FaSignOutAlt className="extra-icon" /></Link>
        </div>
      <h2>BMW M4</h2>
      <p>The BMW M4 balances luxury and performance, offering a comprehensive suite of driving aids and a refined interior. With a powerful inline-six engine, it’s designed for enthusiasts.</p>
      <ul>
        <li>Engine: 3.0L inline-six turbo</li>
        <li>Horsepower: 503 hp</li>
        <li>0-60 mph: 3.8 seconds</li>
        <li>Top Speed: 180 mph (with M Driver’s Package)</li>
        <li>MSRP: $71,800</li>
      </ul>
    </div>
  );
};

export default BMWM4;