import Items from "../models/itemSchema.js";
import Purchase from "../models/purchaseSchema.js";



export const postPurchase = async(data) => {
    try {
        const date = new Date()
        date.setUTCHours(0,0,0,0)
        const findItem = await Items.findById(data.item)

        await Items.findOneAndUpdate({_id:data.item},{stock:findItem.stock+data.quantity},{new :true})
        const postData = await Purchase.create({
            item:data.item,
            quantity:data.quantity,
            purchasePrice:data.purchasePrice,
            purchaseDate:date
        })
        return postData;
    } catch (error) {
        console.log(error, 'purchase db error is')
    }
}

export const getOnePurchase = async(id) => {
    try {
        const getPurchase = await Purchase.findById(id)
        return getPurchase;
    } catch (error) {
        console.log(error, 'purchase db error is')
    }
}