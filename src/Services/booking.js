import { create, find, cancel } from '../Repo/booking.js'
import { validateBookingData } from '../Middleware/validation.js';
async function createBooking(body) {
    try {

        const booking = await create(body)
        return { statusCode: 201, message: 'Flight Booked Successfully' };

    } catch (error) {
        throw new Error(error.message)
    }
}
async function findBooking(body) {
    try {
        const booking = await find(body)
        return booking

    } catch (error) {
        throw new Error(error.message)
    }
}
async function cancelBooking(body) {
    try {
        const booking = await cancel(body)
        if (booking) {
            return { statusCode: 201, message: 'Flight canceled Successfully' };
        }
        return { statusCode: 404, message: 'Flight not found' };

    } catch (error) {
        throw new Error(error.message)
    }
}
export { createBooking, findBooking, cancelBooking }