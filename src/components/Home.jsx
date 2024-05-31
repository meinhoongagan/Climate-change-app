import React from 'react';
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
       <WeatherWidget />
      <header className="hero-section">
        <h1>Welcome to Climate Action Platform</h1>
        <p>Take action to reduce your carbon footprint and combat climate change.</p>
        <Link to="/calculator" className="cta-button">Calculate Your Carbon Footprint</Link>
      </header>

      <section className="introduction-section">
        <h2>Understanding Climate Change</h2>
        <p>Climate change is a significant and lasting change in the statistical distribution of weather patterns over periods ranging from decades to millions of years. It's crucial to take steps now to mitigate its impacts.</p>
      </section>

      <section className="tips-section">
        <h2>How to Reduce Your Carbon Footprint</h2>
        <div className="tips">
          <div className="tip">
            <h3>Reduce Energy Consumption</h3>
            <p>Turn off lights when not in use, use energy-efficient appliances, and consider renewable energy sources.</p>
          </div>
          <div className="tip">
            <h3>Minimize Waste</h3>
            <p>Reduce, reuse, and recycle. Avoid single-use plastics and compost organic waste.</p>
          </div>
          <div className="tip">
            <h3>Sustainable Transportation</h3>
            <p>Use public transportation, carpool, bike, or walk whenever possible. Consider electric vehicles.</p>
          </div>
          <div className="tip">
            <h3>Mindful Eating</h3>
            <p>Reduce meat consumption, support local farmers, and choose organic products.</p>
          </div>
        </div>
      </section>

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
                  type:"linear",
                  beginAtZero: true
                }
              }
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
