import React from 'react';
import './Tips.css';  // Import the CSS file

const Tips = () => {
  const tips = [
    "Reduce, Reuse, Recycle: Practice the 3 Rs to minimize waste and conserve resources.",
    "Conserve Energy: Turn off lights and appliances when not in use, and switch to energy-efficient lighting and appliances.",
    "Use Sustainable Transportation: Walk, bike, carpool, or use public transportation instead of driving alone.",
    "Eat Sustainably: Choose locally sourced, organic, and plant-based foods to reduce your carbon footprint.",
    "Plant Trees: Trees absorb carbon dioxide and release oxygen, helping to mitigate climate change.",
  ];

  return (
    <div className="tips-section">
      <h2 className="tips-title">Tips to Reduce Your Carbon Footprint</h2>
      <ul className="tips-list">
        {tips.map((tip, index) => (
          <li key={index} className="tip-item">{tip}</li>
        ))}
      </ul>
      <section className="detailed-tips-section">
        <h2 className="detailed-tips-title">How to Reduce Your Carbon Footprint</h2>
        <div className="detailed-tips">
          <div className="detailed-tip">
            <h3>Reduce Energy Consumption</h3>
            <p>Turn off lights when not in use, use energy-efficient appliances, and consider renewable energy sources.</p>
          </div>
          <div className="detailed-tip">
            <h3>Minimize Waste</h3>
            <p>Reduce, reuse, and recycle. Avoid single-use plastics and compost organic waste.</p>
          </div>
          <div className="detailed-tip">
            <h3>Sustainable Transportation</h3>
            <p>Use public transportation, carpool, bike, or walk whenever possible. Consider electric vehicles.</p>
          </div>
          <div className="detailed-tip">
            <h3>Mindful Eating</h3>
            <p>Reduce meat consumption, support local farmers, and choose organic products.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tips;
