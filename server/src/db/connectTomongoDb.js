import mongoose from "mongoose"

const connectDB = async() => {
    try {
        const connectionInstance= await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log(`\n MongoDB connected`);
    } catch (error) {
        console.log("MongoDb connection failed ", error)
        process.exit(1);
    }
}
export default connectDB