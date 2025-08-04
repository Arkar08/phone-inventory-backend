import Category from "../models/categorySchema.js"
import Items from "../models/itemSchema.js"
import Purchase from "../models/purchaseSchema.js"
import Sell from "../models/sellSchema.js"


export const getStockReport = async() => {
    try {
        const date = Date.now()
        const mainDate = new Date(date)
        mainDate.setUTCHours(0,0,0,0)
        const findItem = await Items.find({}) 
        const findItemId = findItem.map((item)=> item._id)
        const findPurchase = await Purchase.find({item:findItemId,purchaseDate:mainDate})
        const findCategory = findItem.map((item) => item.category) 
        const findCategoryId = await Category.find({_id:findCategory})
        const findSale = await Sell.find({item:findItemId,sellDate:mainDate})

        const itemObject = {}
        findPurchase.forEach((purchase) => {
            if (itemObject[purchase.item]) {
                itemObject[purchase.item] += purchase.quantity;
            } else {
                itemObject[purchase.item] = purchase.quantity;
            }
        })

        const categoryObject = {}
        findCategoryId.forEach((category) => {
            return categoryObject[category._id] = category.name;
        })

        const sellObject = {}
        findSale.forEach((sell) => {
            if (sellObject[sell.item]) {
                sellObject[sell.item] += sell.quantity;
            } else {
                sellObject[sell.item] = sell.quantity;
            }
        })


        const postData = findItem.map((item) => {
            const purchaseStock = itemObject[item._id]  || 0;
            const category = categoryObject[item.category] || 'Unknown'
            const sellStock = sellObject[item._id] || 0;
            const currentStock = purchaseStock - sellStock;
            const list = {
                ...item.toObject(),
                Purchased:purchaseStock,
                category:category,
                sold:sellStock,
                currentStock:currentStock
            }
            delete list.company;
            delete list.__v;
            delete list.createdAt;
            delete list.updatedAt;
            delete list.price;
            return list;
        })

        return postData;
        
    } catch (error) {
        console.log(error, 'report db error is')
    }
}

export const getSaleReport = async() => {
    try {
        const date = Date.now()
        const mainDate = new Date(date)
        mainDate.setUTCHours(0,0,0,0)

        const findItem = await Items.find({}) 
        const findItemId = findItem.map((item)=> item._id)
        const findSale = await Sell.find({item:findItemId,sellDate:mainDate})
        const findPurchasePrice = await Purchase.find({item:findItemId,purchaseDate:mainDate})

        const sellObject = {}
        const sellPrice = {}
        findSale.forEach((sell) => {
            if (sellObject[sell.item]) {
                sellObject[sell.item] += sell.quantity;
                sellPrice[sell.item] += sell.sellPrice;
            } else {
                sellObject[sell.item] = sell.quantity;
                sellPrice[sell.item] = sell.sellPrice;
            }
        })

        const purchaseObject = {}
        findPurchasePrice.forEach((purchase)=> {
            if(purchaseObject[purchase.item]){
                return purchaseObject[purchase.item] += purchase.purchasePrice;
            }else{
                return purchaseObject[purchase.item] = purchase.purchasePrice;
            }
        })

         const postData = findItem.map((item) => {
            const sellStock = sellObject[item._id] || 0;
            const revenue = sellPrice[item._id] || 0;
            const purchasePrice = purchaseObject[item._id] || 0;
            const profit = (revenue - purchasePrice) * sellStock;
            const list = {
                ...item.toObject(),
                sold:sellStock,
                revenue:revenue,
                profit:profit
            }
            delete list.company;
            delete list.__v;
            delete list.createdAt;
            delete list.updatedAt;
            delete list.price;
            delete list.option;
            delete list.color;
            delete list.stock;
            delete list.category;
            return list;
        })

        return postData;

    } catch (error) {
       console.log(error, 'report db error is')
    }
}

export const getPurchaseReport = async() => {
    try {
        const date = Date.now()
        const mainDate = new Date(date)
        mainDate.setUTCHours(0,0,0,0)

        const findItem = await Items.find({}) 
        const findItemId = findItem.map((item)=> item._id)
        const findPurchase = await Purchase.find({item:findItemId,purchaseDate:mainDate})

        const purchaseObject = {}
        const purchasePirceObject = {}
        findPurchase.forEach((purchase) => {
            if(purchaseObject[purchase.item]){
                purchaseObject[purchase.item] += purchase.quantity
                purchasePirceObject[purchase.item] = purchase.purchasePrice
            }else{
                purchaseObject[purchase.item] = purchase.quantity
                purchasePirceObject[purchase.item] = purchase.purchasePrice
            }
        })

        const postData = findItem.map((item) => {
            const purchasePrice = purchasePirceObject[item._id] || 0;
            const purchaseQuantity = purchaseObject[item._id] || 0;
            const totalCost = purchasePrice * purchaseQuantity;
            const list = {
                ...item.toObject(),
                purchasePrice:purchasePrice,
                purchaseQuantity:purchaseQuantity,
                totalCost:totalCost
            }

            delete list.createdAt;
            delete list.category;
            delete list.updatedAt;
            delete list.stock;
            delete list.price;
            delete list.color;
            delete list.option;
            delete list.__v;
            delete list.company;
            return list;
        })
        return postData;

    } catch (error) {
        console.log(error, 'report db error is')
    }
}