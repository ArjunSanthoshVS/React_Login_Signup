const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
        errors.firstName = "First name is required!";
    } else if (values.firstName.length > 30) {
        errors.firstName = "First name must less than 30 characters!"
    } else if (values.firstName.length < 3) {
        errors.firstName = "First name must more than 3 characters!"
    }
    if (!values.lastName) {
        errors.lastName = "Last name is required!";
    } else if (values.lastName.length > 10) {
        errors.lastName = "Last name must less than 10 characters!"
    }
    if (!values.email) {
        errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
        errors.email = "This is not a valid email format!";
    }
    if (!values.mobile) {
        errors.mobile = "Mobile number is required!"
    } else if (values.mobile.length !== 10) {
        errors.mobile = "Mobile number must be 10 digits!"
    }
    if (!values.bloodGroup) {
        errors.bloodGroup="Select your Blood group!"
    }
    if (!values.weight) {
        errors.weight="Weight is required!"
    } else if (values.weight < 45) {
        errors.weight="Weight must be more than 45kg!"
    } else if (values.weight.length > 2) {
        errors.weight = "Weight must be less than 100kg!"
    }
    if (!values.age) {
        errors.age="Age is required!"
    } else if (values.age < 18) {
        errors.age="Age must be more than 18 yrs!"
    }
    if (!values.gender) {
        errors.gender = "Gender is required!"
    }
    if (!values.district) {
        errors.district = "District is required!"
    }

    return errors;
};

module.exports = validate