import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { format } from "date-fns";
import { Line, Bar } from 'react-chartjs-2';
// import faker from 'faker';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


export const options = {
    responsive: true,
    elements: {
        line: {
            tension: 0.5 // disables bezier curves
        }
	},
    maintainAspectRatio: false,
    interaction: {
        // mode: 'index' as const,
        mode: 'index',
        intersect: false,
    },
    stacked: false,
    plugins: {
        title: {
            display: true,
            // text: 'Chart.js Line Chart - Multi Axis',
        },
    },
    scales: {
        y: {
            //   type: 'linear' as const,
            type: 'linear',
            display: true,
            // position: 'left' as const,
            position: 'left'
        },
        y1: {
            // type: 'linear' as const,
            type: 'linear',
            display: true,
            // position: 'right' as const,
            position: 'right',
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

// const labels = ['Deepak',"Surabhi","Velmurugan","Gaurang","Rati","Rahul","Ravneet","Shaliesh"];


export default function MultiLineSalesChart({salesRevenueData}) {
    const revenueData = salesRevenueData.map((e)=>{return e.totalrevenue});
    const profitAfterTaxData = salesRevenueData.map((e)=>{return e.profitaftertax});
    const labels = salesRevenueData.map((e)=>{return format(new Date(e.date), "d MMM")});

    console.log("Chart.js|MultiLineChart|revenueData,roomNightData,labels",revenueData,profitAfterTaxData,labels)

    const data = {
        labels,
        datasets: [
            {
                label: 'Total Revenue',
                data: revenueData,
                borderColor: '#f46d25',
                backgroundColor: '#f46d2555',
                yAxisID: 'y',
                position: 'left',
            },
            {
                label: 'Profit After Tax',
                data: profitAfterTaxData,
                borderColor: '#00aa00',
                backgroundColor: '#00aa0055',
                yAxisID: 'y1',
            },
        ],
    };
    

    return <Line options={options} data={data}  />
}
