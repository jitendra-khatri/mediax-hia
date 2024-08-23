const express = require('express');
const Razorpay = require('razorpay');
const cors = require('cors');
const axios = require("axios");




const app = express();
const port = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(cors());

app.get('/', (req, res) => {
    res.send("Hello World!")
})



// To generate the payment
app.post('/orders', async(req,res)=> {
    const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    })

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: 'receipt#1',
        payment_capture: 1
    }

    try{
        const response = await razorpay.orders.create(options);

        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error){
        res.status(500).send(`Internal server error: ${error}`)
    }

})

// to fetch the payment


app.get("/payment/:paymentId", async(req, res)=>{
    const {paymentId} = req.params;

    const razorpay = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET
    })

    try {
        const payment = await razorpay.payments.fetch(paymentId);

        if(!payment){
            return res.status(500).json("Error at razorpay loading")
        }

        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })
    }
    catch(error){
        res.status(500).send(`Internal server error: ${error}`)
    }
} )




app.listen(port, ()=> {
    console.log(`Server is running at ${port}`)
})

