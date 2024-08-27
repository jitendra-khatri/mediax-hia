const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const Razorpay = require('razorpay')
require('dotenv').config(); // Ensure you have dotenv configured


const app = express();
const port = 5000;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())

app.get('/', (req, res) => {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

app.post('/orders', async (req, res) => {
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    const options = {
        amount: req.body.amount,
        currency: req.body.currency,
        receipt: 'receipt#1',
        payment_capture: 1
    }

    try {
        const response = await razorpay.orders.create(options)
        res.json({
            order_id: response.id,
            currency: response.currency,
            amount: response.amount
        })
    } catch (error) {
        res.status(500).send('Internal Server error')
    }
})

app.get('/payment/:paymentId', async (req, res) => {
    const { paymentId } = req.params;
    const razorpay = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
    })

    try {
        const payment = await razorpay.payments.fetch(paymentId)
        if (!payment) {
            return res.status(500).json('Error at razorpay loading')
        }
        res.json({
            status: payment.status,
            method: payment.method,
            amount: payment.amount,
            currency: payment.currency
        })

    } catch (error) {
        res.status(500).json('failed to fetch')
    }
})