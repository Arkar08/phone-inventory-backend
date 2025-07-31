import mongoose from "mongoose";
import { getOneCategory } from "../services/categoryService.js";
import { getOneCompany } from "../services/companyService.js";
import { deleteOneItem, findItemName, getOneItem, postItems, updateOneItem } from "../services/itemService.js";

export const postItemController = async(req,res) => {
    const {itemName,category,company,price,color,option} = req.body;
    if(!itemName || !category || !company || !price || !color || !option){
        return res.status(404).json({
            status:404,
            message:"Please Filled Out in the form field."
        })
    }
    try {
        const data = {
            itemName:itemName,
            category:category,
            company:company,
            price:price,
            color:color,
            option:option
        }
        const findItem = await findItemName(data)
        if(findItem){
            return res.status(400).json({
                status:400,
                message:"Item is already exist."
            })
        }
        const findCategory = await getOneCategory(data.category)
        const findCompany = await getOneCompany(data.company)
        if(!findItem && findCategory && findCompany){
            const postData = await postItems(data)
            if(postData){
                return res.status(201).json({
                    status:201,
                    message:"Create Item Successfully.",
                    data:postData
                })
            }
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getItemController = async(req,res) => {
    try {
        return res.status(200).json({
            status:200,
            message:"Fetch Item Successfully.",
            length:res.data.data.length,
            data:res.data.data
        })
    } catch (error) {
          return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getOneItemController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: "Invalid Item ID."
            });
    }
    try {
        const findOneItem = await getOneItem(id)
       if (!findOneItem) {
            return res.status(404).json({
                status: 404,
                message: "Item not found."
            });
        }else{
            return res.status(200).json({
                status: 200,
                message:"Fetch One Item",
                data: findOneItem
            });
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const updateItemController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: "Invalid Item ID."
            });
    }
    const {price} = req.body;
    if(!price){
        return res.status(404).json({
            status:404,
            message:"Please Filled Out in the form field."
        })
    }
    try {
        const data = {
            id:id,
            price:price
        }
        const updateItem = await updateOneItem(data)
        if(updateItem){
            return res.status(200).json({
                status:200,
                message:"Update Item Price Successfully.",
                data:updateItem
            })
        }else{
            return res.status(400).json({
                    status:400,
                    message:"Update Item Error"
            }) 
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const deleteItemController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                status: 404,
                message: "Invalid Item ID."
            });
    }
    try {
        const deleteList = await deleteOneItem(id)
        if(deleteList){
            return res.status(200).json({
                status:200,
                message:"Delete Item Successfully."
            })
        }else{
             return res.status(404).json({
                status:404,
                message:"Item not found."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}