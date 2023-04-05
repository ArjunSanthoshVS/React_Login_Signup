import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getDonations } from '../../../Redux/Features/Admin/donationsSlice';

function DonationReportPage() {
    const [donations, setDonations] = useState([]);
    const dispatch = useDispatch()
    const totalDonations = donations.length
    const pendingDonations = donations.filter(request => request.status === 'Pending').length
    const approvedDonations = donations.filter(request => request.status === 'Approved').length
    const rejectedDonations = donations.filter(request => request.status === 'Rejected').length

    useEffect(() => {
        const donations = async () => {
            const response = await dispatch(getDonations())
            setDonations(response.payload)
        }
        donations()
    }, [])
  return (
    <>
          <div className="card" style={{ background: 'gainsboro' }}>
              <div className="card-body">
                  <div className="row d-flex">
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Total Donations</b></h5>
                                  <hr style={{ height: '4px', color: 'blue', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">
                                      {totalDonations}
                                  </h5>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Pending Donations</b></h5>
                                  <hr style={{ height: '4px', color: 'black', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">
                                      {pendingDonations}
                                  </h5>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Approved Donations</b></h5>
                                  <hr style={{ height: '4px', color: 'green', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">{approvedDonations}</h5>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Rejected Donations</b></h5>
                                  <hr style={{ height: '4px', color: 'red', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">
                                      {rejectedDonations}
                                  </h5>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </>
  )
}

export default DonationReportPage
