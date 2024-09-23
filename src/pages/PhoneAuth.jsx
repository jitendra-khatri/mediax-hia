import React, { useState } from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextField from '@mui/material/TextField';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase.config';

function PhoneSign() {
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState('');

    const sendOtp = async () => {
        try {
            // Initialize RecaptchaVerifier
            window.recaptchaVerifier = new RecaptchaVerifier(auth,'recaptcha', {
                'size': 'invisible', // Can use 'normal' to make it visible
                'callback': (response) => {
                    console.log('Recaptcha solved:', response);
                    sendOtp();
                }
            });

            const appVerifier = window.recaptchaVerifier;
            const mob = "+"+phone
            const confirmation = await signInWithPhoneNumber(auth, mob, appVerifier);
            
            alert('OTP sent successfully!');
            setUser(confirmation);
            console.log('Confirmation result:', confirmation);
        } catch (error) {
            console.log('Error sending OTP:', error);
        }
    };

    const verifyOtp = async () => {
        try {
            const result = await user.confirm(otp);
            console.log('OTP verified successfully:', result);
            alert('OTP verified successfully!');
            setOtp('');
        } catch (error) {
            console.log('Error verifying OTP:', error);
            alert('Error verifying OTP');
        }
    };

    return (
        <>
            <div className="number-container">
                <div className="nuco-box">
                    <PhoneInput
                        country={'in'}
                        value={phone}
                        onChange={(phone) => setPhone(phone)}
                    />
                    <button onClick={sendOtp}>Send OTP</button>
                    <div id='recaptcha'></div>
                </div>
                <br />
                <br />
                <br />
                <div className="nuco-box">
                    <TextField
                        id="outlined-basic"
                        label="Enter OTP"
                        variant="outlined"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                    />
                    <button onClick={verifyOtp}>Verify OTP</button>
                </div>
            </div>
        </>
    );
}

export default PhoneSign;
