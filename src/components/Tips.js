import React from 'react';

const Tips= () => {
  const tips = [
    "Reduce, Reuse, Recycle: Practice the 3 Rs to minimize waste and conserve resources.",
    "Conserve Energy: Turn off lights and appliances when not in use, and switch to energy-efficient lighting and appliances.",
    "Use Sustainable Transportation: Walk, bike, carpool, or use public transportation instead of driving alone.",
    "Eat Sustainably: Choose locally sourced, organic, and plant-based foods to reduce your carbon footprint.",
    "Plant Trees: Trees absorb carbon dioxide and release oxygen, helping to mitigate climate change.",
  ];

  return (
    <div className="tips-section">
      <h2>Tips to Reduce Your Carbon Footprint</h2>
      <ul>
        {tips.map((tip, index) => (
          <li key={index}>{tip}</li>
        ))}
      </ul>
    </div>
  );
};

export default Tips;
