import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import "./CarExtras.scss";

interface CarExtra {
  id: number;
  [key: string]: boolean | number; // Allow any key of type boolean or number
}

type ExtraKey = keyof CarExtra;

const CarExtras = () => {
  const [extras, setExtras] = useState<CarExtra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<Record<number, Partial<CarExtra>>>({});

  useEffect(() => {
    fetchCarExtras();
  }, []);

  const fetchCarExtras = () => {
    axios
      .get<CarExtra[]>("https://localhost:7193/api/CarExtras")
      .then((response) => {
        console.log("Fetched car extras:", response.data);
        setExtras(response.data);
        const initialSelectedExtras: Record<number, Partial<CarExtra>> = {};
        response.data.forEach((extra) => {
          initialSelectedExtras[extra.id] = { ...extra };
          delete initialSelectedExtras[extra.id]?.id; // Fix the 'delete' operator issue
        });
        setSelectedExtras(initialSelectedExtras);
      })
      .catch((error) => {
        console.error("Error fetching car extras:", error);
      });
  };

  const handleCheckboxChange = (
    carId: number,
    key: ExtraKey,
    checked: boolean
  ) => {
    setSelectedExtras((prevState) => {
      const updatedExtra = { ...prevState[carId] };
      if (key === "id") {
        // If the key is 'id', just return the previous state
        return prevState;
      }
      // Update the boolean value for the extra feature
      updatedExtra[key] = checked;
      return {
        ...prevState,
        [carId]: updatedExtra,
      };
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updateRequests = Object.keys(selectedExtras).map((carId) => {
      const updatedExtra = selectedExtras[parseInt(carId)];
      return axios.put(
        `https://localhost:7193/api/CarExtras/${carId}`,
        updatedExtra
      );
    });

    Promise.all(updateRequests)
      .then(() => {
        // After successful update, fetch the updated data
        fetchCarExtras();
      })
      .catch((error) => {
        console.error("Error updating car extras:", error);
      });
  };

  const handleCreateCarExtra = () => {
    // Make a POST request to add a new car extra
    axios.post("https://localhost:7193/api/CarExtras", {
      // Define the default values for the new car extra
      id: 0,
      panRoof: false,
      panRoofPrice: 0,
      upgradedAlloys: false,
      upgradedAlloysPrice: 0,
      heatedSeats: false,
      heatedSeatsPrice: 0,
      parkAssist: false,
      parkAssistPrice: 0,
      laneAssist: false,
      laneAssistPrice: 0,
      cupHolders: false,
      cupHoldersPrice: 0,
      navigationSystem: false,
      navigationSystemPrice: 0,
      premiumSoundSystem: false,
      premiumSoundSystemPrice: 0,
      wirelessCharging: false,
      wirelessChargingPrice: 0,
      remoteStart: false,
      remoteStartPrice: 0,
      adaptiveCruiseControl: false,
      adaptiveCruiseControlPrice: 0,
      blindSpotMonitoring: false,
      blindSpotMonitoringPrice: 0,
      keylessEntry: false,
      keylessEntryPrice: 0,
      autoDimmingMirrors: false,
      autoDimmingMirrorsPrice: 0,
      powerLiftgate: false,
      powerLiftgatePrice: 0,
      cameraSystem360: false,
      cameraSystem360Price: 0,
      trafficSignRecognition: false,
      trafficSignRecognitionPrice: 0,
      driverAssistancePackage: false,
      driverAssistancePackagePrice: 0,
      memorySeats: false,
      memorySeatsPrice: 0,
      heatedSteeringWheel: false,
      heatedSteeringWheelPrice: 0,
      ventilatedSeats: false,
      ventilatedSeatsPrice: 0
    })
      .then(() => {
        // After successfully adding a new car extra, fetch the updated list
        fetchCarExtras();
      })
      .catch((error) => {
        console.error("Error creating new car extra:", error);
      });
  };

  return (
    <div className="car-extras">
      <div className="header-buttons">
        <Link to="/home"><FaHome className="extra-icon" /></Link>
        <Link to="/"><FaSignOutAlt className="extra-icon" /></Link>
      </div>
      <h2>Select Car Extras</h2>
      <form id="car-extras-form" onSubmit={handleSubmit}>
        <div className="car-list">
          {extras.map((extra) => (
            <div key={extra.id} className="car-item">
              <h3>Car ID: {extra.id}</h3>
              <div className="extra-checkboxes">
                {Object.entries(extra).map(([key, value]) =>
                  key !== "id" && key.endsWith("Price") ? (
                    <div key={key} className="extra-checkbox">
                      <input
                        type="checkbox"
                        id={key}
                        onChange={(e) =>
                          handleCheckboxChange(
                            extra.id,
                            key.replace("Price", "") as ExtraKey, // Remove the "Price" suffix
                            e.target.checked
                          )
                        }
                        checked={!!selectedExtras[extra.id]?.[key.replace("Price", "") as ExtraKey]} // Update key for checked value
                      />
                      <label htmlFor={key}>
                        {key.replace(/([A-Z])/g, " $1").replace("Price", "").toLowerCase()} - Price:{" "}
                        {value}
                      </label>
                    </div>
                  ) : null
                )}
              </div>
              <button type="submit" className="button">Save Extras</button>
            </div>
          ))}
        </div>
      </form>
      <div className="button-container">
        <button onClick={handleCreateCarExtra} className="button">Add New Car Extra</button>
        <Link to="/order"><button className="button">Place Order</button></Link>

      </div>
    </div>
  );
};

export default CarExtras;
