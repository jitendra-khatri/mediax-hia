import axios from "axios";
import React from "react";
import { useState } from "react";


function Payment() {
  const [responseId, setResponseId] = useState('');
  const [responseState, setResponseState] = useState([]);

  const loadScript = (src) => {
    return new Promise((resolve)=>{
      const script = document.createElement('script');

      script.src = src;

      script.onload = () => {
        resolve(true)
      }

      script.onerror=()=>{
        resolve(false)
      }

      document.body.appendChild(script)
    })
  }


  const createRazorpayOrder = (amount) => {
    let data = JSON.stringify({
      amount: amount * 100,
      currency: "INR"
    })
    console.log(data)

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/orders",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    }

    axios.request(config)
    .then((response)=> {
      console.log(JSON.stringify(response.data))
      handleRazorpayScreen(response.data.amount)
    })
    .catch((error)=>{
      console.log('error at', error)
    })

    const handleRazorpayScreen = async(amount) => {
      const res = await loadScript('http://checkout.razorpay.com/v1/checkout.js');
      if(!res){
        alert("Some error at razorpay screen loading");
        return;
      }

      const options = {
        key: 'rzp_test_P2P6lF14A7MpRI',
        amount: amount,
        currency: 'INR',
        name: 'HIA',
        description: 'payment to HIA',
        image:"http://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg",
        handler: function(response){
          setResponseId(response.razorpay_payment_id)
        },
        prefill: {
          name: "Happening In Agra",
          email: "hello@mediax.co.in"
        },
        theme:{
          color: "#1EAEBD"
        }
      }

      const paymentObject = new window.Razorpay(options)
      paymentObject.open()
  }
}



  const paymentFetch = (e) => {
    e.preventDefault();

    const paymentId = e.target.paymentId.value;

    axios.get(`http://localhost:5000/payment/${paymentId}`)
    .then((response)=>{
      console.log(response.data);
      setResponseState(response.data)
    })
    .catch((error)=>{
      console.log("error occures", error)
    })
  }



  return (
    <div>
      Payment
      <button onClick={()=> createRazorpayOrder(50)} > Payment of 100 Rs.</button>
      {responseId && <p>{responseId}</p>}
      <h1> This is payment verification form </h1>
      <form onSubmit={paymentFetch}>
        <input type="text" name="paymentId" />
        <button type="submit">Fetch Payment</button>
        { responseState.length !==0 && (
          <ul>
            <li>Amount: {responseState.amount / 100} Rs. </li>
            <li> Currency: {responseState.currency}</li>
            <li>Status: {responseState.status}</li>
            <li>Method: {responseState.method}</li>
          </ul>
        )}
      </form>
    </div>
  )
}

export default Payment
