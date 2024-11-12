import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import Impact from '../Impact/Impact';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import './MountainPage.css';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const MountainPage = () => {
  const temp = useSelector((state) => state.simulator.temperature);
  const aqi = useSelector((state) => state.simulator.aqi);
  const wind = useSelector((state) => state.simulator.wind_speed);
  const uv = useSelector((state) => state.simulator.uv_radiation);
  const hum = useSelector((state) => state.simulator.humidity);

  // Temperature Chart Configuration
  const data = {
    labels: ['Current Temp'],
    datasets: [{
      label: 'Temperature',
      data: [temp],
      backgroundColor: '#3440eb',
    }],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 5,
        },
        suggestedMin: -10,
        suggestedMax: 30,
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const plugin = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(-5), right - left, y.getPixelForValue(15) - y.getPixelForValue(-5));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(15), right - left, y.getPixelForValue(25) - y.getPixelForValue(15));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(25), right - left, y.getPixelForValue(30) - y.getPixelForValue(25));
    },
  };

  // AQI Chart Configuration
  const data2 = {
    labels: ['Current AQI'],
    datasets: [{
      label: 'AQI',
      data: [aqi],
      backgroundColor: '#008080',
    }],
  };

  const options2 = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 50,
        },
        suggestedMin: 0,
        suggestedMax: 300,
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const plugin2 = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(50) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(50), right - left, y.getPixelForValue(100) - y.getPixelForValue(50));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(100), right - left, y.getPixelForValue(300) - y.getPixelForValue(100));
    },
  };

  // Wind Speed Chart Configuration
  const data3 = {
    labels: ['Current Wind Speed'],
    datasets: [{
      label: 'Wind Speed',
      data: [wind],
      backgroundColor: '#800080',
    }],
  };

  const options3 = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const plugin3 = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(5), right - left, y.getPixelForValue(20) - y.getPixelForValue(5));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(20), right - left, y.getPixelForValue(50) - y.getPixelForValue(20));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(50), right - left, y.getPixelForValue(100) - y.getPixelForValue(50));
    },
  };

  // UV Radiation Chart Configuration
  const data4 = {
    labels: ['Current UV Radiation'],
    datasets: [{
      label: 'UV radiations',
      data: [uv],
      backgroundColor: '#800000',
    }],
  };

  const options4 = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 1,
        },
        suggestedMin: 0,
        suggestedMax: 10,
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const plugin4 = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(3) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(3), right - left, y.getPixelForValue(6) - y.getPixelForValue(3));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(6), right - left, y.getPixelForValue(10) - y.getPixelForValue(6));
    },
  };

  // Humidity Chart Configuration
  const data5 = {
    labels: ['Current Humidity'],
    datasets: [{
      label: 'Humidity',
      data: [hum],
      backgroundColor: '#008000',
    }],
  };

  const options5 = {
    responsive: true,
    scales: {
      y: {
        ticks: {
          stepSize: 10,
        },
        suggestedMin: 0,
        suggestedMax: 100,
      },
      x: {
        ticks: {
          font: {
            size: 16,
          },
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  const plugin5 = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(50), right - left, y.getPixelForValue(70) - y.getPixelForValue(50));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(30), right - left, y.getPixelForValue(50) - y.getPixelForValue(30));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(70), right - left, y.getPixelForValue(90) - y.getPixelForValue(70));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(30) - y.getPixelForValue(0));
    },
  };

  return (
    <div className="mountain-page-container">
      <Bar data={data} options={options} className="chart-container" plugins={[plugin]}/>
      <Impact 
        para={temp} 
        min='-5' 
        mid='15' 
        max='25' 
        minImpact='Supports seasonal plant growth and animal adaptation; varies by altitude.' 
        midImpact='Warmer conditions may cause snowmelt and stress some wildlife adapted to colder temperatures.' 
        maxImpact='Accelerated melting of glaciers and snow; can lead to water scarcity, plant desiccation, and heat stress in lower-altitude fauna.'
      />

      <Bar data={data2} options={options2} className="chart-container" plugins={[plugin2]}/>
      <Impact 
        para={aqi} 
        min='0' 
        mid='50' 
        max='100' 
        minImpact='High-altitude air is typically clean, supporting healthy flora and fauna.' 
        midImpact='Possible impacts from urban pollution or wildfire smoke; may cause mild stress to sensitive species.' 
        maxImpact='Rare but can occur due to transported pollutants; impacts breathing and overall health of both animals and humans.'
      />

      <Bar data={data3} options={options3} className="chart-container" plugins={[plugin3]}/>
      <Impact 
        para={wind} 
        min='5' 
        mid='20' 
        max='50' 
        minImpact='Helps with seed dispersal and air circulation; common on mountain slopes.' 
        midImpact='Stronger winds may disrupt animal habitats and make movement difficult for wildlife.' 
        maxImpact='Severe weather risk, potential for habitat damage, and difficult navigation for wildlife and humans.'
      />

      <Bar data={data4} options={options4} className="chart-container" plugins={[plugin4]}/>
      <Impact 
        para={uv} 
        min='0' 
        mid='3' 
        max='6' 
        minImpact='Low risk; common during early mornings or winter.' 
        midImpact='Increased UV exposure at higher altitudes; may cause stress to plants and animals.' 
        maxImpact='Significant UV exposure; risk of damage to plant tissues and health issues for animals due to reflection from snow.'
      />

      <Bar data={data5} options={options5} className="chart-container" plugins={[plugin5]}/>
      <Impact 
        para={hum} 
        min='50' 
        mid='30' 
        mid2='70' 
        max='0' 
        max2='85' 
        minImpact='Ideal for mountain flora and fauna; supports balanced ecosystem functions.' 
        midImpact='Can lead to drier conditions that affect vegetation or excessive moisture that promotes rapid snowmelt and heavy rainfall.' 
        maxImpact='Dry conditions increase the risk of wildfires; high moisture can cause fog, heavy precipitation, or snow, affecting visibility and movement.'
      />
    </div>
  );
};

export default MountainPage;