// /* eslint-disable import/no-unresolved */
// /* eslint-disable import/no-extraneous-dependencies */
// /* eslint-disable object-curly-spacing */
// import React from 'react';
// import { Line } from 'react-chartjs-2';
// import faker from 'faker';


// export const options = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: 'top',
//     },
//     title: {
//       display: true,
//       text: 'Line Chart',
//     },

//   },
// };

// const labels = ['January', 'February', 'March', 'April'];

// export const data = {
//   labels,
//   datasets: [
//     {
//       label: 'Dataset 1',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(255, 99, 132)',
//       backgroundColor: 'rgba(255, 99, 132, 0.5)',
//     },
//     {
//       label: 'Dataset 2',
//       data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
//       borderColor: 'rgb(53, 162, 235)',
//       backgroundColor: 'rgba(53, 162, 235, 0.5)',
//     },
//   ],
// };

// export function Chart() {
//   return <Line options={options} data={data} />;
// }
