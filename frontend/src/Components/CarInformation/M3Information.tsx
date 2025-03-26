import React from 'react';
import './CarInformation.scss';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const BMWM3 = () => {
  return (
        <div>
        <div className="header-buttons">
            <Link to="/home"><FaHome className="extra-icon" /></Link>
            <Link to="/"><FaSignOutAlt className="extra-icon" /></Link>
        </div>      <h2>BMW M3</h2>
      <p>The BMW M3 is a legend in the automotive world, known for its sporty performance and agility. It features a turbocharged inline-six engine and is equipped for speed and precision.</p>
      <ul>
        <li>Engine: 3.0L inline-six turbo</li>
        <li>Horsepower: 473 hp</li>
        <li>0-60 mph: 4.1 seconds</li>
        <li>Top Speed: 155 mph (electronically limited)</li>
        <li>MSRP: $69,900</li>
      </ul>
    </div>
  );
};

export default BMWM3;