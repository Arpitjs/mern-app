import Link from 'next/link'
import { UserContext } from '../context'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'

const Nav = () => {

    let [current, setCurrent] = useState('')
    let [state, setState] = useContext(UserContext)

    useEffect(() => {
        process.browser && setCurrent(window.location.pathname)
    }, [process.browser && window.location.pathname])

    let router = useRouter()
    let logout = () => {
        localStorage.removeItem('auth')
        setState(null)
        router.push('/Login')
    }
    return (
        <nav className="nav bg-dark d-flex justify-content-end">
            <Link href="/" >
                <a className={`nav-link text-light ${current === '/' && 'active'}`}>Home</a>
            </Link>

            {state ?
                <>
            <div className="dropdown">
                <a className="btn dropdown-toggle text-light"
              role="button" 
                 id="dropdownMenuLink" 
                 data-bs-toggle="dropdown" aria-expanded="false">
                 { state && state.user && state.user.name}
                </a>
                <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                    <li>
                    <Link href="/user/dashboard">
                        <a
                            className={`nav-link dropdown-item ${current === '/user/dashboard' && 'active'}`}>
                            Dashboard
                        </a>
                    </Link>
                        </li>
                        <li>
                    <Link href="/user/profile/update">
                        <a
                            className={`nav-link dropdown-item ${current === '/user/profile/update' && 'active'}`}>
                            Profile
                        </a>
                    </Link>
                        </li>
                    <li>
                    <a className="nav-link dropdown-item" onClick={logout}>Logout</a>
                        </li>
                </ul>
            </div>
                </>
                :
                <>
                    <Link href="/Login">
                        <a className={`nav-link text-light ${current === '/Login' && 'active'}`}>Login</a>
                    </Link>

                    <Link href="/Register">
                        <a className={`nav-link text-light ${current === '/Register' && 'active'}`}>Register</a>
                    </Link>
                </>
            }
        </nav>

    )
}

export default Nav
