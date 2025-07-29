import express from 'express'
import dotenv from 'dotenv';
import categoryRoute from './routes/categoryRoute.js';
import companyRoute from './routes/companyRoute.js';
import itemRoute from './routes/itemRoute.js';
import purchaseRoute from './routes/purchaseRoute.js';
import sellRoute from './routes/sellRoute.js';
import authRoute from './routes/authRoute.js';

dotenv.config();

const app = express()
app.use(express.json())

app.get('/',(req,res) => {
    return res.status(200).json('Hello World.')
})

//routes
app.use('/api/v1/auth',authRoute)
app.use('/api/v1/category',categoryRoute)
app.use('/api/v1/company',companyRoute)
app.use('/api/v1/items',itemRoute)
app.use('/api/v1/purchase',purchaseRoute)
app.use('/api/v1/sell',sellRoute)

export default app;