import React, { useState, useEffect } from "react";
import axios from "axios";

interface Extra {
  id: number;
  name: string;
}

const CarExtras = () => {
  const [extras, setExtras] = useState<Extra[]>([]);
  const [selectedExtras, setSelectedExtras] = useState<string[]>([]);

  useEffect(() => {
    // Fetch extras from the backend API
    axios
      .get<Extra[]>("https://localhost:7193/api/CarExtras")
      .then((response) => {
        setExtras(response.data); // Assuming response.data is an array of extras
      })
      .catch((error) => {
        console.error("Error fetching extras:", error);
      });
  }, []);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = event.target;
    if (checked) {
      setSelectedExtras((prevExtras) => [...prevExtras, id]);
    } else {
      setSelectedExtras((prevExtras) =>
        prevExtras.filter((extraId) => extraId !== id)
      );
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Create a new entity with selected extras
    axios
      .post("https://localhost:7193/api/Car", { extras: selectedExtras })
      .then((response) => {
        console.log("New entity created:", response.data);
        // Clear selected extras
        setSelectedExtras([]);
      })
      .catch((error) => {
        console.error("Error creating entity:", error);
      });
  };

  return (
    <div className="car-extras">
      <h2>Select Car Extras</h2>
      <form id="car-extras-form" onSubmit={handleSubmit}>
        {extras &&
          extras.map((extra) => (
            <div key={extra.id} className="extra-checkbox">
              <input
                type="checkbox"
                id={extra.id.toString()}
                name={extra.name}
                onChange={handleCheckboxChange}
                checked={selectedExtras.includes(extra.id.toString())}
              />
              <label htmlFor={extra.id.toString()}>{extra.name}</label>
            </div>
          ))}

        <button type="submit">Save Extras</button>
      </form>
    </div>
  );
};

export default CarExtras;
