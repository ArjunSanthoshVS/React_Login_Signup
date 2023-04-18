import React from 'react'
import './Receipt.css';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { MDBBtn } from 'mdb-react-ui-kit';
function Receipt({ name, unit, bloodGroup, date, district, branch, age, gender, userDist }) {
    const downloadPDF = () => {

        const capture = document.querySelector('.receipt-container')
        html2canvas(capture).then((canvas) => {
            const imgData = canvas.toDataURL('img/png')
            const doc = new jsPDF()
            const imgWidth = doc.internal.pageSize.getWidth()
            const imgHeight = doc.internal.pageSize.getHeight()
            doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
            doc.save('receipt.pdf')
        })
    }
    return (
        <>
            <div className="receipt-container bg-light">
                <div className="receipt-header">
                    <h1>Red wings Blood Bank</h1>
                    <h4>Blood Transfusion Receipt</h4>
                </div>
                <div className="ms-auto mt-3">
                    <p>Date & Time : {date}</p>
                </div>
                <div className="receipt-body">
                    <h5>District : {district}</h5>
                    <h5>Branch : {branch}</h5>
                    <h4 className='mt-4'>Patient Information</h4>
                    <h5>Name : {name}</h5>
                    <h5>Age : {age}</h5>
                    <h5>Gender : {gender}</h5>
                    <h5>District : {userDist}</h5>
                    <h5>Blood Group : {bloodGroup}</h5>
                    <h5>Unit : {unit}</h5>
                </div>
                <div className="footer">
                    <h5 className='mt-4'>RedWings always with your blood</h5>
                </div>
            </div>
            <div className="button d-flex justify-content-center m-4">
                <MDBBtn onClick={downloadPDF}>Download your receipt</MDBBtn>
            </div>
        </>
    )
}

export default Receipt
