import mongoose from "mongoose"

const connectToDb = async() => {
    try {
         await mongoose.connect(process.env.MONGO_URL)
         console.log('mongoose is connected.')
    } catch (error) {
        console.log('mongoose is not connected.')
        process.env.exit(1)
    }
}

export default connectToDb;