import { getOneItem } from "../services/itemService.js";
import { getOneSell, postSell, returnSell } from "../services/sellService.js";
import mongoose from "mongoose";

export const postSellController = async (req, res) => {
  const { item, quantity, sellPrice } = req.body;
  if (!item || !quantity || !sellPrice) {
    return res.status(404).json({
      status: 404,
      message: "Please Filled Out in the form field.",
    });
  }
  try {
    const data = {
      item: item,
      quantity: quantity,
      sellPrice: sellPrice,
    };
    const findItemList = await getOneItem(data.item);
    if (findItemList) {
      const postData = await postSell(data);
      if (postData) {
        return res.status(201).json({
          status: 201,
          message: "sell Item Successfully.",
          data: postData,
        });
      } else {
        return res.status(400).json({
          status: 400,
          message: "Item is not available stock.",
        });
      }
    } else {
      return res.status(400).json({
        status: 400,
        message: "Item does not defined.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      message: error.message,
    });
  }
};


export const getAllSellController = async(req,res) => {
    try {

        const mainData = res.data.data;
        const postData = await returnSell(mainData)
        return res.status(200).json({
            status:200,
            message:"Fetch Sell Item Successfully.",
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

export const getOneSellController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(404).json({
                    status: 404,
                    message: "Invalid Sell ID."
                });
    }
    try {
        const findOneSell = await getOneSell(id)
        if(findOneSell){
            return res.status(200).json({
                status:200,
                message:"Fetch One Sell Successfully.",
                data:findOneSell
            })
        }else{
            return res.status(404).json({
                status:404,
                message:"Sell Id not found."
            })
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}