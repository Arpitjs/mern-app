import { useState, useContext } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import { Modal } from 'antd'
import Link from "next/link"
import AuthForm from '../components/Forms/AuthForm'
import { UserContext } from "../context"
import { useRouter } from 'next/router'

const Register = () => {
    let [name, setName] = useState('')
    let [email, setEmail] = useState('')
    let [password, setPassword] = useState('')
    let [secret, setSecret] = useState('')
    let [submitting, setSubmitting] = useState(false)
    let [ok, setOk] = useState(false)
    let [state] = useContext(UserContext)
    let router = useRouter()
    
    let submitRegister = e => {
        e.preventDefault()
        setSubmitting(true)
        axios.post(`auth/register`, { name, email, password, secret })
            .then(({ data }) => {
                console.log(data)
                setSubmitting(false)
                setName('')
                setEmail('')
                setPassword('')
                setSecret('')
                setOk(true)
            })
            .catch(err => {
                setSubmitting(false)
                toast.error(err.response.data.err.msg)
            })
    }
    if(state && state.token) router.push('/')
    return (
        <div className="container-fluid">
            <div className="row py-5 text-light bg-default-image">
                <div className="col text-center">
                    <h1>Register</h1>
                </div>
            </div>
            <div className="row py-5">
                <div className="col-md-6 offset-md-3">
                   <AuthForm 
                   submitRegister={submitRegister}
                   name={name}
                   setName={setName}
                   email={email}
                   setEmail={setEmail}
                   password={password}
                   setPassword={setPassword}
                   secret={secret}
                   setSecret={setSecret}
                   submitting={submitting}
                   page="register"
                   />
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <Modal
                        title="Congrats!" visible={ok} onCancel={() => setOk(false)}
                        footer={null}>
                        <p>you have successfully registered.</p>
                        <Link href="/Login">
                            <a className="btn btn-primary btn-sm">Login</a>
                        </Link>
                    </Modal>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <p className="text-center">Already register? 
                    <Link href="/Login">
                            <a> Login</a>
                        </Link>
                    </p>
                    </div>
                </div>
        </div>
    )
}

export default Register
