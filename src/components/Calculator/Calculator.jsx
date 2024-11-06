import React, { useState } from 'react';
import './Calculator.css';

const Calculator = () => {
  const [electricity, setElectricity] = useState('');
  const [gas, setGas] = useState('');
  const [miles, setMiles] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(null);
  const [dietPlan, setDietPlan] = useState('');

  const calculateFootprint = () => {
    const electricityFootprint = (electricity * 0.233)/30; // CO2 per kWh
    const gasFootprint = (gas * 2.68)/30; // CO2 per gallon
    const milesFootprint = (miles * 0.404)/30; // CO2 per mile

    const totalFootprint = electricityFootprint + gasFootprint + milesFootprint;
    setCarbonFootprint(totalFootprint.toFixed(2)); // Round to 2 decimal places

    if (totalFootprint <= 0.17) {
      setDietPlan('Your carbon footprint is low! You can continue with your current diet.');
    } else if (totalFootprint <= 0.33) {
      setDietPlan('Consider reducing meat consumption and incorporating more plant-based foods into your diet.');
    } else {
      setDietPlan('Your carbon footprint is high. Switching to a primarily plant-based diet can significantly reduce your emissions.');
    }
  };

  return (
    <div className='carbon-container'>
      <h2>Carbon Footprint Calculator (daily)</h2>
      <h4>You will get a Diet suggetion after calculation</h4>
      <form onSubmit={(e) => { e.preventDefault(); calculateFootprint(); }}>
        <div>
          <label>Electricity Usage (kWh/day):</label>
          <input
            type="number"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gas Usage (gallons/day):</label>
          <input
            type="number"
            value={gas}
            onChange={(e) => setGas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Miles Driven (miles/day):</label>
          <input
            type="number"
            value={miles}
            onChange={(e) => setMiles(e.target.value)}
            required
          />
        </div>
        <button type="submit">Calculate</button>
      </form>
      {carbonFootprint !== null && (
        <div>
          <h3>Your Estimated Carbon Footprint: {carbonFootprint} tons CO2/day</h3>
          <p>{dietPlan}</p>
        </div>
      )}
    </div>
  );
};

export default Calculator;
