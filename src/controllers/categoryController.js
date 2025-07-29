import mongoose from "mongoose";
import { deleteCategory, findCategoryName, getCategory, getOneCategory, patchCategory, postCategoy } from "../services/categoryService.js"

export const postCategoryController = (async (req,res) =>{
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
        const getName = await findCategoryName(postData)
        if(!getName){
            const data = await postCategoy(postData)
            if(data){
                return res.status(201).json({
                    status:201,
                    message:"Create Category Successfully.",
                    data:data
                })
            }
        }else{
            return res.status(400).json({
                status:400,
                message:"Category is already exist.",
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
})

export const getCategoryController = async(req,res) => {
    try {
        const findCategory = await getCategory()
        return res.status(200).json({
            status:200,
            message:"Fetch Category Successfully.",
            length:findCategory.length,
            data:findCategory
        })
    } catch (error) {
          return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getOneCategoryController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: "Invalid category ID."
        });
    }
    try {
        const findOneCategory = await getOneCategory(id)
        if (!findOneCategory) {
            return res.status(404).json({
                status: 404,
                message: "Category not found."
            });
        }else{
            return res.status(200).json({
                status: 200,
                message:"Fetch One Category",
                data: findOneCategory
            });
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const updateCategoryController = async(req,res) => {
    const {id} = req.params;
    const {name} = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: "Invalid category ID."
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
        const findData = await findCategoryName(pastData)
        if(!findData){
            const updateData = await patchCategory(pastData)
            if(updateData){
                return res.status(200).json({
                    status:200,
                    message:'Update Category Successfully.',
                    data:updateData
                })
            }else{
                return res.status(400).json({
                    status:400,
                    message:"Update Category Error"
                })
            }
        }else{
             return res.status(400).json({
                status:400,
                message:"Category cannot update and then already exist..",
            })
        }
        
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const deleteCategoryController = async(req,res) => {
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({
            status: 404,
            message: "Invalid category ID."
        });
    }
    try {
        const category = await deleteCategory(id)
        if(category){
            return res.status(200).json({
                status:200,
                message:"Delete Category Successfully."
            })
        }else{
             return res.status(404).json({
                status:404,
                message:"Category not found."
            })
        }
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}