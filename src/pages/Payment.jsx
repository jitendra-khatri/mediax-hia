import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import hiaLogo from '../assets/logo.png';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";

function Payment() {
  const [responseId, setResponseId] = useState('');
  const [listingData, setListingData] = useState({})
  const navigate = useNavigate()
  useEffect(() => {
    const fetchCurrentListing = async () => {
      const auth = getAuth()
      const docRef = doc(db, 'listings', auth.currentUser.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        console.log(docSnap.data())
        setListingData(docSnap.data())
      }
    }
    fetchCurrentListing()
  }, [])
  const loadScript = (src) => {
    return new Promise((resolve) => {
      if (document.querySelector(`script[src="${src}"]`)) {
        resolve(true); // Script is already loaded
        return;
      }
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const createRazorpayOrder = (amount) => {
    const data = JSON.stringify({
      amount: amount * 100, // Convert amount to paise
      currency: 'INR',
    });

    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://localhost:5000/orders',
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    axios.request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        handleRazorpayScreen(response.data.amount);
      })
      .catch((error) => {
        console.log('Error at order creation', error);
        toast.error('Failed to create order.');
      });
  };

  const handleRazorpayScreen = async (amount) => {
    const res = await loadScript('https://checkout.razorpay.com/v1/checkout.js');
    if (!res) {
      toast.error('Failed to load Razorpay checkout.');
      return;
    }

    const options = {
      key: 'rzp_test_P2P6lF14A7MpRI',
      amount: amount,
      currency: 'INR',
      name: 'Happening In Agra',
      description: 'Payment to Happening In Agra',
      image: hiaLogo,
      handler: function (response) {
        setResponseId(response.razorpay_payment_id);
        // Send this to your backend for verification

        // Call updatePaymentStatus after successful payment
        updatePaymentStatus(response.razorpay_payment_id);
      },
      theme: {
        color: '#01b4bc',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };



  const updatePaymentStatus = async (resId) => {
    // toast.success(resId)
    try {
      const auth = getAuth()
      const docRef = doc(db, 'listings', auth.currentUser.uid)
      await updateDoc(docRef, {
        payment: true,
        paymentResponseId: resId,
      })
      toast.success('Payment successfully!');
      navigate('/')
    } catch (error) {
      toast.error('Something went wrong');
    }
  }

  return (
    <div>
      <div className="container-xxl my-5 text-center">
        <h2>Slot Number: {listingData?.slotNumber}</h2>
        <div className="final-post">
        <img src={listingData?.imageUrl} className="w-100" alt="" />
        </div>
        <button className="th-btn fill mt-5" onClick={() => createRazorpayOrder(1999)}>
          Proceed to pay Rs 1,999
        </button>
      </div>
    </div>
  );
}

export default Payment;
