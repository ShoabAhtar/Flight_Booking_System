import { Passenger } from '../Model/passenger.js';

let create = async (body) => {
    const passenger = await Passenger.create(body);
    return passenger;
};

let find = async (body) => {
    const { passportNumber } = body
    const passenger = await Passenger.findOne({ passportNumber })
    return passenger
}
export { create, find };
