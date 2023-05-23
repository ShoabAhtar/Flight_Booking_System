import express from 'express';
import bodyParser from 'body-parser';

import { createBooking, findBooking, cancelBooking } from '../Services/booking.js';

async function bookFlight(req, res) {
    try {
        const { body } = req;
        const booking = await createBooking(body)
        return res.status(booking.statusCode).json({ response: booking.message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

async function myBookedFlights(req, res) {
    try {
        const { body } = req;
        const booking = await findBooking(body)
        return res.status(200).json(booking)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};
async function cancelMyFlight(req, res) {
    try {
        const { body } = req;
        const booking = await cancelBooking(body)
        return res.status(booking.statusCode).json({ response: booking.message });
        // return res.status(200).json(booking)
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export { bookFlight, myBookedFlights, cancelMyFlight };
