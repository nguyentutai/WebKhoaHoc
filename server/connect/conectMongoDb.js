import mongoose from "mongoose";
import dotenv from "dotenv";
const connect = async () => {
    try {
        await mongoose.connect(dotenv.config().parsed.DB_URL);
        console.log('Connect MongoDb Successfully');
    } catch (error) {
        console.log('Connect MongoDb False', error);
    }
}

export default connect;