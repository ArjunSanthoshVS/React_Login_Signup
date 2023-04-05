import React, { useEffect, useState } from 'react'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { useDispatch } from 'react-redux';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { getBranches, pateintDetails, transfusionDistricts } from '../../../Redux/Features/User/DonateSlice';
function PatientsPage() {
    const dispatch = useDispatch()
    const [customers, setCustomers] = useState([]);
    const [filters, setFilters] = useState(null);
    const [loading] = useState(false);
    const [globalFilterValue, setGlobalFilterValue] = useState('');
    useEffect(() => {
        const details = async () => {
            const response = await dispatch(pateintDetails())
            setCustomers(response.payload)
        }
        details()
    }, []);

    useEffect(() => {
        const districts = async () => {
            const response = await dispatch(transfusionDistricts())
            setDistricts(response.payload)
        }
        districts()
    }, [])
    const [genders] = useState(['Male', 'Female', 'Others']);
    const [bloods] = useState(['A+ve', 'A-ve', 'B+ve', 'B-ve', 'AB+ve', 'AB-ve', 'O+ve', 'O-ve']);
    const [districts, setDistricts] = useState([])
    const [branches, setBranches] = useState([])

    const clearFilter = () => {
        initFilters();
    };

    const onGlobalFilterChange = (e) => {
        const value = e.target.value;
        let _filters = { ...filters };

        _filters['global'].value = value;

        setFilters(_filters);
        setGlobalFilterValue(value);
    };

    const initFilters = () => {
        setFilters({
            global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            fullName: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            gender: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            bloodGroup: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            district: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            branch: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
        });
        setGlobalFilterValue('');
    };

    const renderHeader = () => {
        return (
            <div className="d-flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" outlined onClick={clearFilter} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue} onChange={onGlobalFilterChange} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };

    const genderBodyTemplate = (rowData) => {
        return <p className='mb-0'>{rowData.gender}</p>;
    };
    const genderItemTemplate = (option) => {
        return <p>{option}</p>;
    };
    const genderFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={genders} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={genderItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const bloodBodyTemplate = (rowData) => {
        return <p className='mb-0'>{rowData.bloodGroup}</p>;
    };
    const bloodItemTemplate = (option) => {
        return <p>{option}</p>;
    };
    const bloodFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={bloods} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={bloodItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const handleDistrictChange = async (value, options, index) => {
        options.filterCallback(value, index);
        const response = await dispatch(getBranches(value))
        setBranches(response.payload)
    }

    const districtBodyTemplate = (rowData) => {
        return <p className='mb-0'>{rowData.district}</p>;
    };
    const districtItemTemplate = (option) => {
        return <p>{option}</p>;
    };
    const districtFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={districts} onChange={(e) => handleDistrictChange(e.value, options, options.index)} itemTemplate={districtItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const branchBodyTemplate = (rowData) => {
        return <p className='mb-0'>{rowData.branch}</p>;
    };
    const branchItemTemplate = (option) => {
        return <p>{option}</p>;
    };
    const branchFilterTemplate = (options) => {
        return <Dropdown value={options.value} options={branches} onChange={(e) => options.filterCallback(e.value, options.index)} itemTemplate={branchItemTemplate} placeholder="Select One" className="p-column-filter" showClear />;
    };

    const header = renderHeader();

    return (
        <>
            <div className="card">
                <DataTable value={customers} paginator showGridlines rows={5} loading={loading} dataKey="id"
                    filters={filters} globalFilterFields={['fullName', 'gender', 'bloodGroup', 'district', 'branch', 'receivedDate', 'reason']} header={header}
                    emptyMessage="No Users found.">
                    <Column field="fullName" header="Name" filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} />
                    <Column field="gender" header="Gender" style={{ minWidth: '12rem' }} body={genderBodyTemplate} filter filterElement={genderFilterTemplate} />
                    <Column field="bloodGroup" header="Blood Group" style={{ minWidth: '12rem' }} body={bloodBodyTemplate} filter filterElement={bloodFilterTemplate} />
                    <Column field="district" header="District" style={{ minWidth: '12rem' }} body={districtBodyTemplate} filter filterElement={districtFilterTemplate} />
                    <Column field="branch" header="Branch" style={{ minWidth: '12rem' }} body={branchBodyTemplate} filter filterElement={branchFilterTemplate} />
                    <Column header="Date" field='receivedDate' style={{ minWidth: '12rem' }} />
                    <Column field="reason" header="Reason" style={{ minWidth: '12rem' }} />
                </DataTable>
            </div>
        </>
    )
}

export default PatientsPage
