import express, { response } from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';

import { addFlight, updateFlight, findFlight } from '../Services/flight.js';

const BASE_URL = 'https://mocki.io/v1/bfa06788-1b30-415c-a845-761e21568d0e';

async function searchFlights(req, res) {
    try {
        const { origin, destination, date } = req.query;

        const response = await axios.get(BASE_URL, {
            params: {
                origin,
                destination,
                date
            },
        });

        const flights = response.data;
        const flightData = [];

        flights.data.forEach((flight) => {
            flight.legs.forEach((leg) => {
                const currentFlight = {
                    flightNo: leg.carriers[0].alt_id + leg.carriers[0].id,
                    origin: leg.origin.name,
                    destination: leg.destination.name,
                    arrival: leg.arrival,
                    departure: leg.departure,
                    duration: leg.duration,
                    price: {
                        amount: flight.price.amount,
                        currency: "USD"
                    }
                };

                flightData.push(currentFlight);
            });
        });


        const filteredFlights = flightData.filter((flight) => {
            const date1 = new Date(flight.departure);
            const date2 = new Date(date);
            const same = date1.getTime() === date2.getTime();

            if (same && flight.origin === origin && flight.destination === destination) {
                return true;

            }
            return false;

        });

        filteredFlights.forEach(function (document) {
            delete document.duration;// did not delete origin and destination coz it can confuse a user while looking at the response which origin and destination he has choosen

        })
        res.json(filteredFlights);

    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'An error occurred while processing your request' });
    }
};

async function addFlightRecord(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const flight = await addFlight(body, user)
        return res.status(flight.statusCode).json({ response: flight.message });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

async function findFlightRecord(req, res) {
    try {
        const { body } = req
        const flight = await findFlight(body)
        return res.status(flight.statusCode).json({ error: flight.errMessage, flight: flight.recrod })
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
}

async function updateFlightRecord(req, res) {
    try {
        const { user } = req;
        const { body } = req;
        const flight = await updateFlight(body, user)
        return res.status(flight.statusCode).json({ response: flight.message, error: flight.errMessage });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};


export { searchFlights, addFlightRecord, updateFlightRecord, findFlightRecord }