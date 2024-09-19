import React, { useState } from 'react';
import OtpInput from 'otp-input-react'
import {signInWithPhoneNumber, RecaptchaVerifier } from "firebase/auth";
import LoaderWhite from '../assets/loader-white.gif'
import PhoneInput from 'react-phone-input-2';
import { auth } from '../firebase.config'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify';
const PhoneAuth = () => {
  const [otp, setOtp] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [showOtp, setShowOtp] = useState(false)

  function onCaptchVerify() {
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
        }
      }, auth);
    }
  }
  function onSignInSubmit() {
    setLoading(true)
    onCaptchVerify()
    const appVerifier = window.recaptchaVerifier;
    const formatPh = '+'+phone
    signInWithPhoneNumber(auth, formatPh, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setLoading(false)
        setShowOtp(true)
        toast.success('OTP sended successfully!')
      }).catch((error) => {
       console.log(error)
       setLoading(false)
      });
  }
  function onOTPVerify(){
    setLoading(true)
    window.confirmationResult.confirm(otp).then(async (res)=>{
      console.log(res)
      setLoading(false)
    })
    .className((err)=>{
      console.log(err)
      setLoading(false)
    })
  }
  return (
    <>
      <div id="recaptcha-container"></div>
      {
        showOtp ? (
          <div className="d-flex flex-column gap-3 align-items-center">
            <h4 className='text-center'>Enter Your OTP</h4>
            <OtpInput
              value={otp}
              onChange={setOtp}
              OTPLength={6}
              otpType='number'
              disabled={false}
              autoFocus
            ></OtpInput>
            <div className="verify-btn d-flex justify-content-center gap-2">
              {
                loading && (
                  <div>
                    <img src={LoaderWhite} alt="" className="w-100" />
                  </div>
                )
              }
              <button onClick={onOTPVerify}>Verify OTP</button>
            </div>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3 align-items-center justify-content-center text-center">
            <h4 className='text-center'>Verify your phone number</h4>
            <PhoneInput country={'in'} value={phone} onChange={setPhone} classNam="mx-auto" />
            <div className="verify-btn d-flex justify-content-center gap-2">
              {
                loading && (
                  <div>
                    <img src={LoaderWhite} alt="" className="w-100" />
                  </div>
                )
              }
              <button className="" onClick={onSignInSubmit}>Send OTP</button>
            </div>
          </div>
        )
      }

    </>
  );
};

export default PhoneAuth;