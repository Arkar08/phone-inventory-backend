import mongoose from "mongoose";

const itemSchema = mongoose.Schema({
    itemName:{
        type:String,
        required:true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    company:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    stock:{
        type:Number,
    },
    color:{
        type:String,
        required:true
    },
    option:{
        type:String,
        required:true
    }
},{timestamps:true})


const Items = mongoose.model('Items',itemSchema)

export default Items;