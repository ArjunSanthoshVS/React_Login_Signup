
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useDispatch } from 'react-redux';
import { fetchUsers } from '../../../Redux/Features/Admin/getUsersSlice';

export default function PieChart() {
    const [users, setUsers] = useState([])
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const dispatch = useDispatch()
    const aP = users.filter(user => user.bloodGroup === "A+ve").length
    const aN = users.filter(user => user.bloodGroup === "A-ve").length
    const bP = users.filter(user => user.bloodGroup === "B+ve").length
    const bN = users.filter(user => user.bloodGroup === "B-ve").length
    const abP = users.filter(user => user.bloodGroup === "AB+ve").length
    const abN = users.filter(user => user.bloodGroup === "AB-ve").length
    const oP = users.filter(user => user.bloodGroup === "O+ve").length
    const oN = users.filter(user => user.bloodGroup === "O-ve").length

    useEffect(() => {
        const details = async () => {
            const response = await dispatch(fetchUsers())
            setUsers(response.payload)
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'],
            datasets: [
                {
                    data: [aP, aN, bP, bN, abP, abN, oP, oN],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--red-500'),
                        documentStyle.getPropertyValue('--orange-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500'),
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--indigo-500'),
                        documentStyle.getPropertyValue('--purple-500'),
                        documentStyle.getPropertyValue('--pink-500'),

                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--red-400'),
                        documentStyle.getPropertyValue('--orange-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400'),
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--indigo-400'),
                        documentStyle.getPropertyValue('--purple-400'),
                        documentStyle.getPropertyValue('--pink-400'),
                    ]
                }
            ]
        }
        const options = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true
                    }
                }
            }
        };
        setChartData(data);
        setChartOptions(options);
        details()
    }, [aN, aP, abN, abP, bN, bP, dispatch, oN, oP]);

    return (
        <div className="card p-3 w-75 mx-auto mt-5">
            <Chart type="pie" data={chartData} options={chartOptions}  width='600px' height='600px' className='mx-auto'/>
        </div>
    )
}
