import React from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { format } from "date-fns";

ChartJS.register(
    CategoryScale,
    LinearScale,
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
            ticks: {
                color: "#00aa00"
              },
            grid: {
                drawOnChartArea: false,
            },
        },
    },
};

export default function MultiLineChart({hotelRevenueData}) {



    const revenueData = hotelRevenueData.map((e)=>{return e.netpayout});
    const roomNightData = hotelRevenueData.map((e)=>{return e.roomNight});
    const labels = hotelRevenueData.map((e)=>{return format(new Date(e.date), "d")});

    // console.log("Chart.js|MultiLineChart|revenueData,roomNightData,labels",revenueData,roomNightData,labels)

    const data = {
        labels,
        datasets: [
            {
                label: 'Revenue',
                data: revenueData,
                borderColor: '#f46d25',
                backgroundColor: '#f46d2555',
                yAxisID: 'y',
                position: 'left',
            },
            {
                label: 'Room Night',
                data: roomNightData,
                borderColor: '#00aa00',
                backgroundColor: '#00aa0055',
                yAxisID: 'y1',
            },
        ],
    };

    return <Line options={options} data={data}  />
}
