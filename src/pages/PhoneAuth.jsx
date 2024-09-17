import React, { useState } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase.config';
import { toast } from 'react-toastify'; // Assuming you have toast configured

const PhoneAuth = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false); // Flag for loading state

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

  const sendOtp = async () => {
    // Ensure reCAPTCHA is set up
    setupRecaptcha();

    setIsSendingOtp(true); // Set loading state

    try {
      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier);
      setVerificationId(confirmationResult.verificationId);
      toast.success('OTP sent successfully!');
    } catch (error) {
      console.error("Error during OTP sending:", error);
      toast.error(`SMS not sent: ${error.message}`);
    } finally {
      setIsSendingOtp(false); // Reset loading state
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    const credential = window.firebase.auth.PhoneAuthProvider.credential(verificationId, otp);
    try {
      await auth.signInWithCredential(credential);
      alert('User signed in successfully'); // Replace with toast or redirect
    } catch (error) {
      toast.error('Incorrect OTP');
    }
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
        <button disabled={isSendingOtp} onClick={sendOtp}>
          {isSendingOtp ? 'Sending OTP...' : 'Send OTP'}
        </button>
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

export default PhoneAuth;