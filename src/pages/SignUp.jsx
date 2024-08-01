import { Link, useNavigate } from "react-router-dom"
import Logo from '../assets/logo.png'
import googleImg from '../assets/google.png'
import { useState } from "react"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth"
import { db } from '../firebase.config'
import { serverTimestamp, setDoc, doc } from "firebase/firestore"
import { toast } from "react-toastify"
import OAuth from "../component/OAuth"

function SignUp() {
  const [passToggle, setPassToggle] = useState(false)
  const navigate = useNavigate()
  const passToggleHandler = () => {
    setPassToggle((prev) => !prev)
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  })
  const { name, email, password } = formData

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
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const formDataCopy = { ...formData }
      delete formDataCopy.password
      formDataCopy.timeStamp = serverTimestamp()
      formDataCopy.admin = false

      await setDoc(doc(db, 'users', user.uid), formDataCopy)
      navigate('/sign-in')
    } catch (error) {
      toast.error('Something went wrong');
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
                <form onSubmit={onSubmitHandler} method="post">
                  <div className="mb-3">
                    <input type="text" className="form-control" id="name" value={name} placeholder="Name" onChange={onChangeHandler} />
                  </div>
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
                  <button type="submit" className="th-btn fill w-100">Sign Up</button>
                </form>

                <div className="dont-have">
                  <p className="m-0">Already have an account? <Link to="/sign-in">Sign In</Link></p>
                  <div className="terms">
                    By signing in you accept the.
                    <Link to='/terms-of-services' target="_blank">
                      Terms of Services
                    </Link> and
                    <Link to='/privacy-policy' target="_blank">
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

export default SignUp