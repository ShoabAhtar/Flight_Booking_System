import express from 'express';
import bodyParser from 'body-parser';

import { userRegistation, userLogin, userLogout } from '../controller/user.js';
import { verifyToken } from '../Middleware/auth.js'
import { searchFlights } from '../controller/flights.js';
import { bookFlight, myBookedFlights, cancelMyFlight } from '../controller/booking.js'
import { addPassenger } from '../controller/passenger.js'
import { addFlightRecord, updateFlightRecord, findFlightRecord } from '../controller/flights.js';
import {
    validateUserData, validateBookingData, validateFlightData, validatePassengerData
} from '../Middleware/validation.js';


const router = express.Router();

router.post('/register', validateUserData, userRegistation)
router.post('/login', userLogin)
router.get('/logout', verifyToken, userLogout)
router.get('/search_flights', searchFlights)
router.post('/book_flight', validateBookingData, bookFlight)
router.post('/view_my_flights', myBookedFlights)
router.post('/cancel_my_flights', cancelMyFlight)
router.post('/add_passenger', validatePassengerData, addPassenger)
router.post('/add_flight', verifyToken, validateFlightData, addFlightRecord)
router.post('/find_flight', findFlightRecord)
router.put('/update_flight', verifyToken, updateFlightRecord)



export { router };
