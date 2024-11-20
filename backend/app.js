const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const {
    Cashfree
} = require('cashfree-pg');


require('dotenv').config();

const app = express();

const corsOptions = {
    origin: ['https://happening-in-agra.vercel.app', 'https://happeninginagra.com', 'https://mediax-hia.vercel.app', 'https://mediax-hia-backend.vercel.app:8000', 'https://mediax-hia-backend.vercel.app'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));



Cashfree.XClientId = process.env.CLIENT_ID;
Cashfree.XClientSecret = process.env.CLIENT_SECRET;
Cashfree.XEnvironment = Cashfree.Environment.PRODUCTION;
// Cashfree.XEnvironment = Cashfree.Environment.SANDBOX;


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


app.get('/payment', (req, res) => {

    try {

        let request = {
            "order_amount": 1999,
            "order_currency": "INR",
            "order_id": generateOrderId(),
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

app.listen(8000, () => {
    console.log('Server is running on port 8000');
})
