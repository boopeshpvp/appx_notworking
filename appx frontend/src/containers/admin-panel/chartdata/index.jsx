import React from 'react';
import { Pie} from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend, } from 'chart.js';

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

export const data = {
  labels: ["React js", "Node js", "Angular", "Python", "Java", "Javascript"],
  datasets: [
    {
      label: '# of Votes',
      data: [140, 190, 170, 150, 50, 230],
      backgroundColor: [
        'rgb(215, 19, 19)',
        'rgb(6, 143, 255)',
        'rgb(0, 28, 48)',
        'rgb(23, 89, 74)',
        'rgb(233, 179, 132)',
        'rgb(234, 17, 121)',
      ],
    },
  ],
};

const PieChart = () => {
  return (
<Pie data={data}   height="300px"
                             width="300px"
                             
  options={{ maintainAspectRatio: false }}/>
  );
};

export default PieChart;

// import React from 'react';
// import { Pie} from 'react-chartjs-2';
// import { Chart as ChartJS, RadialLinearScale, ArcElement, Tooltip, Legend, } from 'chart.js';

// ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);

// const DATA_COUNT = 5;
// const NUMBER_CFG = {count: DATA_COUNT, min: 0, max: 100};

// const data = {
//   labels: ['Red', 'Orange', 'Yellow', 'Green', 'Blue'],
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: Utils.numbers(NUMBER_CFG),
//       backgroundColor: Object.values(Utils.CHART_COLORS),
//     }
//   ]
// };


// const PieChart = () => {
//   return (
//     <Pie data={data} />
//   );
// };

// export default PieChart;

