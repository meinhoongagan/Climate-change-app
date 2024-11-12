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
import '../DesertPage/DesertPage.css';

// Register Chart.js components
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

  // Chart configurations
  const chartConfigs = [
    {
      data: {
        labels: ['Current Temp'],
        datasets: [{
          label: 'Temperature',
          data: [temp],
          backgroundColor: '#3440eb',
        }],
      },
      options: {
        scales: {
          y: {
            ticks: { stepSize: 5 },
            suggestedMin: 0,
            suggestedMax: 60,
          }
        }
      },
      plugin: {
        ranges: [
          { max: 35, color: 'rgba(0, 255, 0, 0.1)' },
          { max: 45, color: 'rgba(255, 255, 0, 0.1)' },
          { max: 60, color: 'rgba(255, 0, 0, 0.1)' }
        ]
      }
    },
    {
      data: {
        labels: ['Current AQI'],
        datasets: [{
          label: 'AQI',
          data: [aqi],
          backgroundColor: '#008080',
        }],
      },
      options: {
        scales: {
          y: {
            ticks: { stepSize: 50 },
            suggestedMin: 0,
            suggestedMax: 300,
          }
        }
      },
      plugin: {
        ranges: [
          { max: 50, color: 'rgba(0, 255, 0, 0.1)' },
          { max: 100, color: 'rgba(255, 255, 0, 0.1)' },
          { max: 300, color: 'rgba(255, 0, 0, 0.1)' }
        ]
      }
    },
    {
      data: {
        labels: ['Current Wind Speed'],
        datasets: [{
          label: 'Wind Speed',
          data: [wind],
          backgroundColor: '#800080',
        }],
      },
      options: {
        scales: {
          y: {
            ticks: { stepSize: 5 },
            suggestedMin: 0,
            suggestedMax: 50,
          }
        }
      },
      plugin: {
        ranges: [
          { max: 20, color: 'rgba(0, 255, 0, 0.1)' },
          { max: 40, color: 'rgba(255, 255, 0, 0.1)' },
          { max: 50, color: 'rgba(255, 0, 0, 0.1)' }
        ]
      }
    },
    {
      data: {
        labels: ['Current UV Radiation'],
        datasets: [{
          label: 'UV radiations',
          data: [uv],
          backgroundColor: '#800000',
        }],
      },
      options: {
        scales: {
          y: {
            ticks: { stepSize: 2 },
            suggestedMin: 0,
            suggestedMax: 14,
          }
        }
      },
      plugin: {
        ranges: [
          { max: 7, color: 'rgba(0, 255, 0, 0.1)' },
          { max: 10, color: 'rgba(255, 255, 0, 0.1)' },
          { max: 12, color: 'rgba(255, 0, 0, 0.1)' }
        ]
      }
    },
    {
      data: {
        labels: ['Current Humidity'],
        datasets: [{
          label: 'Humidity',
          data: [hum],
          backgroundColor: '#008000',
        }],
      },
      options: {
        scales: {
          y: {
            ticks: { stepSize: 10 },
            suggestedMin: 0,
            suggestedMax: 80,
          }
        }
      },
      plugin: {
        ranges: [
          { max: 30, color: 'rgba(0, 255, 0, 0.1)' },
          { max: 50, color: 'rgba(255, 255, 0, 0.1)' },
          { max: 80, color: 'rgba(255, 0, 0, 0.1)' }
        ]
      }
    }
  ];

  // Common options for all charts
  const commonOptions = {
    responsive: true,
    scales: {
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

  // Create plugin for background colors
  const createPlugin = (ranges) => ({
    id: 'backgroundColorPlugin',
    beforeDraw: (chart) => {
      const { ctx, chartArea: { left, right }, scales: { y } } = chart;
      
      ranges.forEach((range, index) => {
        const prevMax = index > 0 ? ranges[index - 1].max : 0;
        ctx.fillStyle = range.color;
        ctx.fillRect(
          left,
          y.getPixelForValue(prevMax),
          right - left,
          y.getPixelForValue(range.max) - y.getPixelForValue(prevMax)
        );
      });
    },
  });

  const impactData = [
    {
      min: '20',
      mid: '35',
      max: '45',
      minImpact: 'Typical during cooler months or early mornings/evenings; supports activity for desert-adapted plants and animals.',
      midImpact: 'Common during the day; begins to stress vegetation and wildlife due to increased heat.',
      maxImpact: 'Extreme heat; significant risks of rapid dehydration, reduced animal activity, and plant stress.'
    },
    {
      min: '0',
      mid: '50',
      max: '100',
      minImpact: 'Clean air with minimal pollution; natural dust levels may vary but generally safe.',
      midImpact: 'Dust storms or local human activities can influence AQI; mild impacts on respiratory health for animals and humans.',
      maxImpact: 'Unhealthy due to severe dust storms, pollution from nearby urban or industrial areas; harmful to health and visibility.'
    },
    {
      min: '5',
      mid: '20',
      max: '40',
      minImpact: 'Light to moderate breezes; helps regulate temperature and move sand without significant impact.',
      midImpact: 'Stronger winds; can cause sand movement that may affect plants and wildlife.',
      maxImpact: 'Severe winds; potential for full sandstorms that reduce visibility and disrupt habitats.'
    },
    {
      min: '4',
      mid: '7',
      max: '10',
      minImpact: 'Moderate to high during cooler months; sun protection is advisable for prolonged exposure.',
      midImpact: 'Very high; typical during peak daylight hours, leading to risk of sunburn and heat-related issues.',
      maxImpact: 'Extreme UV exposure, especially in summer; significant risk of skin and eye damage, even during short exposures.'
    },
    {
      min: '10',
      mid: '5',
      max: '0',
      minImpact: 'Typical dry conditions; supports desert life adapted to arid environments.',
      midImpact: 'Extreme dryness can challenge plant and animal hydration; higher humidity indicates unusual moisture, potentially from rare rain.',
      maxImpact: 'Below 5% leads to rapid dehydration and increases fire risk; above 50% is uncommon but may occur during rare rain or monsoon, creating temporary changes in habitat.'
    }
  ];

  return (
    <div className="desert-page-container">
      {chartConfigs.map((config, index) => (
        <div key={index} className="chart-container">
          <Bar className='max-w-[400px] max-h-[400px]'
            data={config.data}
            options={{ ...commonOptions, ...config.options }}
            plugins={[createPlugin(config.plugin.ranges)]}
          />
          <Impact
            para={config.data.datasets[0].data[0]}
            {...impactData[index]}
          />
        </div>
      ))}
    </div>
  );
};

export default DesertPage;