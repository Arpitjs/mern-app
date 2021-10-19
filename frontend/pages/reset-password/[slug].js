import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/router'
import axios from 'axios'

let forgotPassword = () => {
    let router = useRouter()
    let [newPassword, setNewPassword] = useState('')
    let [confirmNewPassword, setConfirmNewPassword] = useState('')
    let [submitting, setSubmitting] = useState(false)

    let resetPassword = (e) => {
        setSubmitting(true)
        e.preventDefault()
        axios.post(`auth/resetPassword`, { newPassword, confirmNewPassword, id: router.query.slug })
        .then(() => {
            setSubmitting(false)
            toast.success('your password is changed')
            router.push('/Login')
        })
        .catch(err => {
            // console.log(err)
            setSubmitting(false)
            toast.error(err.response.data.err.msg)
        })
    }
    return (
        <>
            <div className="form-group p-2">
                <small><label className="text-muted">New Password</label> </small>
                <input type="password" className="form-control" value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    placeholder="enter new password"></input>
            </div>

            <div className="form-group p-2">
                <small><label className="text-muted">Confirm New Password</label> </small>
                <input type="password" className="form-control" value={confirmNewPassword} 
                    onChange={e => setConfirmNewPassword(e.target.value)}
                    placeholder="enter password"></input>
            </div>
            <div className="form-group p-2">
                {!submitting ? <button onClick={resetPassword}
                    className="btn btn-primary col-12">Reset</button> : <button className="btn btn-primary col-12">Resetting...</button>}
            </div>
        </>
    )
}

export default forgotPassword