import React, { useState ,useEffect } from 'react';
import axios from 'axios';
import Popup from './Popup'; // Import the popup component
import './Calculator.css';  // Make sure to create the CSS file



const Calculator = () => {
  const [formData, setFormData] = useState({
    userId: '',
    transportation: {
      mode: 'car',
      distance: 0,
      carpooling: false,
    },
    energyUsage: {
      appliances: 0,
      lighting: 0,
      showerDuration: 0,
    },
    foodConsumption: {
      meals: 'vegetarian',
      snacksAndDrinks: '',
      foodWaste: 'small',
    },
    wasteManagement: {
      recyclables: 0,
      nonRecyclableWaste: 'small',
    },
    waterUsage: {
      numberOfShowers: 0,
      showerDuration: 0,
      laundryDone: 'small',
    },
    purchases: {
      newItems: false,
      reusableItemsUsed: false,
    },
  });
  // const [loading, setLoading] = useState(false);
  const [userId,setUserId] = useState("")
  const [showPopup, setShowPopup] = useState(false);
  const [responseData, setResponseData] = useState(null);
  useEffect(() => {
    const userIdFromStorage = sessionStorage.getItem('userId');
    setUserId(userIdFromStorage)
    // console.log(userIdFromStorage);
    if (userIdFromStorage) {
      setFormData((prevData) => ({
        ...prevData,
        userId: userIdFromStorage,
      }));
    }
  }, []);

  const handleChange = (section, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [section]: {
        ...prevData[section],
        [field]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/footprint/', formData);
      setResponseData(response.data);
      setShowPopup(true);  // Show the popup with response data
    } catch (error) {
      console.error('Error saving daily footprint:', error.message);
      alert('Error saving daily footprint');
    }
  };
  const fetchReportData = async () => {
    try {
      // setLoading(true)
      const response = await axios.get(`http://localhost:8000/api/carbon-report/${userId}`);
      setResponseData(response.data);
      // setLoading(true)
      setShowPopup(true); // Show popup with report data
    } catch (error) {
      console.error('Error fetching report data:', error.message);
      alert('Could not fetch report data');
    }
  };
  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="form">
        {/* Transportation */}
      <h1 className="form-title">Carbon Footprint Calculator</h1>
        <div className="form-section">
          <h3 className="form-subtitle">Transportation</h3>
          <label htmlFor="mode" className="form-label">Mode</label>
          <select
            id="mode"
            value={formData.transportation.mode}
            onChange={(e) => handleChange('transportation', 'mode', e.target.value)}
            className="form-select"
          >
            <option value="car">Car</option>
            <option value="bus">Bus</option>
            <option value="bike">Bike</option>
            <option value="walking">Walking</option>
            <option value="train">Train</option>
            <option value="other">Other</option>
          </select>

          <label htmlFor="distance" className="form-label">Distance (km)</label>
          <input
            id="distance"
            type="number"
            value={formData.transportation.distance}
            onChange={(e) => handleChange('transportation', 'distance', parseInt(e.target.value))}
            required
            className="form-input"
          />

          <div className="form-checkbox">
            <label htmlFor="carpooling" className="form-label">Pooling(Sharing vehicles)</label>
            <input
              id="carpooling"
              type="checkbox"
              checked={formData.transportation.carpooling}
              onChange={(e) => handleChange('transportation', 'carpooling', e.target.checked)}
              className="form-checkbox-input"
            />
          </div>
        </div>

        {/* Energy Usage */}
        <div className="form-section">
          <h3 className="form-subtitle">Energy Usage</h3>
          <label htmlFor="appliances" className="form-label">Appliances Usage (hours)</label>
          <p className='form-subtitle-description'>Enter the number of hours spent on appliances</p>
          <input
            id="appliances"
            type="number"
            value={formData.energyUsage.appliances}
            onChange={(e) => handleChange('energyUsage', 'appliances', parseInt(e.target.value))}
            className="form-input"
          />

          <label htmlFor="lighting" className="form-label">Lighting (hours)</label>
          <input
            id="lighting"
            type="number"
            value={formData.energyUsage.lighting}
            onChange={(e) => handleChange('energyUsage', 'lighting', parseInt(e.target.value))}
            className="form-input"
          />

          <label htmlFor="showerDuration" className="form-label">Shower Duration (minutes)</label>
          <input
            id="showerDuration"
            type="number"
            value={formData.energyUsage.showerDuration}
            onChange={(e) => handleChange('energyUsage', 'showerDuration', parseInt(e.target.value))}
            className="form-input"
          />
        </div>

        {/* Food Consumption */}
        <div className="form-section">
          <h3 className="form-subtitle">Food Consumption</h3>
          <label htmlFor="meals" className="form-label">Meals (type of meals)</label>
          <select
            id="meals"
            value={formData.foodConsumption.meals}
            onChange={(e) => handleChange('foodConsumption', 'meals', e.target.value)}
            className="form-select"
          >
            <option value="vegetarian">Vegetarian</option>
            <option value="vegan">Vegan</option>
            <option value="meat-based">Meat-based</option>
          </select>

          <label htmlFor="snacksAndDrinks" className="form-label">Snacks and Drinks</label>
          <select
            id="snacksAndDrinks"
            type="text"
            value={formData.foodConsumption.snacksAndDrinks}
            onChange={(e) => handleChange('foodConsumption', 'snacksAndDrinks', e.target.value)}
            className="form-input"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>

          <label htmlFor="foodWaste" className="form-label">Food Waste</label>
          <select
            id="foodWaste"
            value={formData.foodConsumption.foodWaste}
            onChange={(e) => handleChange('foodConsumption', 'foodWaste', e.target.value)}
            className="form-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Waste Management */}
        <div className="form-section">
          <h3 className="form-subtitle">Waste Management</h3>
          <label htmlFor="recyclables" className="form-label">Recyclables (items)</label>
          <input
            id="recyclables"
            type="number"
            value={formData.wasteManagement.recyclables}
            onChange={(e) => handleChange('wasteManagement', 'recyclables', parseInt(e.target.value))}
            className="form-input"
          />

          <label htmlFor="nonRecyclableWaste" className="form-label">Non-Recyclable Waste</label>
          <select
            id="nonRecyclableWaste"
            value={formData.wasteManagement.nonRecyclableWaste}
            onChange={(e) => handleChange('wasteManagement', 'nonRecyclableWaste', e.target.value)}
            className="form-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Water Usage */}
        <div className="form-section">
          <h3 className="form-subtitle">Water Usage</h3>
          <label htmlFor="numberOfShowers" className="form-label">Number of Showers taken</label>
          <input
            id="numberOfShowers"
            type="number"
            value={formData.waterUsage.numberOfShowers}
            onChange={(e) => handleChange('waterUsage', 'numberOfShowers', parseInt(e.target.value))}
            className="form-input"
          />

          <label htmlFor="showerDuration" className="form-label">Average Shower Duration (minutes)</label>
          <input
            id="showerDuration"
            type="number"
            value={formData.waterUsage.showerDuration}
            onChange={(e) => handleChange('waterUsage', 'showerDuration', parseInt(e.target.value))}
            className="form-input"
          />

          <label htmlFor="laundryDone" className="form-label">Laundry Size</label>
          <select
            id="laundryDone"
            value={formData.waterUsage.laundryDone}
            onChange={(e) => handleChange('waterUsage', 'laundryDone', e.target.value)}
            className="form-select"
          >
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>

        {/* Purchases */}
        <div className="form-section">
          <h3 className="form-subtitle">Purchases</h3>
          <label htmlFor="newItems" className="form-label">New Items Purchased</label>
          <input
            id="newItems"
            type="checkbox"
            checked={formData.purchases.newItems}
            onChange={(e) => handleChange('purchases', 'newItems', e.target.checked)}
            className="form-checkbox-input"
          />

          <label htmlFor="reusableItemsUsed" className="form-label">Reuse the items</label>
          <input
            id="reusableItemsUsed"
            type="checkbox"
            checked={formData.purchases.reusableItemsUsed}
            onChange={(e) => handleChange('purchases', 'reusableItemsUsed', e.target.checked)}
            className="form-checkbox-input"
          />
        </div>

        <button type="submit" className="submit-button-calculator" onClick={fetchReportData}>Save and Get Report</button>
      </form>
      {showPopup && (
        <Popup data={responseData.report} onClose={closePopup} />
      )}
    </div>
  );
};

export default Calculator;