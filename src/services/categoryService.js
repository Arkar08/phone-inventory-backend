import Category from "../models/categorySchema.js";



export const postCategoy = async(data) => {
    try {
        const getData = await Category.create({
            name:data.name
        })
        return getData;
    } catch (error) {
        console.log(error,'db category error is')
    }
}

export const findCategoryName = async(data) => {
    try {
        const getCategoryName = await Category.findOne({name:data.name})
        return getCategoryName;
    } catch (error) {
        console.log(error,'db category error is')
    }
}

export const getOneCategory = async(id) => {
    try {
        const getOneCategory = await Category.findById(id)
        return getOneCategory;
    } catch (error) {
        console.log(error,'db category error is')
    }
}

export const patchCategory = async(data) => {
    try {
        const patchCategory = await Category.findOneAndUpdate({_id:data.id},{name:data.name},{ new: true })
        return patchCategory;
    } catch (error) {
        console.log(error,'db category error is')
    }
}

export const deleteCategory = async(id) => {
    try {
        const deleteCategory = await Category.findOneAndDelete({_id:id},{new:true})
        return deleteCategory;
    } catch (error) {
         console.log(error,'db category error is')
    }
}