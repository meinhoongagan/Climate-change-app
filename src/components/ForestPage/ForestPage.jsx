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
import './ForestPage.css';

// Register Chart.js components
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

  // Configuration objects for each chart
  const chartConfigs = {
    temperature: {
      data: {
        labels: ['Current Temp'],
        datasets: [{
          label: 'Temperature',
          data: [temp],
          backgroundColor: '#3440eb',
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { stepSize: 5 },
            suggestedMin: 0,
            suggestedMax: 50,
          },
          x: {
            ticks: { font: { size: 16 } },
          },
        },
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
      plugin: createPlugin([
        { min: 15, max: 25, color: 'rgba(0, 255, 0, 0.1)' },
        { min: 25, max: 35, color: 'rgba(255, 255, 0, 0.1)' },
        { min: 35, max: 50, color: 'rgba(255, 0, 0, 0.1)' }
      ])
    },
    aqi: {
      data: {
        labels: ['Current AQI'],
        datasets: [{
          label: 'AQI',
          data: [aqi],
          backgroundColor: '#008080',
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { stepSize: 50 },
            suggestedMin: 0,
            suggestedMax: 300,
          },
          x: {
            ticks: { font: { size: 16 } },
          },
        },
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
      plugin: createPlugin([
        { min: 0, max: 50, color: 'rgba(0, 255, 0, 0.1)' },
        { min: 50, max: 100, color: 'rgba(255, 255, 0, 0.1)' },
        { min: 100, max: 300, color: 'rgba(255, 0, 0, 0.1)' }
      ])
    },
    windSpeed: {
      data: {
        labels: ['Current Wind Speed'],
        datasets: [{
          label: 'Wind Speed',
          data: [wind],
          backgroundColor: '#800080',
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { stepSize: 5 },
            suggestedMin: 0,
            suggestedMax: 50,
          },
          x: {
            ticks: { font: { size: 16 } },
          },
        },
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
      plugin: createPlugin([
        { min: 5, max: 15, color: 'rgba(0, 255, 0, 0.1)' },
        { min: 15, max: 30, color: 'rgba(255, 255, 0, 0.1)' },
        { min: 30, max: 50, color: 'rgba(255, 0, 0, 0.1)' }
      ])
    },
    uvRadiation: {
      data: {
        labels: ['Current UV Radiation'],
        datasets: [{
          label: 'UV radiations',
          data: [uv],
          backgroundColor: '#800000',
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { stepSize: 1 },
            suggestedMin: 0,
            suggestedMax: 10,
          },
          x: {
            ticks: { font: { size: 16 } },
          },
        },
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
      plugin: createPlugin([
        { min: 0, max: 2, color: 'rgba(0, 255, 0, 0.1)' },
        { min: 2, max: 3, color: 'rgba(255, 255, 0, 0.1)' },
        { min: 3, max: 10, color: 'rgba(255, 0, 0, 0.1)' }
      ])
    },
    humidity: {
      data: {
        labels: ['Current Humidity'],
        datasets: [{
          label: 'Humidity',
          data: [hum],
          backgroundColor: '#008000',
        }],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            ticks: { stepSize: 10 },
            suggestedMin: 0,
            suggestedMax: 100,
          },
          x: {
            ticks: { font: { size: 16 } },
          },
        },
        plugins: {
          legend: { display: true, position: 'top' },
        },
      },
      plugin: createHumidityPlugin()
    }
  };

  // Helper function to create plugins
  function createPlugin(ranges) {
    return {
      id: 'backgroundColorPlugin',
      beforeDraw: (chart) => {
        const { ctx, chartArea: { left, right }, scales: { y } } = chart;
        ranges.forEach(({ min, max, color }) => {
          ctx.fillStyle = color;
          ctx.fillRect(left, y.getPixelForValue(min), right - left, y.getPixelForValue(max) - y.getPixelForValue(min));
        });
      },
    };
  }

  // Special plugin for humidity with multiple ranges
  function createHumidityPlugin() {
    return {
      id: 'backgroundColorPlugin',
      beforeDraw: (chart) => {
        const { ctx, chartArea: { left, right }, scales: { y } } = chart;
        const ranges = [
          { min: 60, max: 80, color: 'rgba(0, 255, 0, 0.1)' },
          { min: 40, max: 60, color: 'rgba(255, 255, 0, 0.1)' },
          { min: 80, max: 90, color: 'rgba(255, 255, 0, 0.1)' },
          { min: 0, max: 40, color: 'rgba(255, 0, 0, 0.1)' },
          { min: 90, max: 100, color: 'rgba(255, 0, 0, 0.1)' }
        ];
        ranges.forEach(({ min, max, color }) => {
          ctx.fillStyle = color;
          ctx.fillRect(left, y.getPixelForValue(min), right - left, y.getPixelForValue(max) - y.getPixelForValue(min));
        });
      },
    };
  }

  return (
    <div className="forest-page-container">
      <div className="chart-impact-pair">
        <Bar data={chartConfigs.temperature.data} options={chartConfigs.temperature.options} className="chart" plugins={[chartConfigs.temperature.plugin]}/>
        <Impact 
          para={temp} 
          min='15' 
          mid='25' 
          max='35' 
          minImpact='Ideal conditions, supporting healthy plant growth and balanced animal activity.' 
          midImpact='Plants and animals may experience mild stress; photosynthesis efficiency could decrease.' 
          maxImpact='Significant heat stress; potential for dehydration in animals, reduced plant growth, and increased fire risk.'
        />
      </div>

      <div className="chart-impact-pair">
        <Bar data={chartConfigs.aqi.data} options={chartConfigs.aqi.options} className="chart" plugins={[chartConfigs.aqi.plugin]}/>
        <Impact 
          para={aqi} 
          min='0' 
          mid='50' 
          max='100' 
          minImpact='Clean air, optimal for all living organisms.' 
          midImpact='Some sensitive plant and animal species may show minor stress; reduced productivity.' 
          maxImpact='Negative impacts on plant respiration, stunted growth, and health problems in animals.'
        />
      </div>

      <div className="chart-impact-pair">
        <Bar data={chartConfigs.windSpeed.data} options={chartConfigs.windSpeed.options} className="chart" plugins={[chartConfigs.windSpeed.plugin]}/>
        <Impact 
          para={wind} 
          min='5' 
          mid='15' 
          max='30' 
          minImpact='Promotes pollination and seed dispersal, generally beneficial.' 
          midImpact='Can disrupt wildlife activities and affect tall vegetation stability.' 
          maxImpact='Risk of tree damage, potential habitat destruction, and reduced plant stability.'
        />
      </div>

      <div className="chart-impact-pair">
        <Bar data={chartConfigs.uvRadiation.data} options={chartConfigs.uvRadiation.options} className="chart" plugins={[chartConfigs.uvRadiation.plugin]}/>
        <Impact 
          para={uv} 
          min='0' 
          mid='2' 
          max='5' 
          minImpact='Safe for most organisms; supports regular photosynthesis.' 
          midImpact='May affect some plants growth and cause minor health issues in animals.' 
          maxImpact='Can damage plant tissues, reduce photosynthesis rates, and cause stress in animals.'
        />
      </div>

      <div className="chart-impact-pair">
        <Bar data={chartConfigs.humidity.data} options={chartConfigs.humidity.options} className="chart" plugins={[chartConfigs.humidity.plugin]}/>
        <Impact 
          para={hum} 
          min='60' 
          mid='40' 
          mid2='80' 
          max='0' 
          max2='90' 
          minImpact='Ideal for most forest vegetation and wildlife; promotes healthy growth.' 
          midImpact='Dry conditions may stress plants, while high moisture can encourage fungal growth.' 
          maxImpact='Risk of drought and fire under dry conditions; overly wet conditions may lead to plant decay and spread of diseases.'
        />
      </div>
    </div>
  );
};

export default ForestPage;