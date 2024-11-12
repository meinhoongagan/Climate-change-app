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
import '../UrbanPage/UrbanPage.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const UrbanPage = () => {
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

  const plugin = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(15), right - left, y.getPixelForValue(25) - y.getPixelForValue(15));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(25), right - left, y.getPixelForValue(35) - y.getPixelForValue(25));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(35), right - left, y.getPixelForValue(50) - y.getPixelForValue(35));
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
      ctx.fillRect(left, y.getPixelForValue(5), right - left, y.getPixelForValue(20) - y.getPixelForValue(5));
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
        ticks: { stepSize: 1 },
        suggestedMin: 0,
        suggestedMax: 10,
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
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(2) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(2), right - left, y.getPixelForValue(3) - y.getPixelForValue(2));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(3), right - left, y.getPixelForValue(10) - y.getPixelForValue(3));
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
        suggestedMax: 100,
      },
      x: {
        ticks: {
          font: { size: 16 },
        },
      },
    },
  };

  const plugin5 = {
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      ctx.fillStyle = 'rgba(0, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(40), right - left, y.getPixelForValue(60) - y.getPixelForValue(40));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(60), right - left, y.getPixelForValue(80) - y.getPixelForValue(60));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(40) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(80), right - left, y.getPixelForValue(100) - y.getPixelForValue(80));
    },
  };

  return (
    <div className='container'>
      <Bar data={data} options={options} className='chart' plugins={[plugin]}/>
      <Impact para={temp} min={15} mid={25} max={35} 
        minImpact='Comfortable range for most urban activities; optimal for health and energy use.' 
        midImpact='Common during warmer seasons; can lead to heat stress, especially for children, the elderly, and those with health conditions.' 
        maxImpact='Heatwaves; increased risk of heat-related illnesses such as heat exhaustion and heatstroke, higher energy demand for cooling, and strain on urban infrastructure.'
      />
      
      <Bar data={data2} options={options2} className='chart' plugins={[plugin2]}/>
      <Impact para={aqi} min={0} mid={50} max={100} 
        minImpact='Good air quality; minimal health impacts and supports general well-being.' 
        midImpact='Acceptable air quality, but may have mild impacts on sensitive groups such as children, the elderly, and individuals with respiratory conditions.' 
        maxImpact='Unhealthy; affects public health, particularly those with respiratory issues and cardiovascular conditions, and may trigger public health advisories.'
      />
      
      <Bar data={data3} options={options3} className='chart' plugins={[plugin3]}/>
      <Impact para={wind} min={5} mid={20} max={40} 
        minImpact='Comfortable and aids in air circulation, reducing pollution concentration.' 
        midImpact='Stronger winds; may cause minor disruptions such as moving loose debris, impacting pedestrians and light structures.' 
        maxImpact='Severe winds; potential for damage to infrastructure, fallen trees, power outages, and transportation disruptions.'
      />
      
      <Bar data={data4} options={options4} className='chart' plugins={[plugin4]}/>
      <Impact para={uv} min={0} mid={2} max={5} 
        minImpact='Low UV exposure; minimal risk and safe for most outdoor activities without protective measures.' 
        midImpact='Moderate exposure; requires precautions such as sunscreen and protective clothing during extended time outdoors.' 
        maxImpact='Strong exposure; significant risk of sunburn and skin damage without protection, requiring sun safety measures for outdoor activities.'
      />
      
      <Bar data={data5} options={options5} className='chart' plugins={[plugin5]}/>
      <Impact para={hum} min={40} mid={60} max={80}  
        minImpact='Comfortable range for most people; supports optimal air quality and reduces the risk of dehydration.' 
        midImpact='May feel muggy, increasing discomfort and contributing to reduced air quality and difficulty breathing for some individuals.' 
        maxImpact='Uncomfortable, often leading to heat stress and promoting mold growth, which can cause or worsen respiratory issues.'
      />
    </div>
  );
};

export default UrbanPage;