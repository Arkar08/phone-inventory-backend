import { getPurchaseReport, getSaleReport, getStockReport } from "../services/reportService.js"

export const getStockReportController = async(req,res) => {
    try {
        const item = await getStockReport()
        return res.status(200).json({
            message:"Fetch Stock Report Successfully.",
            length:item.length,
            data:item
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getSaleReportController = async(req,res) => {
    try {
        const saleItem = await getSaleReport()
        return res.status(200).json({
            message:"Fetch Sale Report Successfully.",
            length:saleItem.length,
            data:saleItem
        })
    } catch (error) {
         return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}

export const getPurchaseReportController = async(req,res) => {
    try {
        const purchaseItem = await getPurchaseReport()
        return res.status(200).json({
            message:"Fetch Purchase Report Successfully.",
            length:purchaseItem.length,
            data:purchaseItem
        })
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}