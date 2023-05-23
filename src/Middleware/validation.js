
import mongoose from 'mongoose';
import Joi from 'joi'

const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Please provide User Name',
        'string.base': 'Please provide a valid user name',
    }),
    email: Joi.string().email().required().messages({
        'any.required': 'Please Provide Email Address',
        'string.email': 'Please Provide a valid Email',
    }),
    password: Joi.string().min(6).required().messages({
        'any.required': 'Please provide your password',
        'string.min': 'Password cannot be less than 6 characters',
    }),
    role: Joi.string().default('user')
});

function validateUserData(req, res, next) {
    const { error, value } = userSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        const errorObject = { Error: errors };
        return res.status(422).json(errorObject);
    }

    req.body = value;
    next();
}


const passengerSchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required': 'Please provide User Name',
        'string.base': 'Please provide a valid user name',
    }),
    phoneNumber: Joi.string().pattern(/^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/).required().messages({
        'any.required': 'Please provide Phone Number',
        'string.pattern.base': 'Please provide a valid phone number',
    }),
    DOB: Joi.date().max('now').required().messages({
        'any.required': 'Please provide Date of Birth',
        'date.base': 'Please provide a valid date of birth',
        'date.max': 'Please provide a valid date of birth',
    }),
    passportNumber: Joi.string().pattern(/^[A-Z]{1}[0-9]{7}$/).required().messages({
        'any.required': 'Please provide Passport Number',
        'string.pattern.base': 'Please provide a valid passport number',
    }),
    address: Joi.string().required().messages({
        'any.required': 'Please provide Address',
        'string.base': 'Please provide a valid address',
    }),
});

function validatePassengerData(req, res, next) {
    const { error, value } = passengerSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).json(errors);
    }

    req.body = value;
    next();
}
const flightSchema = Joi.object({
    flightNumber: Joi.string().pattern(/^[A-Z]{2,3}\d{1,4}[A-Z]?$/).required().messages({
        'any.required': 'Please provide flight number',
        'string.pattern.base': 'Please provide a valid flight number',
    }),

    origin: Joi.string().required().messages({
        'any.required': 'Please provide origin airport of the flight',
        'string.base': 'Please provide a valid origin airport of the flight',
    }),
    destination: Joi.string().required().messages({
        'any.required': 'Please provide destination airport of the flight',
        'string.base': 'Please provide a valid destination airport of the flight',
    }),
    departure: Joi.date().min('now').required().messages({
        'any.required': 'Please provide a departure date',
        'date.base': 'Please provide a valid departure date',
        'date.min': 'Please provide an upcoming date',
    }),
    arrival: Joi.date().min(Joi.ref('departure')).required().messages({
        'any.required': 'Please provide an arrival date',
        'date.base': 'Please provide a valid arrival date',
        'date.min': 'Cannot travel to past',
    }),
    durationInHours: Joi.number().max(4320).required().messages({
        'number.max': 'Please check the departure and arrival date',
    }),
    priceInDollars: Joi.number().required().messages({
        'any.required': 'Please provide a valid price',
        'number.base': 'Please provide a valid price',
    }),
})

function validateFlightData(req, res, next) {
    const arrival = Date.parse(req.body.arrival) / 1000;
    const departure = Date.parse(req.body.departure) / 1000;
    req.body.durationInHours = (arrival - departure) / 60 / 60
    const user = req.user
    const { error, value } = flightSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).json(errors);
    }
    req.body = value;
    next();
}


const bookingSchema = Joi.object({
    flightNumber: Joi.string().required().messages({
        'any.required': 'Please provide flight number',
        'string.base': 'Please provide a valid flight number',
    }),
    user: Joi.string().required().messages({
        'any.required': 'Please provide user ID',
        'string.base': 'Please provide a valid user ID',
    }),
    passportNumber: Joi.string().required().messages({
        'any.required': 'Please provide passport number',
        'string.base': 'Please provide a valid passport number',
    }),
});

function validateBookingData(req, res, next) {
    const { error, value } = bookingSchema.validate(req.body, { abortEarly: false });

    if (error) {
        const errors = error.details.map((detail) => detail.message);
        return res.status(422).json(errors);
    }

    req.body = value;
    next();
}



export { validateUserData, validatePassengerData, validateFlightData, validateBookingData }