import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Calculator.css';

const Calculator = () => {
  const [userId, setUserId] = useState(''); // Placeholder for user ID
  const [transportation, setTransportation] = useState({
    mode: 'car',
    distance: '',
    carpooling: false,
  });
  const [energyUsage, setEnergyUsage] = useState({
    appliances: '',
    lighting: '',
    showerDuration: '',
  });
  const [foodConsumption, setFoodConsumption] = useState({
    meals: 'vegetarian',
    snacksAndDrinks: '',
    foodWaste: 'small',
  });
  const [wasteManagement, setWasteManagement] = useState({
    recyclables: '',
    nonRecyclableWaste: 'small',
  });
  const [waterUsage, setWaterUsage] = useState({
    numberOfShowers: '',
    showerDuration: '',
    laundryDone: 'small',
  });
  const [purchases, setPurchases] = useState({
    newItems: false,
    reusableItemsUsed: false,
  });

  useEffect(() => {
    const loadSavedData = () => {
      const savedData = {
        transportation: JSON.parse(sessionStorage.getItem('transportation')),
        energyUsage: JSON.parse(sessionStorage.getItem('energyUsage')),
        foodConsumption: JSON.parse(sessionStorage.getItem('foodConsumption')),
        wasteManagement: JSON.parse(sessionStorage.getItem('wasteManagement')),
        waterUsage: JSON.parse(sessionStorage.getItem('waterUsage')),
        purchases: JSON.parse(sessionStorage.getItem('purchases')),
      };
      if (savedData.transportation) setTransportation(savedData.transportation);
      if (savedData.energyUsage) setEnergyUsage(savedData.energyUsage);
      if (savedData.foodConsumption) setFoodConsumption(savedData.foodConsumption);
      if (savedData.wasteManagement) setWasteManagement(savedData.wasteManagement);
      if (savedData.waterUsage) setWaterUsage(savedData.waterUsage);
      if (savedData.purchases) setPurchases(savedData.purchases);
    };

    loadSavedData();
  }, []);

  const saveToSession = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dailyFootprintData = {
      userId,
      transportation,
      energyUsage,
      foodConsumption,
      wasteManagement,
      waterUsage,
      purchases,
    };

    try {
      const response = await axios.post('/api/footprint', dailyFootprintData);
      console.log('Data saved:', response.data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  return (
    <div className="carbon-container">
      <h2>Daily Carbon Footprint Calculator</h2>
      <form onSubmit={handleSubmit}>
        
        {/* Transportation Section */}
        <h3>Transportation</h3>
        <div>
          <label>Mode of Transportation:</label>
          <select
            value={transportation.mode}
            onChange={(e) =>
              setTransportation((prev) => {
                const updated = { ...prev, mode: e.target.value };
                saveToSession('transportation', updated);
                return updated;
              })
            }
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="bike">Bike</option>
            <option value="walking">Walking</option>
            <option value="train">Train</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label>Distance (km):</label>
          <input
            type="number"
            value={transportation.distance}
            onChange={(e) =>
              setTransportation((prev) => {
                const updated = { ...prev, distance: e.target.value };
                saveToSession('transportation', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Carpooling:</label>
          <span><input
            type="checkbox"
            checked={transportation.carpooling}
            onChange={(e) =>
              setTransportation((prev) => {
                const updated = { ...prev, carpooling: e.target.checked };
                saveToSession('transportation', updated);
                return updated;
              })
            }
          /></span>
        </div>

        {/* Energy Usage Section */}
        <h3>Energy Usage</h3>
        <div>
          <label>Appliances Usage (hours):</label>
          <input
            type="number"
            value={energyUsage.appliances}
            onChange={(e) =>
              setEnergyUsage((prev) => {
                const updated = { ...prev, appliances: e.target.value };
                saveToSession('energyUsage', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Lighting Usage (hours):</label>
          <input
            type="number"
            value={energyUsage.lighting}
            onChange={(e) =>
              setEnergyUsage((prev) => {
                const updated = { ...prev, lighting: e.target.value };
                saveToSession('energyUsage', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Shower Duration (minutes):</label>
          <input
            type="number"
            value={energyUsage.showerDuration}
            onChange={(e) =>
              setEnergyUsage((prev) => {
                const updated = { ...prev, showerDuration: e.target.value };
                saveToSession('energyUsage', updated);
                return updated;
              })
            }
          />
        </div>

        {/* Food Consumption Section */}
        <h3>Food Consumption</h3>
        <div>
          <label>Meals:</label>
          <select
            value={foodConsumption.meals}
            onChange={(e) =>
              setFoodConsumption((prev) => {
                const updated = { ...prev, meals: e.target.value };
                saveToSession('foodConsumption', updated);
                return updated;
              })
            }
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="meat-based">Meat-based</option>
          </select>
        </div>
        <div>
          <label>Snacks and Drinks:</label>
          <input
            type="text"
            value={foodConsumption.snacksAndDrinks}
            onChange={(e) =>
              setFoodConsumption((prev) => {
                const updated = { ...prev, snacksAndDrinks: e.target.value };
                saveToSession('foodConsumption', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Food Waste:</label>
          <select
            value={foodConsumption.foodWaste}
            onChange={(e) =>
              setFoodConsumption((prev) => {
                const updated = { ...prev, foodWaste: e.target.value };
                saveToSession('foodConsumption', updated);
                return updated;
              })
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Waste Management Section */}
        <h3>Waste Management</h3>
        <div>
          <label>Recyclables (number of items):</label>
          <input
            type="number"
            value={wasteManagement.recyclables}
            onChange={(e) =>
              setWasteManagement((prev) => {
                const updated = { ...prev, recyclables: e.target.value };
                saveToSession('wasteManagement', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Non-Recyclable Waste:</label>
          <select
            value={wasteManagement.nonRecyclableWaste}
            onChange={(e) =>
              setWasteManagement((prev) => {
                const updated = { ...prev, nonRecyclableWaste: e.target.value };
                saveToSession('wasteManagement', updated);
                return updated;
              })
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Water Usage Section */}
        <h3>Water Usage</h3>
        <div>
          <label>Number of Showers:</label>
          <input
            type="number"
            value={waterUsage.numberOfShowers}
            onChange={(e) =>
              setWaterUsage((prev) => {
                const updated = { ...prev, numberOfShowers: e.target.value };
                saveToSession('waterUsage', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Shower Duration (minutes):</label>
          <input
            type="number"
            value={waterUsage.showerDuration}
            onChange={(e) =>
              setWaterUsage((prev) => {
                const updated = { ...prev, showerDuration: e.target.value };
                saveToSession('waterUsage', updated);
                return updated;
              })
            }
          />
        </div>
        <div>
          <label>Laundry Done:</label>
          <select
            value={waterUsage.laundryDone}
            onChange={(e) =>
              setWaterUsage((prev) => {
                const updated = { ...prev, laundryDone: e.target.value };
                saveToSession('waterUsage', updated);
                return updated;
              })
            }
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Purchases Section */}
        <h3>Purchases</h3>
        <div>
          <label>New Items Bought:</label>
          <span>
          <input
            type="checkbox"
            checked={purchases.newItems}
            onChange={(e) =>
              setPurchases((prev) => {
                const updated = { ...prev, newItems: e.target.checked };
                saveToSession('purchases', updated);
                return updated;
              })
            }
          />
          </span>
        </div>
        <div>
          <label>Reusable Items Used:</label>
          <span>
          <input
            type="checkbox"
            checked={purchases.reusableItemsUsed}
            onChange={(e) =>
              setPurchases((prev) => {
                const updated = { ...prev, reusableItemsUsed: e.target.checked };
                saveToSession('purchases', updated);
                return updated;
              })
            }
          />
          </span>
        </div>

        <button type="submit">Calculate Footprint</button>
      </form>
    </div>
  );
};

export default Calculator;
