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
import { Line, Bar } from 'react-chartjs-2';
// import faker from 'faker';
import { format } from "date-fns";

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
    scales: {
        y: {
            //   type: 'linear' as const,
            type: 'linear',
            display: true,
            // position: 'left' as const,
            position: 'left',
            ticks: {
                color: "#f46d25"
              }
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
            ticks: {
                color: "#00aa00"
              }
        },
    },
};


export default function MultiLineAgentChart({agentRevenueData, notAdmin}) {
    const revenueData = agentRevenueData.map((e)=>{return e.totalrevenue});
    const profitAfterTaxData = agentRevenueData.map((e)=>{return e.profitaftertax});
    let labels = agentRevenueData.map((e)=>{return e.name});
    if (notAdmin){
        labels = agentRevenueData.map((e)=>{return format(new Date(e.name),"d")});
    }
    

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
