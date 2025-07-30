import { findCompanyName, getOneCompany, postCompany,patchOneCompany,deleteOneCompany } from "../services/companyService.js";
import mongoose from "mongoose";

export const postCompanyController = async(req,res) => {
    const {name} = req.body;
    if(!name){
        return res.status(404).json({
            status:404,
            message:"Please Filled Out in the form field."
        })
    }
    try {
        const postData = {
                name:name
            }
            const getName = await findCompanyName(postData)
            if(!getName){
                const data = await postCompany(postData)
                if(data){
                    return res.status(201).json({
                        status:201,
                        message:"Create Company Successfully.",
                        data:data
                    })
                }
            }else{
                return res.status(400).json({
                    status:400,
                    message:"Company is already exist.",
                })
            }
        } catch (error) {
            return res.status(500).json({
                status:500,
                message:error.message
            })
        }
}

export const getCompanyController = async(req,res) => {
    try {
        return res.status(200).json({
            status:200,
            message:"Fetch Company Successfully.",
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

export const getOneCompanyController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: "Invalid Company ID."
        });
    }
    try {
        const findOneCompany = await getOneCompany(id)
        if (!findOneCompany) {
            return res.status(404).json({
                status: 404,
                message: "Company not found."
            });
        }else{
            return res.status(200).json({
                status: 200,
                message:"Fetch One Company",
                data: findOneCompany
            });
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const updateCompanyController = async(req,res) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: "Invalid Company ID."
        });
    }
    if(!name){
        return res.status(404).json({
            status:404,
            message:"Please Filled Out in the form field."
        })
    }
    try {
        const pastData = {
            id:id,
            name:name
        }
        const findData = await findCompanyName(pastData)
        if(!findData){
            const updateData = await patchOneCompany(pastData)
            if(updateData){
                return res.status(200).json({
                    status:200,
                    message:'Update Company Successfully.',
                    data:updateData
                })
            }else{
                return res.status(400).json({
                    status:400,
                    message:"Update Company Error"
                })
            }
        }else{
             return res.status(400).json({
                status:400,
                message:"Company cannot update and then already exist..",
            })
        }
        
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const deleteCompanyController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: "Invalid category ID."
        });
    }
    try {
        const category = await deleteOneCompany(id)
        if(category){
            return res.status(200).json({
                status:200,
                message:"Delete Company Successfully."
            })
        }else{
             return res.status(404).json({
                status:404,
                message:"Company not found."
            })
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}