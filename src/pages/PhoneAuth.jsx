import React, { useState, useEffect } from 'react'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import {  RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { toast } from 'react-toastify'
import { auth } from '../firebase.config'
function PhoneAuth() {
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [user, setUser] = useState(null)
  const [recaptchaVerifier, setRecaptchaVerifier] = useState(null)

  useEffect(() => {
    if (!recaptchaVerifier) {
      const recaptcha = new RecaptchaVerifier('recaptcha', {
        size: 'invisible', // Or 'normal'
        callback: (response) => {
          console.log('reCAPTCHA solved');
        },
      }, auth);
  
      // Disable app verification for testing (for development only)
      auth.settings.appVerificationDisabledForTesting = true;
  
      recaptcha.verify().then(() => {
        console.log('reCAPTCHA verified');
      }).catch((error) => {
        console.error('reCAPTCHA error', error);
      });
  
      setRecaptchaVerifier(recaptcha);
    }
  }, [auth, recaptchaVerifier]);
  
  

  const sendOtp = async () => {
    try {
      if (!phone) {
        toast.error('Please enter a valid phone number')
        return
      }

      const number = `+${phone}` // Format phone number with country code

      // Send OTP to the phone number
      const confirmation = await signInWithPhoneNumber(auth, number, recaptchaVerifier)
      setUser(confirmation)
      toast.success('OTP sent successfully')
    } catch (error) {
      toast.error(error.message || 'Failed to send OTP')
    }
  }

  const verifyOtp = async () => {
    try {
      if (!user) {
        toast.error('OTP has not been sent yet')
        return
      }
      if (!otp) {
        toast.error('Please enter OTP')
        return
      }

      const result = await user.confirm(otp)
      console.log(result)
      toast.success('Phone number verified successfully')
    } catch (error) {
      toast.error('Failed to verify OTP')
    }
  }

  return (
    <div className='d-flex flex-column justify-content-center align-items-center'>
      <div className="py-5 text-center">
        <PhoneInput country={"in"} value={phone} onChange={setPhone} />
        <button onClick={sendOtp} className='btn btn-primary mt-3'>Send OTP</button>
        <div id="recaptcha"></div>
      </div>
      <div className="py-5 text-center">
        <input type="text" className='form-control' value={otp} onChange={(e)=>setOtp(e.target.value)} />
        <button className='btn btn-primary mt-3'>Send OTP</button>
      </div>
    </div>
  )
}

export default PhoneAuth
