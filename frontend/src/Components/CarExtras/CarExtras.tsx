import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaHome, FaSignOutAlt } from "react-icons/fa";
import "./CarExtras.scss";

interface CarExtra {
  id: number;
  [key: string]: boolean | number;
}

type ExtraKey = keyof CarExtra;

const CarExtras = () => {
  const [extras, setExtras] = useState<CarExtra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<
    Record<number, Partial<CarExtra>>
  >({});

  useEffect(() => {
    fetchCarExtras();
  }, []);

  const fetchCarExtras = () => {
    axios
      .get<CarExtra[]>("https://localhost:7193/api/CarExtras")
      .then(({ data }) => {
        setExtras(data);
        setSelectedExtras(mapSelectedExtras(data));
      });
  };

  const mapSelectedExtras = (
    data: CarExtra[]
  ): Record<number, Partial<CarExtra>> => {
    return data.reduce((acc, extra) => {
      const { id, ...rest } = extra;
      acc[id] = rest;
      return acc;
    }, {} as Record<number, Partial<CarExtra>>);
  };

  const handleCheckboxChange = (
    carId: number,
    key: ExtraKey,
    checked: boolean
  ) => {
    setSelectedExtras((prevState) => ({
      ...prevState,
      [carId]: { ...prevState[carId], [key]: checked },
    }));
  };

  const updateCarExtras = () => {
    const updateRequests = Object.entries(selectedExtras).map(
      ([carId, updatedExtra]) =>
        axios.put(`https://localhost:7193/api/CarExtras/${carId}`, updatedExtra)
    );
    Promise.all(updateRequests).then(fetchCarExtras);
  };

  const createNewCarExtra = () => {
    const defaultCarExtra: CarExtra = Object.keys(extras[0]).reduce(
      (acc, key) => {
        if (key !== "id") {
          acc[key] = key.endsWith("Price") ? 0 : true;
        }
        return acc;
      },
      { id: 0 } as CarExtra
    );

    axios
      .post("https://localhost:7193/api/CarExtras", defaultCarExtra)
      .then(fetchCarExtras);
  };

  return (
    <div className="car-extras">
      <div className="header-buttons">
        <Link to="/home">
          <FaHome className="extra-icon" />
        </Link>
        <Link to="/">
          <FaSignOutAlt className="extra-icon" />
        </Link>
      </div>
      <h2>Select Car Extras</h2>
      <form id="car-extras-form">
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
                            key.replace("Price", "") as ExtraKey,
                            e.target.checked
                          )
                        }
                        checked={
                          !!selectedExtras[extra.id]?.[
                            key.replace("Price", "") as ExtraKey
                          ]
                        }
                      />
                      <label htmlFor={key}>
                        {key
                          .replace(/([A-Z])/g, " $1")
                          .replace("Price", "")
                          .toLowerCase()}{" "}
                        - Price: {value}
                      </label>
                    </div>
                  ) : null
                )}
              </div>
              <button
                type="button"
                onClick={updateCarExtras}
                className="button"
              >
                Save Extras
              </button>
            </div>
          ))}
        </div>
      </form>
      <div className="button-container">
        <button onClick={createNewCarExtra} className="button">
          Add New Car Extra
        </button>
        <Link to="/order">
          <button className="button">Place Order</button>
        </Link>
      </div>
    </div>
  );
};

export default CarExtras;
