import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { getTransfusion } from '../../../Redux/Features/Admin/requests';

function RequestsReportPage() {
    const dispatch = useDispatch()

    const [transfusion, setTransfusion] = useState([]);

    const totalRequests = transfusion.length
    const pendingRequests = transfusion.filter(request => request.status === 'Pending').length
    const approvedRequests = transfusion.filter(request => request.status === 'Approved').length
    const rejectRequests = transfusion.filter(request => request.status === 'Rejected').length


    useEffect(() => {
        const transfusion = async () => {
            const response = await dispatch(getTransfusion())
            setTransfusion(response.payload)
        }
        transfusion()
    }, [])

  return (
    <>
          <div className="card mt-3" style={{ background: 'gainsboro' }}>
              <div className="card-body">
                  <div className="row d-flex">
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Total Requests</b></h5>
                                  <hr style={{ height: '4px', color: 'blue', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">
                                      {totalRequests}
                                  </h5>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Pending Requests</b></h5>
                                  <hr style={{ height: '4px', color: 'black', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">
                                      {pendingRequests}
                                  </h5>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Approved Requests</b></h5>
                                  <hr style={{ height: '4px', color: 'green', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">{approvedRequests}</h5>
                              </div>
                          </div>
                      </div>
                      <div className="col">
                          <div className="card">
                              <div className="card-body p-4">
                                  <h5 className="card-title text-center"><b>Rejected Requests</b></h5>
                                  <hr style={{ height: '4px', color: 'red', margin: '10px', opacity: '0.5' }} />
                                  <h5 className="card-text text-center">
                                      {rejectRequests}
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

export default RequestsReportPage
