import mongoose from "mongoose";

const purchaseSchema = mongoose.Schema({
    item:{
        type:mongoose.Schema.Types.ObjectId,
        refs:"Items",
        required:true
    },
    quantity:{
        type:Number,
        required:true
    },
    purchasePrice:{
        type:Number,
        required:true
    },
    purchaseDate:{
        type:Date
    }
},{timestamps:true})


const Purchase = mongoose.model('Purchase',purchaseSchema)

export default Purchase;