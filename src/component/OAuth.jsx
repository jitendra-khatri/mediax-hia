import { useLocation, useNavigate } from "react-router-dom"
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
function OAuth({ img }) {

    const navigate = useNavigate()
    const location = useLocation()

    const onGoogleClick = async () => {
        try {
            const auth = getAuth()
            const provider = new GoogleAuthProvider()
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            //check for user
            const docRef = doc(db, 'users', user.uid)
            const docSnap = await getDoc(docRef)

            // If User, dosen't exits, create user
            if (!docSnap.exists()) {
                await setDoc(doc(db, 'users', user.uid), {
                    name: user.displayName,
                    email: user.email,
                    timestamp: serverTimestamp(),
                    admin: false
                })
            }
            else{
                toast.error('User already exists')
            }
            navigate('/')
        } catch (error) {
            toast.error('Somthing went wrong')
        }
    }
    return (
        <div className="th-btn  fill w-100 d-flex gap-2 justify-content-center align-items-center" onClick={onGoogleClick}>
            <span>Sign {location.pathname === '/sign-in' ? 'In' : 'Up'} with</span>
            <span> <img src={img} className="w-100" alt="goodle img" /> </span>
        </div>
    )
}

export default OAuth
