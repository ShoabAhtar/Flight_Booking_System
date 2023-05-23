import mongoose from 'mongoose';

// const { MONGO_URI } = process.env;
mongoose.set('strictQuery', true)

const connect = () => {
    mongoose
        .connect('mongodb://localhost/Flight')
        .then(() => {
            console.log('database connected successfully');
        })
        .catch((error) => {
            console.log(error.message);
        });
};

export { connect }