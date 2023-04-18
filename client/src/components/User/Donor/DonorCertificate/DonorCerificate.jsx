import React from 'react';
import './DonorCertificate.css';
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import { MDBBtn } from 'mdb-react-ui-kit';
function DonorCerificate({ name, unit, bloodGroup, date }) {
  const downloadPDF = () => {

    const capture = document.querySelector('.certificate-container')
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL('img/png')
      const doc = new jsPDF()
      const imgWidth = doc.internal.pageSize.getWidth()
      const imgHeight = doc.internal.pageSize.getHeight()
      doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight)
      doc.save('certificate.pdf')
    })
  }
  return (
    <>
      <div className="certificate-container bg-light">
        <div className="certificate-header">
          <h1>Certificate of Appreciation</h1>
        </div>
        <div className="img d-flex justify-content-center shadow-2 bg-secondary">
          <img className='w-75' src="https://res.cloudinary.com/dchrawfgy/image/upload/v1681500637/red_wings_logo_fga789.png" alt="" />
        </div>
        <div className="certificate-body">
          <p>This certifies that</p>
          <h2>{name}</h2>
          <h4>has successfully donated {unit} unit of {bloodGroup} blood</h4>
          <p>on the date</p>
          <h4>{date}</h4>
          <h4>"Do good for others by giving from what you have. Surely, it will come back to you with greater value - donate blood"</h4>
        </div>
        <div className="footer">
          <h5>RedWings always with your blood</h5>
        </div>
      </div>
      <div className="button d-flex justify-content-center m-4">
        <MDBBtn onClick={downloadPDF}>Download your Certificate</MDBBtn>
      </div>
    </>
  )
}

export default DonorCerificate
