import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify';

const PhoneSignIn = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');

  // Initialize reCAPTCHA
  const setupRecaptcha = () => {
    if (window.recaptchaVerifier) {
      return; // reCAPTCHA is already set up
    }
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'visible',
      'callback': (response) => {
        // reCAPTCHA solved, allow sign in with phone number
        sendOtp();
      }
    });
  };
  const sendOtp = () => {
    // Ensure reCAPTCHA is set up
    setupRecaptcha();
    
    // Example Indian phone number
    const phoneNumber = "+916396303582"; // Replace with the actual phone number
    
    // Log appVerifier to ensure it's initialized
    const appVerifier = window.recaptchaVerifier;
    console.log("appVerifier:", appVerifier);
  
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // Successfully sent OTP
        setVerificationId(confirmationResult.verificationId);
        alert('OTP sent successfully!');
      })
      .catch((error) => {
        // Detailed error logging
        console.error("Error during OTP sending:", error);
        toast.error(`SMS not sent: ${error.message}`);
      });
  };
  

  // Verify OTP
  const verifyOtp = () => {
    const credential = window.firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    auth.signInWithCredential(credential)
      .then((result) => {
        alert('User signed in successfully');
      })
      .catch((error) => {
        alert('Incorrect OTP');
      });
  };

  return (
    <div>
      <h2>Sign In with Phone</h2>
      <div>
        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Enter phone number"
        />
        <button onClick={sendOtp}>Send OTP</button>
      </div>

      <div id="recaptcha-container"></div>

      {verificationId && (
        <div>
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
          <button onClick={verifyOtp}>Verify OTP</button>
        </div>
      )}
    </div>
  );
};

export default PhoneSignIn;
