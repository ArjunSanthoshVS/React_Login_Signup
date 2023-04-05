import React, { useEffect, useState } from 'react'
import { MDBTable, MDBTableHead, MDBTableBody, MDBRow, MDBCol } from 'mdb-react-ui-kit';
import { useDispatch } from 'react-redux';
import { getAvailableUnits } from '../../../Redux/Features/Admin/donationsSlice';

function BloodReportPage() {
    const dispatch = useDispatch()

    const [availableUnits, setAvailableUnits] = useState([]);

    const groupedData = availableUnits.reduce((acc, donation) => {
        if (!acc[donation.bloodGroup]) {
            acc[donation.bloodGroup] = [];
        }

        const existingDonation = acc[donation.bloodGroup].find(d => d.branch === donation.branch);

        if (existingDonation) {
            existingDonation.unit += donation.unit;
        } else {
            acc[donation.bloodGroup].push({
                district: donation.district,
                branch: donation.branch,
                bloodGroup: donation.bloodGroup,
                unit: donation.unit
            });
        }

        return acc;
    }, {});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await dispatch(getAvailableUnits())
                setAvailableUnits(result.payload);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);
  return (
    <>
          <div className="card-body">
              <MDBRow className='row-cols-1 row-cols-md-4 g-4'>
                  {Object.entries(groupedData).map(([bloodGroup, donations]) => (
                      <MDBCol>
                          <MDBTable bordered borderColor="primary" >
                              <React.Fragment key={bloodGroup}>
                                  <MDBTableHead>
                                      <tr>
                                          <th className='text-center' colSpan={3}><b>{bloodGroup}</b></th>
                                      </tr>
                                      <tr>
                                          <th>District</th>
                                          <th>Branch</th>
                                          <th>Units</th>
                                      </tr>
                                  </MDBTableHead>
                                  <MDBTableBody>
                                      {donations.map((donation) => (
                                          <tr key={donation._id}>
                                              <td>{donation.district}</td>
                                              <td>{donation.branch}</td>
                                              <td>{donation.unit} units</td>
                                          </tr>
                                      ))}
                                  </MDBTableBody>
                              </React.Fragment>
                          </MDBTable>
                      </MDBCol>
                  ))}
              </MDBRow>
          </div>
    </>
  )
}

export default BloodReportPage
