import Items from "../models/itemSchema.js"

export const findItemName = async(data) => {
    try {
        const findName = await Items.findOne({itemName:data.itemName})
        return findName;
    } catch (error) {
        console.log(error,'db item error is')
    }
}

export const postItems = async(data) => {
    try {
        const postData = await Items.create({
            itemName:data.itemName,
            company:data.company,
            category:data.category,
            price:data.price,
            color:data.color,
            option:data.option
        })
        return postData;
    } catch (error) {
         console.log(error,'db item error is')
    }
}

export const getOneItem = async(id) => {
    try {
        const getItem = await Items.findById(id)
        return getItem;
    } catch (error) {
        console.log(error,'db item error is')
    }
}

export const updateOneItem = async(data) => {
    try {
        const updateItem  = await Items.findOneAndUpdate({_id:data.id},{price:data.price}, {new :true})
        return updateItem;
    } catch (error) {
        console.log(error,'db item error is')
    }
}

export const deleteOneItem = async(id) => {
    try {
        const deleteItem = await Items.findOneAndDelete({_id:id})
        return deleteItem;
    } catch (error) {
        console.log(error,'db item error is')
    }
}