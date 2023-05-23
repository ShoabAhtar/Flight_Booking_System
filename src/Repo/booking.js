import { Booking } from '../Model/booking.js';
import { Flight } from '../Model/flight.js'

let create = async (body) => {
    const booking = await Booking.create(body)
    return booking;
};
let find = async (body) => {
    const { passportNumber } = body
    const booking = await Booking.aggregate([
        { $match: { passportNumber: passportNumber, canceled: false } },
        { $project: { __v: 0, canceled: 0 } }
    ])
    return booking

}

let cancel = async (body) => {
    const { passportNumber } = body
    const booking = await Booking.findOneAndUpdate(
        { passportNumber, canceled: false }, { $set: { canceled: true } }
    )
    return booking
}

export { create, find, cancel };
