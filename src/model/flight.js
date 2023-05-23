import mongoose from 'mongoose';
const flightSchema = new mongoose.Schema({
    flightNumber: {
        type: String,
        required: true,
    },
    admin_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    origin: {
        type: String,
        required: true,

    },
    destination:
    {
        type: String,
        required: true,
    },
    departure: {
        type: Date,
        required: true,
    },
    arrival: {
        type: Date,
        required: true,
    },
    durationInHours: {
        type: Number,
    },
    priceInDollars: {
        type: Number,
        required: true
    }

});
// flightSchema.index({ flightNumber: 1, departure: 1 }, { unique: true });
export const Flight = mongoose.model('flights', flightSchema);
