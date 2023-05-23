import { create, update } from '../Repo/flight.js'
import { find } from '../Repo/flight.js';
import { validateFlightData } from '../Middleware/validation.js';
async function addFlight(body, user) {
    try {
        if (user.role === 'admin') {
            body.admin_id = user.id
            const isExist = await find(body)
            if (isExist) {
                return { statusCode: 409, message: 'Flight Already Exist' };
            }
            const flight = await create(body)
            return { statusCode: 201, message: 'Flight Added Successfully' };
        }
        return { statusCode: 403, message: 'You are not authorized' }
    } catch (error) {
        throw new Error(error.message)
    }
}

async function findFlight(body) {
    try {
        const flight = await find(body)
        if (!flight) {
            return { statusCode: 404, errMessage: 'Record does not exist' }
        }
        return { statusCode: 200, recrod: flight }

    } catch (error) {
        throw new Error(error.message)

    }

}

async function updateFlight(body, user) {
    try {
        if (user.role === 'admin') {
            const isExist = await find(body)
            if (!isExist) {
                return { statusCode: 404, errMessage: 'Flight does not exist' }
            }
            const flight = await update(body)
            return { statusCode: 201, message: 'Flight Record Updated Successfully' };
        }
        return { statusCode: 403, message: 'You are not authorized' }
    } catch (error) {
        throw new Error(error.message)
    }
}

export { addFlight, updateFlight, findFlight }