import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import "./OrderPage.scss";

interface Extra {
  id: number;
  [key: string]: number | boolean;
}

const OrderPage = () => {
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);
  const [totalPrices, setTotalPrices] = useState<number[]>([]);

  useEffect(() => {
    fetchCarExtras();
  }, []);

  const fetchCarExtras = () => {
    axios.get("https://localhost:7193/api/CarExtras")
      .then(({ data }) => {
        setSelectedExtras(data);
        const prices = data.map(calculateTotalPrice);
        setTotalPrices(prices);
      })
  };

  const calculateTotalPrice = (extra: Extra): number => {
    return Object.keys(extra)
      .filter(key => key.endsWith("Price") && typeof extra[key] === "number" && extra[key])
      .reduce((total, key) => total + (extra[key] as number), 0);
  };

  const handlePlaceOrder = (carIndex: number) => {
    alert(`Your order for car ${selectedExtras[carIndex].id} has been placed successfully!`);
  };

  const handleDeleteCar = (carId: number) => {
    axios.delete(`https://localhost:7193/api/CarExtras/${carId}`)
      .then(() => {
        setSelectedExtras(selectedExtras.filter(extra => extra.id !== carId));
      })
  };

  const createButton = (label: string, onClick: () => void) => (
    <button onClick={onClick} className="button">{label}</button>
  );

  return (
    <div className="OrderPage">
      <div className="header-buttons">
        <Link to="/home"><FaHome className="extra-icon" /></Link>
        <Link to="/"><FaSignOutAlt className="extra-icon" /></Link>
      </div>
      <h1>Place Your Orders</h1>
      {selectedExtras.map((extra, index) => (
        <div key={extra.id} className="car-container">
          <h2>Car {extra.id}</h2>
          <div className="extra-list">
            <ul>
              {Object.entries(extra).map(([key, value]) => {
                if (key.endsWith("Price") && typeof value === "number" && value) {
                  const propName = key.replace("Price", "");
                  return (
                    <li key={key}>
                      <span>{propName}</span>
                      <span> £{value}</span>
                    </li>
                  );
                }
                return null;
              })}
            </ul>
            <div className="total-price">Total Price: £{totalPrices[index]}</div>
            {createButton("Place Order", () => handlePlaceOrder(index))}
            <Link to="/extras">{createButton("Change Extras", () => {})}</Link>
            {createButton("Delete Car", () => handleDeleteCar(extra.id))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
