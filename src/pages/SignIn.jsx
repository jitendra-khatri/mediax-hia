import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'
import googleImg from '../assets/google.png'
import { useState } from "react"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { toast } from "react-toastify"
import OAuth from "../component/OAuth"

function SignIn() {
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
              e.preventDefault()
              try {
                     const auth = getAuth()
                     const userCredential = await signInWithEmailAndPassword(auth, email, password)
                     if (userCredential.user) {
                            navigate('/')
                     }
              } catch (error) {
                     toast.error('Bad User Credential');
              }
       }
       return (
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
                                                        <OAuth img={googleImg}/>
                                                        <p className="or-t">Or</p>
                                                        <form onSubmit={onSubmitHandler}>
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
                                                        </form>

                                                        <div className="dont-have">
                                                               <p className="m-0">Don't have an account? <Link to="/sign-up">Sign up</Link></p>
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
                                                        </div>
                                                 </div>
                                          </div>
                                   </div>
                            </div>
                     </section>
              </div>
       )
}

export default SignIn