
import { Flight } from '../Model/flight.js'

let create = async (body) => {
    const flight = await Flight.create(body)
    return flight;
};
let find = async (body) => {
    const { flightNumber, departure } = body
    const flight = await Flight.aggregate([
        { $match: { flightNumber: flightNumber } },
        { $limit: 1 },
        { $project: { __v: 0 } }
    ])
    return flight[0]
}
let update = async (body) => {
    const { flightNumber } = body
    const flight = await Flight.findOneAndUpdate({ flightNumber }, body, { new: true });
    return flight

}


export { create, update, find };
