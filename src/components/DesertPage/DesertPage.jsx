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
import '../DesertPage/DesertPage.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DesertPage = () => {
  const temp = useSelector((state) => state.simulator.temperature);
  const aqi = useSelector((state) => state.simulator.aqi);
  const wind = useSelector((state) => state.simulator.wind_speed);
  const uv = useSelector((state) => state.simulator.uv_radiation);
  const hum = useSelector((state) => state.simulator.humidity);

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
        ticks: { stepSize: 5 },
        suggestedMin: 0,
        suggestedMax: 60,
      },
      x: {
        ticks: {
          font: { size: 16 },
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
      ctx.fillRect(left, y.getPixelForValue(10), right - left, y.getPixelForValue(35) - y.getPixelForValue(10));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(35), right - left, y.getPixelForValue(45) - y.getPixelForValue(35));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(45), right - left, y.getPixelForValue(60) - y.getPixelForValue(45));
    },
  };

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
        ticks: { stepSize: 50 },
        suggestedMin: 0,
        suggestedMax: 300,
      },
      x: {
        ticks: {
          font: { size: 16 },
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
        ticks: { stepSize: 5 },
        suggestedMin: 0,
        suggestedMax: 50,
      },
      x: {
        ticks: {
          font: { size: 16 },
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
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(20) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(20), right - left, y.getPixelForValue(40) - y.getPixelForValue(20));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(40), right - left, y.getPixelForValue(50) - y.getPixelForValue(40));
    },
  };

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
        ticks: { stepSize: 2 },
        suggestedMin: 0,
        suggestedMax: 14,
      },
      x: {
        ticks: {
          font: { size: 16 },
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
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(7) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(7), right - left, y.getPixelForValue(10) - y.getPixelForValue(7));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(10), right - left, y.getPixelForValue(12) - y.getPixelForValue(10));
    },
  };

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
        ticks: { stepSize: 10 },
        suggestedMin: 0,
        suggestedMax: 80,
      },
      x: {
        ticks: {
          font: { size: 16 },
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
      ctx.fillRect(left, y.getPixelForValue(10), right - left, y.getPixelForValue(30) - y.getPixelForValue(10));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(5), right - left, y.getPixelForValue(9) - y.getPixelForValue(5));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(30), right - left, y.getPixelForValue(50) - y.getPixelForValue(30));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(5) - y.getPixelForValue(0));
    },
  };

  return (
    <div className="desert-page-container">
      <Bar data={data} options={options} className="chart" plugins={[plugin]}/>
      <Impact 
        para={temp} 
        min={20} 
        mid={35} 
        max={45}
        minImpact='Typical during cooler months or early mornings/evenings; supports activity for desert-adapted plants and animals.' 
        midImpact='Common during the day; begins to stress vegetation and wildlife due to increased heat.' 
        maxImpact='Extreme heat; significant risks of rapid dehydration, reduced animal activity, and plant stress.'
      />
      
      <Bar data={data2} options={options2} className="chart" plugins={[plugin2]}/>
      <Impact 
        para={aqi} 
        min={0} 
        mid={50}
        max={100} 
        minImpact='Clean air with minimal pollution; natural dust levels may vary but generally safe.' 
        midImpact='Dust storms or local human activities can influence AQI; mild impacts on respiratory health for animals and humans.' 
        maxImpact='Unhealthy due to severe dust storms, pollution from nearby urban or industrial areas; harmful to health and visibility.'
      />
      
      <Bar data={data3} options={options3} className="chart" plugins={[plugin3]}/>
      <Impact 
        para={wind} 
        min={0} 
        mid={20} 
        max={40} 
        minImpact='Light to moderate breezes; helps regulate temperature and move sand without significant impact.' 
        midImpact='Stronger winds; can cause sand movement that may affect plants and wildlife.' 
        maxImpact='Severe winds; potential for full sandstorms that reduce visibility and disrupt habitats.'
      />
      
      <Bar data={data4} options={options4} className="chart" plugins={[plugin4]}/>
      <Impact 
        para={uv} 
        min={0} 
        mid={7} 
        max={10} 
        minImpact='Moderate to high during cooler months; sun protection is advisable for prolonged exposure.' 
        midImpact='Very high; typical during peak daylight hours, leading to risk of sunburn and heat-related issues.' 
        maxImpact='Extreme UV exposure, especially in summer; significant risk of skin and eye damage, even during short exposures.'
      />
      
      <Bar data={data5} options={options5} className="chart" plugins={[plugin5]}/>
      <Impact 
        para={hum} 
        min={10} 
        mid={5} 
        mid2={30} 
        max={0} 
        max2={50} 
        minImpact='Typical dry conditions; supports desert life adapted to arid environments.' 
        midImpact='Extreme dryness can challenge plant and animal hydration; higher humidity indicates unusual moisture, potentially from rare rain.' 
        maxImpact='Below 5% leads to rapid dehydration and increases fire risk; above 50% is uncommon but may occur during rare rain or monsoon, creating temporary changes in habitat.'
      />
    </div>
  );
};

export default DesertPage;