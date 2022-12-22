import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const options = {
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        usePointStyle: true,
        pointStyle: 'circle'
      }
    }
  },
  responsive: true,
  maintainAspectRatio: false,
  offset:true
};

export default function App({hotelBreakUpData}) {
  const revenueData = hotelBreakUpData.map((e)=>{return e.revenue});
  const hotelLabel = hotelBreakUpData.map((e)=>{return e.displayName});

  const data = {
    labels: hotelLabel,
    datasets: [
      {
        label: hotelLabel,
        data: revenueData,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
    {
      hotelBreakUpData.length != 0?<Pie data={data} options={options} />:<h2 style={{textAlign:"center",paddingTop:'25%'}}>No Data</h2>
    }
    </>
      
  )
}
