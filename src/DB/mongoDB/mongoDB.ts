import mongoose from 'mongoose';

async function connectMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI as string);
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}

export { connectMongoDB };
