import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    flightNumber: {
        type: String,
        ref: 'Flight'
    },
    passportNumber: {
        type: String,
        ref: 'Passenger'
    },
    canceled: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

export const Booking = mongoose.model('bookings', bookingSchema);