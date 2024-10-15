const express = require('express')
const cors = require('cors')
const crypto = require('crypto')
const {Cashfree} = require('cashfree-pg')
require('dotenv').config(); // Ensure you have dotenv configured


const app = express();
const port = 5000;

// app.use(bodyParser.json())
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


function generateOrderId() {
    const uniqueId = crypto.randomBytes(16).toString('hex');

    const hash = crypto.createHash('sha256');
    hash.update(uniqueId);

    const orderId = hash.digest('hex');

    return orderId.substr(0, 12);
}


app.get('/', (req, res) => {
    res.send('Hello World!');
})


app.get('/payment', async (req, res) => {

    try {

        let request = {
            "order_amount": 1999,
            "order_currency": "INR",
            "order_id": await generateOrderId(),
            "customer_details": {
                "customer_id": "webcodder01",
                "customer_phone": "9999999999",
                "customer_name": "Web Codder",
                "customer_email": "webcodder@example.com"
            },
        }

        Cashfree.PGCreateOrder("2023-08-01", request).then(response => {
            console.log(response.data);
            res.json(response.data);

        }).catch(error => {
            console.error(error.response.data.message);
        })


    } catch (error) {
        console.log(error);
    }


})

app.post('/verify', async (req, res) => {

    try {

        let {
            orderId
        } = req.body;

        Cashfree.PGOrderFetchPayments("2023-08-01", orderId).then((response) => {

            res.json(response.data);
        }).catch(error => {
            console.error(error.response.data.message);
        })


    } catch (error) {
        console.log(error);
    }
})

app.listen(port, () => {
    console.log(`server is running on ${port}`)
})

/* app.post('/orders', async (req, res) => {
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
}) */