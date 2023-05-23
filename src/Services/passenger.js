import { create, find } from '../Repo/passenger.js'
import { validatePassengerData } from '../Middleware/validation.js';
async function createPassenger(body) {
    try {

        const isExist = await find(body)
        if (isExist) {
            return { statusCode: 409, message: 'Passenger Already Exist' };
        }

        const passenger = await create(body)
        return { statusCode: 201, message: 'Passenger Added Successfully' };

    } catch (error) {
        throw new Error(error.message)
    }
}

export { createPassenger }