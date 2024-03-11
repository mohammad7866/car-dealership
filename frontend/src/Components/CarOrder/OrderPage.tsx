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
    axios
      .get("https://localhost:7193/api/CarExtras")
      .then((response) => {
        setSelectedExtras(response.data);
        const prices = response.data.map((extra: Extra) => calculateTotalPrice(extra));
        setTotalPrices(prices);
      })
      .catch((error) => {
        console.error("Error fetching selected extras:", error);
      });
  }, []);

  const calculateTotalPrice = (extra: Extra): number => {
    let totalPrice = 0;
    for (const key in extra) {
      if (key.endsWith("Price")) {
        const propName = key.replace("Price", "");
        if (typeof extra[key] === "number" && extra[propName]) {
          totalPrice += extra[key] as number;
        }
      }
    }
    return totalPrice;
  };

  const handlePlaceOrder = (carIndex: number) => {
    console.log("Placing order for car:", selectedExtras[carIndex]);
    alert("Your order for car " + selectedExtras[carIndex].id + " has been placed successfully!");
  };

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
              {Object.keys(extra).map((key) => {
                if (typeof key === "string" && key.endsWith("Price") && typeof extra[key] === "number") {
                  const propName = key.replace("Price", "");
                  if (extra[propName]) {
                    return (
                      <li key={key}>
                        <span>{propName}</span>
                        <span> £{extra[key]}</span>
                      </li>
                    );
                  }
                }
                return null;
              })}
            </ul>
            <div className="total-price">Total Price: £{totalPrices[index]}</div>
            <button onClick={() => handlePlaceOrder(index)}>Place Order</button>
            <Link to="/extras"><button>Change Extras</button></Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderPage;
