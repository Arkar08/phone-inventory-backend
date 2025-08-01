import mongoose from "mongoose";

const sellSchema = mongoose.Schema({
    item:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Items",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    sellPrice:{
        type:Number,
        required:true
    },
    sellDate:{
        type:Date,
        default:Date.now()
    }
},{timestamps:true})


const Sell = mongoose.model('Sell',sellSchema)

export default Sell;