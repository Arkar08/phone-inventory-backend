import { getOneItem } from "../services/itemService.js";
import { getOnePurchase, postPurchase, returnPurchase } from "../services/purchaseService.js";
import mongoose from "mongoose";

export const postPurchaseController = async(req,res) => {
    const {item,quantity,purchasePrice} = req.body;
    if(!item || !quantity || !purchasePrice){
        return res.status(404).json({
            status:404,
            message:"Please Filled Out in the form field."
        })
    }
    try {
        const data = {
            item:item,
            quantity:quantity,
            purchasePrice:purchasePrice
        }
        const findItemList = await getOneItem(data.item)
        if(findItemList){
            const postData = await postPurchase(data)
            if(postData){
                return res.status(201).json({
                    status:201,
                    message: "Purchase Item Successfully.",
                    data:postData
                })
            }
        }else{
            return res.status(400).json({
                status:400,
                message:"Item does not defined."
            })
        }
        
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getAllPurchaseController = async(req,res) => {
    try {

        const mainData = res.data.data;
        const postData = await returnPurchase(mainData)
        return res.status(200).json({
            status:200,
            message:"Fetch Purchase Item Successfully.",
            length:postData.length,
            data:postData
        })
    } catch (error) {
          return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getOnePurchaseController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({
                    status: 404,
                    message: "Invalid Purchase ID."
                });
    }
    try {
        const findOnePurchase = await getOnePurchase(id)
        if(findOnePurchase){
            return res.status(200).json({
                status:200,
                message:"Fetch One Purchase Successfully.",
                data:findOnePurchase
            })
        }else{
            return res.status(404).json({
                status:404,
                message:"Purchase Id not found."
            })
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}