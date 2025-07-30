import Company from '../models/companySchema.js'


export const postCompany = async(data) => {
    try {
        const getData = await Company.create({
            name:data.name
        })
        return getData;
    } catch (error) {
        console.log(error,'db Company error is')
    }
}

export const findCompanyName = async(data) => {
    try {
        const getCompanyName = await Company.findOne({name:data.name})
        return getCompanyName;
    } catch (error) {
        console.log(error,'db Company error is')
    }
}

export const getOneCompany = async(id) => {
    try {
        const getCompany = await Company.findById(id)
        return getCompany;
    } catch (error) {
        console.log(error,'db Company error is')
    }
}

export const patchOneCompany = async(data) => {
    try {
        const patchCompany = await Company.findOneAndUpdate({_id:data.id},{name:data.name},{ new: true })
        return patchCompany;
    } catch (error) {
        console.log(error,'db Company error is')
    }
}

export const deleteOneCompany = async(id) => {
    try {
        const deleteCompany = await Company.findOneAndDelete({_id:id},{new:true})
        return deleteCompany;
    } catch (error) {
         console.log(error,'db Company error is')
    }
}