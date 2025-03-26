import React from 'react';
import './CarInformation.scss';
import { Link } from 'react-router-dom';
import { FaHome, FaSignOutAlt } from 'react-icons/fa';

const BMWM5 = () => {
    return (      
        <div>
        <div className="header-buttons">
            <Link to="/home"><FaHome className="extra-icon" /></Link>
            <Link to="/"><FaSignOutAlt className="extra-icon" /></Link>
        </div>
      <h2>BMW M5</h2>
      <p>The BMW M5 redefines power and luxury in a sedan. Known for its precision engineering and luxurious interior, it combines explosive performance with the comfort of a high-end salon.</p>
      <ul>
        <li>Engine: 4.4L V8 twin-turbo</li>
        <li>Horsepower: 600 hp</li>
        <li>0-60 mph: 3.2 seconds</li>
        <li>Top Speed: 190 mph (with M Driver’s Package)</li>
        <li>MSRP: $104,495</li>
      </ul>
    </div>
  );
};

export default BMWM5;