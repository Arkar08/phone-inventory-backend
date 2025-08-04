export const loginController = async(req,res) => {
    const {email,password} = req.body;
   
    try {
         
        if(!email || !password){
            return res.status(404).json({
                status:404,
                message:"Please Filled Out in the form field."
            })
        }

        if(email !== 'admin@gmail.com'){
            return res.status(400).json({
                status:400,
                message:"Email is wrong."
            })
        }

        if(password !== 'admin123'){
            return res.status(400).json({
                status:400,
                message:"Password is wrong."
            })
        }

        if(email === 'admin@gmail.com' && password === 'admin123'){
            return res.status(200).json({
                status:200,
                message:"Login Successfully."
            })
        }
    } catch (error) {
        return res.status(500).json({
            status:500,
            message:error.message
        })
    }
}