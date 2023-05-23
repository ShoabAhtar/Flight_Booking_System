import mongoose from 'mongoose';
const passengerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    phoneNo: {
        type: String,

    },
    DOB:
    {
        type: Date,
        required: true,
    },
    passportNumber:
    {
        type: String,
        required: true,
        unique: [true, 'This passport already exist']
    },
    address:
    {
        type: String,
        required: true,
    }


});
export const Passenger = mongoose.model('passengers', passengerSchema);
