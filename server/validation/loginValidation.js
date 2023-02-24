const validate = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required().label("Email"),
        password: Joi.string().required().label("Password"),
    });
    console.log(schema.validate(data), 'ssssssss');
    return schema.validate(data);
};
