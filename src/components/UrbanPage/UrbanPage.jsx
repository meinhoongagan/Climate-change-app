import React from 'react';
import { Bar } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import Impact from '../Impact/Impact';
import '../UrbanPage/UrbanPage.css'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const createChartConfig = (label, value, color, minY, maxY, stepSize, zones) => {
  const data = {
    labels: [`Current ${label}`],
    datasets: [{
      label,
      data: [value],
      backgroundColor: color,
    }],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        ticks: { stepSize },
        suggestedMin: minY,
        suggestedMax: maxY,
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
      
      zones.forEach(({ color, start, end }) => {
        ctx.fillStyle = `rgba(${color}, 0.1)`;
        ctx.fillRect(
          left,
          y.getPixelForValue(start),
          right - left,
          y.getPixelForValue(end) - y.getPixelForValue(start)
        );
      });
    },
  };

  return { data, options, plugin };
};

const UrbanPage = () => {
  const temp = useSelector((state) => state.simulator.temperature);
  const aqi = useSelector((state) => state.simulator.aqi);
  const wind = useSelector((state) => state.simulator.wind_speed);
  const uv = useSelector((state) => state.simulator.uv_radiation);
  const hum = useSelector((state) => state.simulator.humidity);

  const charts = [
    {
      ...createChartConfig('Temperature', temp, '#3440eb', 0, 50, 5, [
        { color: '0, 255, 0', start: 15, end: 25 },
        { color: '255, 255, 0', start: 25, end: 35 },
        { color: '255, 0, 0', start: 35, end: 50 },
      ]),
      impact: {
        para: temp,
        min: '15',
        mid: '25',
        max: '35',
        minImpact: 'Comfortable range for most urban activities; optimal for health and energy use.',
        midImpact: 'Common during warmer seasons; can lead to heat stress, especially for children, the elderly, and those with health conditions.',
        maxImpact: 'Heatwaves; increased risk of heat-related illnesses such as heat exhaustion and heatstroke, higher energy demand for cooling, and strain on urban infrastructure.',
      },
    },
    {
      ...createChartConfig('AQI', aqi, '#008080', 0, 300, 50, [
        { color: '0, 255, 0', start: 0, end: 50 },
        { color: '255, 255, 0', start: 50, end: 100 },
        { color: '255, 0, 0', start: 100, end: 300 },
      ]),
      impact: {
        para: aqi,
        min: '0',
        mid: '50',
        max: '100',
        minImpact: 'Good air quality; minimal health impacts and supports general well-being.',
        midImpact: 'Acceptable air quality, but may have mild impacts on sensitive groups such as children, the elderly, and individuals with respiratory conditions.',
        maxImpact: 'Unhealthy; affects public health, particularly those with respiratory issues and cardiovascular conditions, and may trigger public health advisories.',
      },
    },
    {
      ...createChartConfig('Wind Speed', wind, '#800080', 0, 50, 5, [
        { color: '0, 255, 0', start: 5, end: 20 },
        { color: '255, 255, 0', start: 20, end: 40 },
        { color: '255, 0, 0', start: 40, end: 50 },
      ]),
      impact: {
        para: wind,
        min: '5',
        mid: '20',
        max: '40',
        minImpact: 'Comfortable and aids in air circulation, reducing pollution concentration.',
        midImpact: 'Stronger winds; may cause minor disruptions such as moving loose debris, impacting pedestrians and light structures.',
        maxImpact: 'Severe winds; potential for damage to infrastructure, fallen trees, power outages, and transportation disruptions.',
      },
    },
    {
      ...createChartConfig('UV Radiation', uv, '#800000', 0, 10, 1, [
        { color: '0, 255, 0', start: 0, end: 2 },
        { color: '255, 255, 0', start: 2, end: 3 },
        { color: '255, 0, 0', start: 3, end: 10 },
      ]),
      impact: {
        para: uv,
        min: '0',
        mid: '2',
        max: '5',
        minImpact: 'Low UV exposure; minimal risk and safe for most outdoor activities without protective measures.',
        midImpact: 'Moderate exposure; requires precautions such as sunscreen and protective clothing during extended time outdoors.',
        maxImpact: 'Strong exposure; significant risk of sunburn and skin damage without protection, requiring sun safety measures for outdoor activities.',
      },
    },
    {
      ...createChartConfig('Humidity', hum, '#008000', 0, 100, 10, [
        { color: '255, 255, 0', start: 0, end: 40 },
        { color: '0, 255, 0', start: 40, end: 60 },
        { color: '255, 255, 0', start: 60, end: 80 },
        { color: '255, 0, 0', start: 80, end: 100 },
      ]),
      impact: {
        para: hum,
        min: '40',
        mid: '60',
        max: '80',
        minImpact: 'Comfortable range for most people; supports optimal air quality and reduces the risk of dehydration.',
        midImpact: 'May feel muggy, increasing discomfort and contributing to reduced air quality and difficulty breathing for some individuals.',
        maxImpact: 'Uncomfortable, often leading to heat stress and promoting mold growth, which can cause or worsen respiratory issues.',
      },
    },
  ];

  return (
    <div className="flex flex-wrap w-[70vw] justify-center items-center mx-auto my-[50px] gap-[50px]">
      {charts.map((chart, index) => (
        <React.Fragment key={index}>
          <Bar
            data={chart.data}
            options={chart.options}
            plugins={[chart.plugin]}
            className="max-w-[400px] max-h-[400px]"
          />
          <Impact {...chart.impact} />
          <br />
        </React.Fragment>
      ))}
    </div>
  );
};

export default UrbanPage;