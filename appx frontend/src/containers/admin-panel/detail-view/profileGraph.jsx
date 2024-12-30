import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import faker from 'faker'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    // title: {
    //   text:"Progress",
    //   display: true,
     
    // },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Total',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: '#088b89',
    },
    {
      label: 'Employees',
      data: labels.map(() => faker.datatype.number({ min: 0, max: 20 })),
      backgroundColor: '#298f09',
    },
  ],
};

export function Graph() {
  return <Bar options={options} data={data} />;
}


