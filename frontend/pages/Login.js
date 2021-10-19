import { useState, useContext } from 'react'
import axios from 'axios'
import AuthForm from '../components/Forms/AuthForm'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { UserContext } from '../context/'

const Login = () => {
    let [name, setName] = useState('')
    let [password, setPassword] = useState('')
    let [submitting, setSubmitting] = useState(false)
    let [state, setState] = useContext(UserContext)
    let router = useRouter()

    let submitLogin = e => {
        e.preventDefault()
        setSubmitting(true)
        axios.post(`auth/login`, { name, password })
            .then(({ data }) => {
                setSubmitting(false)
                //update context
                setState({ user: data.user, token: data.token })
                //set in local storage
                localStorage.setItem('auth', JSON.stringify(data))
                router.push('/')
            })
            .catch(err => {
                // console.log(err.response)
                setSubmitting(false)
                toast.error(err.response.data.err.msg)
            })
    }
    if(state && state.token) router.push('/')
    return (
        <div className="container-fluid">
            <div className="row py-5 bg-secondary text-light">
                <div className="col text-center">
                    <h1>Login</h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                    <AuthForm
                        name={name}
                        setName={setName}
                        password={password}
                        setPassword={setPassword}
                        submitLogin={submitLogin}
                        submitting={submitting}
                        page='login'
                    />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">Not registered yet?
                        <Link href="/Register">
                            <a> Register</a>
                        </Link>
                    </p>
                </div>
            </div>
            <div className="row">
                <div className="col">
                <p className="text-center">
                        <Link href="/forgot-password">
                            <a className="text-danger"> Forgot Password</a>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
