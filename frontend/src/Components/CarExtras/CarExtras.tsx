import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CarExtras.scss";

interface CarExtra {
  id: number;
  adaptiveCruiseControl: boolean;
  adaptiveCruiseControlPrice: number;
  autoDimmingMirrors: boolean;
  autoDimmingMirrorsPrice: number;
  blindSpotMonitoring: boolean;
  blindSpotMonitoringPrice: number;
  cameraSystem360: boolean;
  cameraSystem360Price: number;
  cupHolders: boolean;
  cupHoldersPrice: number;
  driverAssistancePackage: boolean;
  driverAssistancePackagePrice: number;
  heatedSeats: boolean;
  heatedSeatsPrice: number;
  heatedSteeringWheel: boolean;
  heatedSteeringWheelPrice: number;
  keylessEntry: boolean;
  keylessEntryPrice: number;
  laneAssist: boolean;
  laneAssistPrice: number;
  memorySeats: boolean;
  memorySeatsPrice: number;
  navigationSystem: boolean;
  navigationSystemPrice: number;
  panRoof: boolean;
  panRoofPrice: number;
  parkAssist: boolean;
  parkAssistPrice: number;
  powerLiftgate: boolean;
  powerLiftgatePrice: number;
  premiumSoundSystem: boolean;
  premiumSoundSystemPrice: number;
  remoteStart: boolean;
  remoteStartPrice: number;
  trafficSignRecognition: boolean;
  trafficSignRecognitionPrice: number;
  upgradedAlloys: boolean;
  upgradedAlloysPrice: number;
  ventilatedSeats: boolean;
  ventilatedSeatsPrice: number;
  wirelessCharging: boolean;
  wirelessChargingPrice: number;
}

type ExtraKey = keyof CarExtra;

const CarExtras = () => {
  const [extras, setExtras] = useState<CarExtra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<
    Record<number, Partial<CarExtra>>
  >({});

  useEffect(() => {
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
  }, []);

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

    const updateRequests = Object.keys(selectedExtras).map((carId) => {
      const updatedExtra = selectedExtras[parseInt(carId)];
      return axios.put(
        `https://localhost:7193/api/CarExtras/${carId}`,
        updatedExtra
      );
    });

    Promise.all(updateRequests)
      .then((responses) => {
        responses.forEach((response, index) => {
          const carId = Object.keys(selectedExtras)[index];
          console.log(`Car extras updated for car ID ${carId}`, response.data);
        });
      })
      .catch((error) => {
        console.error("Error updating car extras:", error);
      });
  };

  return (
    <div className="car-extras">
      <h2>Select Car Extras</h2>
      <form id="car-extras-form" onSubmit={handleSubmit}>
        {extras.map((extra) => (
          <div key={extra.id}>
            <h3>Car ID: {extra.id}</h3>
            {Object.entries(extra).map(([key, value]) =>
              key !== "id" && key.endsWith("Price") ? (
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
                    checked={!!selectedExtras[extra.id]?.[key as ExtraKey]}
                  />
                  <label htmlFor={key}>
                    {key.replace(/([A-Z])/g, " $1").toLowerCase()} - Price:{" "}
                    {value}
                  </label>
                </div>
              ) : null
            )}
          </div>
        ))}

        <button type="submit">Save Extras</button>
      </form>
    </div>
  );
};

export default CarExtras;
