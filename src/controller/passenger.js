import express from 'express'
import bodyParser from 'body-parser';

import { createPassenger } from '../Services/passenger.js';

async function addPassenger(req, res) {
    try {
        console.log("here in controllers")
        const { body } = req;
        const passenger = await createPassenger(body)
        return res.status(passenger.statusCode).json({ response: passenger.message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

export { addPassenger }