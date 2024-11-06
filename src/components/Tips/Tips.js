import React, { useEffect } from 'react';
import './Tips.css';  // Import the CSS file
import AOS from 'aos';
import 'aos/dist/aos.css';  // Import AOS styles
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRecycle, faLightbulb, faBicycle, faSeedling, faWater, faSolarPanel, faShoppingBag, faLeaf } from '@fortawesome/free-solid-svg-icons';

const Tips = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });  // Initialize AOS with a duration of 1000ms
  }, []);

  const tips = [
    { text: "Reduce, Reuse, Recycle: Practice the 3 Rs to minimize waste and conserve resources.", icon: faRecycle },
    { text: "Conserve Energy: Turn off lights and appliances when not in use, and switch to energy-efficient lighting and appliances.", icon: faLightbulb },
    { text: "Use Sustainable Transportation: Walk, bike, carpool, or use public transportation instead of driving alone.", icon: faBicycle },
    { text: "Eat Sustainably: Choose locally sourced, organic, and plant-based foods to reduce your carbon footprint.", icon: faSeedling },
    { text: "Plant Trees: Trees absorb carbon dioxide and release oxygen, helping to mitigate climate change.", icon: faSeedling },
    { text: "Save Water: Fix leaks, take shorter showers, and use water-efficient fixtures to reduce water consumption.", icon: faWater },
    { text: "Support Renewable Energy: Choose renewable energy sources like solar, wind, or hydroelectric power whenever possible.", icon: faSolarPanel },
    { text: "Avoid Single-Use Plastics: Use reusable bags, bottles, and containers to reduce plastic waste.", icon: faShoppingBag },
    { text: "Compost: Compost organic waste to reduce landfill use and enrich soil.", icon: faLeaf }
    // Add more tips here...
  ];

  return (
    <div className="tips-section">
      <h2 className="tips-title">Tips to Reduce Your Carbon Footprint</h2>
      <div className="tips-list">
        {tips.map((tip, index) => (
          <div key={index} className="tip-card" data-aos="fade-up">
            <FontAwesomeIcon icon={tip.icon} className="tip-icon" />
            <p className="tip-item">{tip.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tips;
