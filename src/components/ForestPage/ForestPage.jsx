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
import '../ForestPage/ForestPage.css'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ForestPage = () => {
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
      ctx.fillRect(left, y.getPixelForValue(5), right - left, y.getPixelForValue(15) - y.getPixelForValue(5));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(15), right - left, y.getPixelForValue(30) - y.getPixelForValue(15));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(30), right - left, y.getPixelForValue(50) - y.getPixelForValue(30));
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
      ctx.fillRect(left, y.getPixelForValue(60), right - left, y.getPixelForValue(80) - y.getPixelForValue(60));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(40), right - left, y.getPixelForValue(60) - y.getPixelForValue(40));
      ctx.fillStyle = 'rgba(255, 255, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(80), right - left, y.getPixelForValue(90) - y.getPixelForValue(80));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(0), right - left, y.getPixelForValue(40) - y.getPixelForValue(0));
      ctx.fillStyle = 'rgba(255, 0, 0, 0.1)';
      ctx.fillRect(left, y.getPixelForValue(90), right - left, y.getPixelForValue(100) - y.getPixelForValue(90));
    },
  };

  return (
    <div className='container'>
      <Bar data={data} options={options} className='chart' plugins={[plugin]}/>
      <Impact 
        para={temp} 
        min={15} 
        mid={25} 
        max={35} 
        minImpact='Ideal conditions, supporting healthy plant growth and balanced animal activity.' 
        midImpact='Plants and animals may experience mild stress; photosynthesis efficiency could decrease.' 
        maxImpact='Significant heat stress; potential for dehydration in animals, reduced plant growth, and increased fire risk.'
      />
      
      <Bar data={data2} options={options2} className='chart' plugins={[plugin2]}/>
      <Impact 
        para={aqi} 
        min={0} 
        mid={50} 
        max={100} 
        minImpact='Clean air, optimal for all living organisms.' 
        midImpact='Some sensitive plant and animal species may show minor stress; reduced productivity.' 
        maxImpact='Negative impacts on plant respiration, stunted growth, and health problems in animals.'
      />
      
      <Bar data={data3} options={options3} className='chart' plugins={[plugin3]}/>
      <Impact 
        para={wind} 
        min={5} 
        mid={15} 
        max={30} 
        minImpact='Promotes pollination and seed dispersal, generally beneficial.' 
        midImpact='Can disrupt wildlife activities and affect tall vegetation stability.' 
        maxImpact='Risk of tree damage, potential habitat destruction, and reduced plant stability.'
      />
      
      <Bar data={data4} options={options4} className='chart' plugins={[plugin4]}/>
      <Impact 
        para={uv} 
        min={0} 
        mid={2} 
        max={5} 
        minImpact='Safe for most organisms; supports regular photosynthesis.' 
        midImpact='May affect some plants. growth and cause minor health issues in animals.'
        maxImpact='Can damage plant tissues, reduce photosynthesis rates, and cause stress in animals.'
      />
      
      <Bar data={data5} options={options5} className='chart' plugins={[plugin5]}/>
      <Impact 
        para={hum} 
        min={60} 
        mid={40} 
        mid2={80} 
        max={0} 
        max2={90} 
        minImpact='Ideal for most forest vegetation and wildlife; promotes healthy growth.' 
        midImpact='Dry conditions may stress plants, while high moisture can encourage fungal growth.' 
        maxImpact='Risk of drought and fire under dry conditions; overly wet conditions may lead to plant decay and spread of diseases.'
      />
    </div>
  );
};

export default ForestPage;