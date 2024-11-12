// src/components/Detail.js
import React from 'react';

const Detail = ({ data }) => {
  return (
    <div>
      <h2>{data.type}</h2>
      <h3>Step-by-Step Guide</h3>
      <ul style={{ listStyle: 'none' }}>
        {Object.entries(data.stepByStepGuide).map(([step, description]) => (
          <li key={step}>
            <strong>{step}.</strong> {description}
          </li>
        ))}
      </ul>
      <h3>Government Provider</h3>
      <p>{data.governmentProvider}</p>
      <h3>Private Providers</h3>
      <ul style={{ listStyle: 'none' }}>
        {data.privateProviders.map((provider, index) => (
          <li key={index}>{provider}</li>
        ))}
      </ul>
      <h3>Financial Subsidies</h3>
      <p>{data.financialSubsidies}</p>
    </div>
  );
};

export default Detail;