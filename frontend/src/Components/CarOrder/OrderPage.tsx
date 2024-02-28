import React, { useState, useEffect } from "react";
import axios from "axios";
import "./OrderPage.scss"; // Import the SCSS file

// Define an interface representing the structure of your extra objects
interface Extra {
  id: number;
  name: string;
  adaptiveCruiseControl: boolean;
  autoDimmingMirrors: boolean;
  blindSpotMonitoring: boolean;
  cameraSystem360: boolean;
  cupHolders: boolean;
  driverAssistancePackage: boolean;
  heatedSeats: boolean;
  heatedSteeringWheel: boolean;
  keylessEntry: boolean;
  laneAssist: boolean;
  memorySeats: boolean;
  navigationSystem: boolean;
  panRoof: boolean;
  parkAssist: boolean;
  powerLiftgate: boolean;
  premiumSoundSystem: boolean;
  remoteStart: boolean;
  trafficSignRecognition: boolean;
  upgradedAlloys: boolean;
  ventilatedSeats: boolean;
  wirelessCharging: boolean;
}

const OrderPage = () => {
  const [selectedExtras, setSelectedExtras] = useState<Extra[]>([]);

  useEffect(() => {
    // Fetch selected extras from the API endpoint
    axios
      .get("https://localhost:7193/api/CarExtras")
      .then((response) => {
        setSelectedExtras(response.data);
      })
      .catch((error) => {
        console.error("Error fetching selected extras:", error);
      });
  }, []);

  const handlePlaceOrder = () => {
    // Handle placing the order (e.g., send data to backend)
    console.log("Placing order with selected extras:", selectedExtras);
    // Display confirmation message
    alert("Your order has been placed successfully!");
  };

  return (
    <div className="OrderPage">
      <h1>Place Your Order</h1>
      <div className="extra-list">
        <h2>Selected Extras</h2>
        <ul>
          {selectedExtras.map((extra, index) => (
            <li key={extra.id}>
              <div className="extra-item">
                <span className="extra-name">{extra.name}</span>
                <span className="extra-property">
                  {extra.adaptiveCruiseControl && "Adaptive Cruise Control, "}
                  {extra.autoDimmingMirrors && "Auto-Dimming Mirrors, "}
                  {extra.blindSpotMonitoring && "Blind Spot Monitoring, "}
                  {extra.cameraSystem360 && "360 Camera System, "}
                  {extra.cupHolders && "Cup Holders, "}
                  {extra.driverAssistancePackage && "Driver Assistance Package, "}
                  {extra.heatedSeats && "Heated Seats, "}
                  {extra.heatedSteeringWheel && "Heated Steering Wheel, "}
                  {extra.keylessEntry && "Keyless Entry, "}
                  {extra.laneAssist && "Lane Assist, "}
                  {extra.memorySeats && "Memory Seats, "}
                  {extra.navigationSystem && "Navigation System, "}
                  {extra.panRoof && "Panoramic Roof, "}
                  {extra.parkAssist && "Park Assist, "}
                  {extra.powerLiftgate && "Power Liftgate, "}
                  {extra.premiumSoundSystem && "Premium Sound System, "}
                  {extra.remoteStart && "Remote Start, "}
                  {extra.trafficSignRecognition && "Traffic Sign Recognition, "}
                  {extra.upgradedAlloys && "Upgraded Alloys, "}
                  {extra.ventilatedSeats && "Ventilated Seats, "}
                  {extra.wirelessCharging && "Wireless Charging, "}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
};

export default OrderPage;
