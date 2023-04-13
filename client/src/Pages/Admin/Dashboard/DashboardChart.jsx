
import React, { useState, useEffect } from 'react';
import { Chart } from 'primereact/chart';
import { useDispatch } from 'react-redux';
import { getDonations } from '../../../Redux/Features/Admin/donationsSlice';
import { getTransfusion } from '../../../Redux/Features/Admin/requests';

export default function DashboardChart() {
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [donations, setDonations] = useState([])
    const [requests, setRequests] = useState([])
    const dispatch = useDispatch()

    const DaP = donations.filter(donation => donation.bloodGroup === "A+ve").length
    const DaN = donations.filter(donation => donation.bloodGroup === "A-ve").length
    const DbP = donations.filter(donation => donation.bloodGroup === "B+ve").length
    const DbN = donations.filter(donation => donation.bloodGroup === "B-ve").length
    const DabP = donations.filter(donation => donation.bloodGroup === "AB+ve").length
    const DabN = donations.filter(donation => donation.bloodGroup === "AB-ve").length
    const DoP = donations.filter(donation => donation.bloodGroup === "O+ve").length
    const DoN = donations.filter(donation => donation.bloodGroup === "O-ve").length

    const RaP = requests.filter(request => request.bloodGroup === "A+ve").length
    const RaN = requests.filter(request => request.bloodGroup === "A-ve").length
    const RbP = requests.filter(request => request.bloodGroup === "B+ve").length
    const RbN = requests.filter(request => request.bloodGroup === "B-ve").length
    const RabP = requests.filter(request => request.bloodGroup === "AB+ve").length
    const RabN = requests.filter(request => request.bloodGroup === "AB-ve").length
    const RoP = requests.filter(request => request.bloodGroup === "O+ve").length
    const RoN = requests.filter(request => request.bloodGroup === "O-ve").length
    useEffect(() => {
        const details = async () => {
            const donation = await dispatch(getDonations())
            setDonations(donation.payload)

            const request = await dispatch(getTransfusion())
            setRequests(request.payload)
        }
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        const data = {
            labels: ['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve'],
            datasets: [
                {
                    label: 'Donations',
                    backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                    borderColor: documentStyle.getPropertyValue('--blue-500'),
                    data: [DaP, DaN, DbP, DbN, DabP, DabN, DoP, DoN]
                },
                {
                    label: 'Transfusions',
                    backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                    borderColor: documentStyle.getPropertyValue('--pink-500'),
                    data: [RaP, RaN, RbP, RbN, RabP, RabN, RoP, RoN]
                }
            ]
        };
        const options = {
            maintainAspectRatio: false,
            aspectRatio: 0.8,
            plugins: {
                legend: {
                    labels: {
                        fontColor: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary,
                        font: {
                            weight: 500
                        }
                    },
                    grid: {
                        display: false,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
        details()
        setChartData(data);
        setChartOptions(options);
    }, [DaN, DaP, DabN, DabP, DbN, DbP, DoN, DoP, RaN, RaP, RabN, RabP, RbN, RbP, RoN, RoP, dispatch]);

    return (
        <div className="card p-3 mt-5 w-75 mx-auto">
            <Chart type="bar" data={chartData} options={chartOptions} />
        </div>
    )
}
