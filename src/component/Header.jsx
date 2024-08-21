import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Header() {
    const [user, setUser] = useState(null)
    const auth = getAuth()
    const navigate = useNavigate()
    useEffect(() => {
        // console.log(auth.currentUser)
        setUser(auth.currentUser)
    }, [])
    const logoutHandler = () => {
        auth.signOut()
        navigate('/sign-in')
    }
    return (

        <header id="header" className='p-4'>
            {/* <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                        <h3 className='m-0'>{user.displayName}</h3> 
                        <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                    </div> */}
            <div className="">
                <div className=""> {user ? (<>

                    <div className="d-flex w-100 gap-3 justify-content-between align-items-center">
                        <h3 className='m-0'><Link to='/admin/dashboard'>{user.displayName}</Link></h3>
                        <div className="btn btn-danger" onClick={logoutHandler}>Sign Out</div>
                    </div>
                </>) : (<Link to='/sign-in' className='btn btn-primary'>Sign In</Link>)}</div>
            </div>
        </header>
    )
}

export default Header
