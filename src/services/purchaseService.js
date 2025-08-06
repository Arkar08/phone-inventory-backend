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

export const returnPurchase = async(data) => {
    try {
        const findItem = data.map((purchase)=>purchase.item)
        const item = await Items.find({_id:findItem})


        const itemObject = {};
        const colorObject = {};
        const optionObject = {};
        item.forEach((items)=>{
            itemObject[items._id] = items.itemName
            colorObject[items._id] = items.color
            optionObject[items._id] = items.option
        })

        const postData = data.map((purchase)=>{
            const itemName = itemObject[purchase.item] || 'Unknown';
            const colorName = colorObject[purchase.item] || '_';
            const optionName = optionObject[purchase.item] || '_';
            const list = {
                ...purchase.toObject(),
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
        console.log(error, 'purchase db error is')
    }
}