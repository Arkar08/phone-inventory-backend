import Items from "../models/itemSchema.js";
import Sell from "../models/sellSchema.js";

export const postSell = async(data) => {
    try {

        const date = new Date()
        date.setUTCHours(0,0,0,0)
        const findItem = await Items.findById(data.item)

        if(findItem.stock >= data.quantity && findItem.price <= data.sellPrice && findItem.stock !== 0){
            
            await Items.findOneAndUpdate({_id:data.item},{stock:findItem.stock - data.quantity},{new :true})
            const postData = await Sell.create({
                item:data.item,
                quantity:data.quantity,
                sellPrice:data.sellPrice,
                sellDate:date
            })
            return postData;
        }else{
            return null;
        }
    } catch (error) {
        console.log(error, 'Sell db error is')
    }
}

export const getOneSell = async(id) => {
    try {
        const getSell = await Sell.findById(id)
        return getSell;
    } catch (error) {
        console.log(error, 'Sell db error is')
    }
}

export const returnSell = async(data) => {
    try {
       const findItem = data.map((sell)=> sell.item) 
       const item = await Items.find({_id:findItem})

        const itemObject = {};
        const colorObject = {};
        const optionObject = {};
        item.forEach((items)=>{
            itemObject[items._id] = items.itemName
            colorObject[items._id] = items.color
            optionObject[items._id] = items.option
        })

        const postData = data.map((sell)=>{
            const itemName = itemObject[sell.item] || 'Unknown';
            const colorName = colorObject[sell.item] || '_';
            const optionName = optionObject[sell.item] || '_';
            const list = {
                ...sell.toObject(),
                item:itemName,
                color:colorName,
                option:optionName
            }
            delete list.__v;
            delete list.createdAt;
            delete list.updatedAt;
            return list;
        })
        return postData;

    } catch (error) {
        console.log(error, 'Sell db error is')
    }
}