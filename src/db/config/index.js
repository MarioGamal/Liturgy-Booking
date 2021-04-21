import mongoose from 'mongoose';

const connectDb = () => {
    return mongoose.connect(process.env.MONGODB_URI || process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
        retryWrites: false
    });
};
export default connectDb;
