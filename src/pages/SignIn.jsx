import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'
import googleImg from '../assets/google.png'
import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import OAuth from "../component/OAuth"
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid'
import { doc, setDoc } from "firebase/firestore"
import { db } from "../firebase.config"
import Spinner from "../component/Spinner"
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import TextField from '@mui/material/TextField';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from '../firebase.config';

function SignIn() {
       const [phone, setPhone] = useState('');
       const [user, setUser] = useState(null);
       const [otp, setOtp] = useState('');
       const [otpLoading, setOtpLoading] = useState(false)
       const [loading, setLoading] = useState(false)
       const [passToggle, setPassToggle] = useState(false)
       const navigate = useNavigate()
       const passToggleHandler = () => {
              setPassToggle((prev) => !prev)
       }

       const [formData, setFormData] = useState({
              email: '',
              password: ''
       })
       const { email, password } = formData

       const onChangeHandler = (e) => {
              setFormData((prevStat) => ({
                     ...prevStat,
                     [e.target.id]: e.target.value,
              }))
       }
       const onSubmitHandler = async (e) => {
              setLoading(true)
              e.preventDefault()
              try {
                     // const auth = getAuth()
                     const userCredential = await signInWithEmailAndPassword(auth, email, password)
                     if (userCredential.user) {
                            const blobUrl = localStorage.getItem('imageBlobUrl');

                            if (!blobUrl) {
                                   console.error('No image found in localStorage');
                                   return;
                            }

                            // Fetch the Blob from the Blob URL
                            fetch(blobUrl)
                                   .then(res => res.blob())
                                   .then(blob => {
                                          const file = new File([blob], 'post.jpg', { type: 'image/jpeg' });

                                          const storage = getStorage();
                                          const imageRef = ref(storage, `images/${uuidv4()}.jpg`);
                                          uploadBytes(imageRef, file).then(() => {
                                                 getDownloadURL(imageRef).then(async (url) => {
                                                        try {
                                                               const auth = getAuth();
                                                               if (!auth.currentUser) {
                                                                      throw new Error("User not authenticated");
                                                               }

                                                               const listingData = {
                                                                      listingCreated: true,
                                                                      userId: auth.currentUser.uid,
                                                                      name: auth.currentUser.displayName,
                                                                      gmail: auth.currentUser.email,
                                                                      dateOfPosting: '',
                                                                      postStatus: false,
                                                                      slotNumber: 0,
                                                                      payment: false,
                                                                      imageUrl: url,
                                                                      paymentResponseId: 'No Id Yet',
                                                               };

                                                               const docRef = doc(db, "listings", auth.currentUser.uid);
                                                               await setDoc(docRef, listingData);
                                                               console.log("Document written with ID: ", auth.currentUser.uid);
                                                               navigate('/pick-date');
                                                        } catch (error) {
                                                               console.error("Error adding document: ", error);
                                                               toast.error('Error creating listing: ' + error.message);
                                                        }
                                                 }).catch((error) => {
                                                        console.error('Error getting download URL:', error);
                                                        toast.error('Error getting download URL: ' + error.message);
                                                 });
                                          }).catch((error) => {
                                                 console.log('Error uploading file:', error);
                                                 toast.error('Error uploading file:', error.message);
                                          });
                                   })
                                   .catch(error => {
                                          console.error('Error retrieving Blob from URL:', error);
                                   });
                     }
              } catch (error) {
                     toast.error('Bad User Credential');
                     setLoading(false)
              }
       }
       const generateRecaptcha = () => {
              window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha', {
                  'size': 'invisible',
                  'callback': (response) => {
                      // reCAPTCHA solved, allow signInWithPhoneNumber.
                  }
              });
          }
      
          const sendOtp = async () => {
              setOtpLoading(true)
              if (phone.length >= 10) {
                  generateRecaptcha();
                  let appVerifier = window.recaptchaVerifier;
                  let num = '+91' + phone;
                  signInWithPhoneNumber(auth, num, appVerifier)
                      .then((confirmationResult) => {
                          window.confirmationResult = confirmationResult;
                          setUser(confirmationResult);
                          toast.success("OTP has been sent!");
                      }).catch((error) => {
                          console.log(error);
                          toast.error("Error sending OTP: " + error.message);
                      });
              }
          }
      
      
          const verifyOtp = () => {
              if (otp.length === 6) {
                  window.confirmationResult.confirm(otp).then((result) => {
                      // User signed in successfully.
                      const user = result.user;
                      console.log(user);
                      alert("User is verified!");
                  }).catch((error) => {
                      console.log(error);
                      alert("Error verifying OTP: " + error.message);
                  });
              }
          }
       return (
              <>
                     <Spinner clsName={loading ? 'd-flex' : 'd-none'} />
                     <div id="login">
                            <section className="login">
                                   <div className="row">
                                          <div className="col-md-5 d-none d-md-block p-0">
                                                 <div className="lo-box left">
                                                        <div className="lo-img">
                                                               <img src={Logo} alt="" className="w-100" />
                                                        </div>
                                                 </div>
                                          </div>
                                          <div className="col-md-7 p-0">
                                                 <div className="lo-box right">
                                                        <div className="lo-text">
                                                               <h3>Welcome to <br /> Happening In Agra</h3>
                                                               <OAuth img={googleImg} />
                                                               <p className="or-t">Or</p>
                                                               <h4>Enter your
                                                                      Phone Number</h4>
                                                               <div className="mt-4">
                                                                      {/* <PhoneInput
                                                                             country={'in'}
                                                                             value={phone}
                                                                             className="form-control"
                                                                             onChange={(phone) => setPhone(phone)}
                                                                      /> */}
                                                                      <input type="number" className="form-control" value={phone} placeholder="Enter Your number" onChange={(phone) => setPhone(phone.target.value)} />
                                                                      <div id="recaptcha"></div>
                                                                      <button type="submit" className="th-btn mt-3 fill w-100" onClick={sendOtp}>
                                                                             {otpLoading ? 'Send Code...' : 'Send Code'}
                                                                      </button>

                                                               </div>
                                                               {/* <form onSubmit={onSubmitHandler}>
                                                                      <div className="mb-3">
                                                                             <input type="email" className="form-control" id="email" value={email} placeholder="Email" onChange={onChangeHandler} />
                                                                      </div>
                                                                      <div className="mb-3 pass-container">
                                                                             <input type={passToggle ? 'text' : 'password'} className="form-control" id="password" value={password} placeholder="Password" onChange={onChangeHandler} />
                                                                             <i className={passToggle ? 'far fa-eye-slash' : 'far fa-eye'} onClick={passToggleHandler}></i>
                                                                      </div>
                                                                      <div className="forgot-pass">
                                                                             <Link to="/forgot-password">Forgot password?</Link>
                                                                      </div>
                                                                      <button type="submit" className="th-btn fill w-100">Sign in</button>
                                                               </form> */}

                                                               {/* <div className="dont-have">
                                                                      <p className="m-0">Don't have an account? <Link to="/sign-up" className="text-primary">Sign up</Link></p>
                                                                      <div className="terms">
                                                                             By signing in you accept the.
                                                                             <Link to='/terms-of-services'>
                                                                                    Terms of Services
                                                                             </Link>
                                                                             <span> and </span>
                                                                             <Link to='/privacy-policy'>
                                                                                    Privacy Policy
                                                                             </Link>.
                                                                      </div>
                                                               </div> */}
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                            </section>
                     </div>
              </>
       )
}

export default SignIn