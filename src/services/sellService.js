import Items from "../models/itemSchema.js";
import Sell from "../models/sellSchema.js";

export const postSell = async(data) => {
    try {
        const findItem = await Items.findById(data.item)

        if(findItem.stock >= data.quantity && findItem.price <= data.sellPrice && findItem.stock !== 0){
            
            await Items.findOneAndUpdate({_id:data.item},{stock:findItem.stock - data.quantity},{new :true})
            const postData = await Sell.create({
                item:data.item,
                quantity:data.quantity,
                sellPrice:data.sellPrice
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