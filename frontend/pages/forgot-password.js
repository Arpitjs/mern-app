import { useState } from "react"
import axios from 'axios'
import { toast } from 'react-toastify'
import AuthForm from '../components/Forms/AuthForm'
import { useRouter } from 'next/router'

const forgotPassword = () => {
    let router = useRouter()

    let [email, setEmail] = useState('')
    let [secret, setSecret] = useState('')
    let [submitting, setSubmitting] = useState(false)

    let forgotPassword = (e) => {
        setSubmitting(true)
        e.preventDefault()
        axios.post(`auth/forgotPassword`, { email, secret })
        .then(({ data }) => {
            setSubmitting(false)
            router.push(`/reset-password/${data.data}`)
        })
        .catch((error) => {
            setSubmitting(false)
            toast.error(error.response.data.err.msg)
        })
    }
    
    return (
        <div>
            <AuthForm
            email={email}
            secret={secret}
            setEmail={setEmail}
            setSecret={setSecret}
            forgotPassword={forgotPassword}
            submitting={submitting}
            page="forgot"

            />
        </div>
    )
}

export default forgotPassword
