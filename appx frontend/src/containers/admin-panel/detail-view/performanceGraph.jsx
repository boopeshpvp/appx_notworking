import React from "react";
import faker from "faker";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Typography } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const headText = (text) => (
    console.log(typeof(text)),
  <Typography className="profileCardHeading">{text}</Typography>
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    // title: {
    //     display: true,
    //     text: 'Progress',
    //     color: '#088b89',
        
    //     // position: 'bottom',
    //  }
  },
};

const labels = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

export const data = {
  labels,
  datasets: [
    {
      label: "Grade",
      data: labels.map(() => faker.datatype.number({ min: 0, max: 5 })),
      borderColor: "#298f09",
      backgroundColor: "#088b89",
    },
  ],
};

export function LineGraph() {
  return <Line options={options} data={data} />;
}
