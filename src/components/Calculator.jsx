import React, { useState } from 'react';
// import './CarbonFootPrintCalculator.css'
const Calculator = () => {
  const [electricity, setElectricity] = useState('');
  const [gas, setGas] = useState('');
  const [miles, setMiles] = useState('');
  const [carbonFootprint, setCarbonFootprint] = useState(null);

  const calculateFootprint = () => {
    const electricityFootprint = electricity * 0.233; // CO2 per kWh
    const gasFootprint = gas * 2.68; // CO2 per gallon
    const milesFootprint = miles * 0.404; // CO2 per mile

    const totalFootprint = electricityFootprint + gasFootprint + milesFootprint;
    setCarbonFootprint(totalFootprint.toFixed(2)); // Round to 2 decimal places
  };

  return (
    <div className='carbon-container'>
      <h2>Carbon Footprint Calculator</h2>
      <form onSubmit={(e) => { e.preventDefault(); calculateFootprint(); }}>
        <div>
          <label>Electricity Usage (kWh):</label>
          <input
            type="number"
            value={electricity}
            onChange={(e) => setElectricity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Gas Usage (gallons):</label>
          <input
            type="number"
            value={gas}
            onChange={(e) => setGas(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Miles Driven:</label>
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
          <h3>Your Estimated Carbon Footprint: {carbonFootprint} tons CO2/year</h3>
        </div>
      )}
    </div>
  );
};

export default Calculator;