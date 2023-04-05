import * as Yup from 'yup'

export const branchSchema = Yup.object().shape({
    district: Yup.string().required('District is required'),
    branch: Yup.string().required('Branch is required'),
    address: Yup.string().required('Address is required'),
    phone: Yup.string()
        .required('Phone is required')
        .matches(/^[0-9]{10}$/, 'Phone must be a 10-digit number'),
});
