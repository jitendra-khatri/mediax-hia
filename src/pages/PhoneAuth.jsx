import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import TextField from '@mui/material/TextField';
import { useState } from 'react';
// import { RecaptchaVerifier } from 'firebase/auth/web-extension';
import { auth } from '../firebase.config'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
function PhoneSign() {
    const [phone, setPhone] = useState('');
    const [user, setUser] = useState(null);
    const [otp, setOtp] = useState('');
    const sendOtp = async () => {
        try {
            const recaptcha = new RecaptchaVerifier(auth, "recaptcha", {})
            const confirmation = await signInWithPhoneNumber(auth, phone, recaptcha)
            alert('otp send')
            setUser(confirmation)
            console.log(confirmation)

        } catch (error) {
            console.log(error)
        }
    }
    const verifyOtp = async () => {
        try {
            const result = await user.confirm(otp);
            console.log("OTP verified successfully:", result);
            alert("OTP verified successfully!");
            setOtp('');
        } catch (error) {

        }
    }
    return (
        <>
            <div className="number-container">
                <div className="nuco-box">
                    <PhoneInput country={'in'} value={phone} onChange={(phone) => setPhone('+' + phone)} />
                    <button onClick={sendOtp}>Verify Number</button>
                    <div id='recaptcha'></div>
                </div>
                <br />
                <br />
                <br />
                <div className="nuco-box">
                    <TextField id="outlined-basic" label="Outlined" variant="outlined" onChange={(e) => setOtp(e.target.value)} />
                    <button onClick={verifyOtp}>Verify Number</button>
                </div>
            </div>
        </>
    )
}

export default PhoneSign