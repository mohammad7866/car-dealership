import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CarExtras.scss";

interface Extra {
  id: number;
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

type ExtraKey = keyof Extra;

const CarExtras = () => {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<
    Record<number, Partial<Extra>>
  >({});

  useEffect(() => {
    axios
      .get<Extra[]>("https://localhost:7193/api/CarExtras")
      .then((response) => {
        console.log("Fetched car extras:", response.data);
        setExtras(response.data);
        const initialSelectedExtras: Record<number, Partial<Extra>> = {};
        response.data.forEach((extra) => {
          initialSelectedExtras[extra.id] = { ...extra };
          delete initialSelectedExtras[extra.id].id;
        });
        setSelectedExtras(initialSelectedExtras);
      })
      .catch((error) => {
        console.error("Error fetching car extras:", error);
      });
  }, []); // Empty dependency array to fetch data only once when the component mounts

  const handleCheckboxChange = (
    carId: number,
    key: ExtraKey,
    checked: boolean
  ) => {
    setSelectedExtras((prevState) => ({
      ...prevState,
      [carId]: {
        ...prevState[carId],
        [key]: checked,
      },
    }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Array to hold all the PUT requests
    const updateRequests = Object.keys(selectedExtras).map((carId) => {
      const updatedExtra = selectedExtras[parseInt(carId)];
      // Return the axios.put promise for each request
      return axios.put(`https://localhost:7193/api/CarExtras/${carId}`, updatedExtra);
    });

    // Execute all the PUT requests concurrently
    Promise.all(updateRequests)
      .then((responses) => {
        responses.forEach((response, index) => {
          const carId = Object.keys(selectedExtras)[index];
          console.log(`Car extras updated for car ID ${carId}`, response.data);
        });
      })
      .catch((error) => {
        console.error('Error updating car extras:', error);
      });
  };

  return (
    <div className="car-extras">
      <h2>Select Car Extras</h2>
      <form id="car-extras-form" onSubmit={handleSubmit}>
        {extras.map((extra) => (
          <div key={extra.id}>
            <h3>Car ID: {extra.id}</h3>
            {Object.keys(extra).map(
              (key) =>
                key !== "id" && ( // Exclude the 'id' property
                  <div key={key} className="extra-checkbox">
                    <input
                      type="checkbox"
                      id={key}
                      onChange={(e) =>
                        handleCheckboxChange(
                          extra.id,
                          key as ExtraKey,
                          e.target.checked
                        )
                      }
                      checked={
                        typeof selectedExtras[extra.id]?.[key as ExtraKey] ===
                        "boolean"
                          ? (selectedExtras[extra.id]?.[
                              key as ExtraKey
                            ] as boolean) // Explicitly cast to boolean
                          : false // Default value if not boolean
                      }
                    />

                    <label htmlFor={key}>
                      {key.replace(/([A-Z])/g, " $1").toLowerCase()}
                    </label>
                  </div>
                )
            )}
          </div>
        ))}

        <button type="submit">Save Extras</button>
      </form>
    </div>
  );
};

export default CarExtras;
