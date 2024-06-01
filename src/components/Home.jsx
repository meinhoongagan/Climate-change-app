import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import './Home.css';
import WeatherWidget from './WeatherWidget';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Home = () => {
  const data = `Causes of Climate Change
Greenhouse Gas Emissions:

Fossil Fuels: Burning coal, oil, and natural gas for energy and transportation releases significant amounts of CO₂.
Deforestation: Trees absorb CO₂, so cutting them down reduces the planet's ability to absorb greenhouse gases.
Agriculture: Farming practices, livestock, and rice paddies emit methane, while fertilizers release nitrous oxide.
Industrial Processes: Factories and industrial activities emit a variety of pollutants and greenhouse gases.

Impacts of Climate Change
Rising Temperatures: Average global temperatures have increased, leading to more frequent and intense heatwaves.

Melting Ice and Rising Sea Levels: Polar ice caps and glaciers are melting, causing sea levels to rise, which threatens coastal regions.

Extreme Weather: Increased frequency and severity of extreme weather events, such as hurricanes, droughts, floods, and wildfires.

Ecosystem Disruption: Many species are struggling to adapt to rapid changes, leading to shifts in habitats and biodiversity loss.

Human Health: Increased heat and pollution can exacerbate respiratory and cardiovascular diseases, while changing weather patterns affect food and water supply.
`;

  const [parsedData, setParsedData] = useState([]);

  useEffect(() => {
    const parsed = data.split('\n\n').map(section => {
      const lines = section.split('\n');
      return {
        heading: lines[0],
        description: lines.slice(1).join(' ')
      };
    });
    setParsedData(parsed);
  }, [data]);

  const chartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Average Carbon Footprint (tons)',
        data: [2, 1.8, 1.6, 1.5, 1.4, 1.2, 1],
        backgroundColor: 'rgba(75,192,192,0.2)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Welcome to Climate Action Platform</h1>
        <p>Take action to reduce your carbon footprint and combat climate change.</p>
        <Link to="/calculator" className="cta-button">Calculate Your Carbon Footprint</Link>
      </header>
      <section className="introduction-section">
        <h2>Understanding Climate Change</h2>
        {parsedData.map((section, index) => (
          <div key={index}>
            <h3 className='Intro-head'>{section.heading}</h3>
            <p>{section.description}</p>
          </div>
        ))}
      </section>
      <WeatherWidget />
      
     
      <section className="calculator-intro-section">
        <h2>Carbon Footprint Calculator</h2>
        <p>Use our calculator to estimate your carbon footprint and find ways to reduce it.</p>
        <Link to="/calculator" className="cta-button">Go to Calculator</Link>
      </section>
      <section className="charts-section">
        <h2>Your Impact</h2>
        <div className="chart-container">
          <Line 
            data={chartData}
            options={{
              scales: {
                y: {
                  type: "linear",
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </section>
      <section className="events-section">
        <h2>Upcoming Climate Events and Policies</h2>
        <ul>
          <li>
            <strong>Global Climate Strike</strong> - June 5, 2024
          </li>
          <li>
            <strong>New Renewable Energy Policy</strong> - Effective from July 1, 2024
          </li>
        </ul>
      </section>
      <section className="renewable-energy-section">
        <h2>Renewable Energy Resources</h2>
        <p>Switching to renewable energy sources like solar, wind, and hydro can significantly reduce your carbon footprint.</p>
        <Link to="/resources" className="cta-button">Learn More</Link>
      </section>
      <section className="resources-section">
        <h2>Additional Resources</h2>
        <ul>
          <li><a href="https://www.carbonfootprint.com/" target="_blank" rel="noopener noreferrer">Carbon Footprint Calculator</a></li>
          <li><a href="https://www.epa.gov/environmental-topics/greener-living" target="_blank" rel="noopener noreferrer">EPA Greener Living Tips</a></li>
          <li><a href="https://www.wwf.org.uk/thingsyoucando" target="_blank" rel="noopener noreferrer">WWF - Things You Can Do</a></li>
        </ul>
      </section>
    </div>
  );
};

export default Home;
