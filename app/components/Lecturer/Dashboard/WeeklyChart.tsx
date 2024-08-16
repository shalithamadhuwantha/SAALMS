import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { ChartData, ChartOptions } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const WeeklyChart = () => {

  const data: ChartData<'bar', number[], string> = {
    labels: ['Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat', 'Sun'],
    datasets: [{
      label: 'Present',
      data: [80, 90, 76, 100, 115, 46, 120],
      backgroundColor: '#22C55E',
      borderColor: '#22C55E'
    },
    {
      label: 'Absent',
      data: [36, 25, 10, 11, 31, 80, 5],
      backgroundColor: '#EF4444',
      borderColor: '#EF4444'
    },
    ]
  }
  const options: ChartOptions<'bar'> = {
    plugins: {

      legend: {
        labels: {
          color: '#d1d5db',
          font: {
            size: 14,
          },
        },
      },
      tooltip: {
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#d1d5db',
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Days of the Week',
          color: '#d1d5db',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
      },
      y: {
        ticks: {
          color: '#d1d5db',
          font: {
            size: 12,
          },
        },
        title: {
          display: true,
          text: 'Number of Students',
          color: '#d1d5db',
          font: {
            size: 14,
            weight: 'bold',
          },
        },
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} />

}
export default WeeklyChart;