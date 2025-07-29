export const generatePagination  = (model) => {
    return async(req,res,next) => {
        const page = parseInt(req.query.page);
        const limit = parseInt(req.query.limit);

        let data = {}
        const startIndex = (page - 1)* limit;
        const endIndex  = page * limit;
        data.data = await model.find().limit(limit).skip(startIndex).exec()
        res.data = data;
        next()
    }
}