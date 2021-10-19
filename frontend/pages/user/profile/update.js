import AuthForm from '../../../components/Forms/AuthForm'
import { toast } from 'react-toastify'
import { useState, useContext } from "react"
import { UserContext } from '../../../context'
import axios from 'axios'
import { Avatar } from "antd"
import { CameraOutlined, LoadingOutlined } from '@ant-design/icons'

let updateProfile = () => {
    let [state, setState] = useContext(UserContext)
    let [name, setName] = useState('')
    let [username, setUsername] = useState('')
    let [email, setEmail] = useState('')
    let [secret, setSecret] = useState('')
    let [submitting, setSubmitting] = useState(false)
    let [about, setAbout] = useState('')
    let [image, setImage] = useState({})

    function update(e) {
        e.preventDefault()
        setSubmitting(true)
        axios.patch(`users/profile-update`, { 
            name, email, username, about, secret, image
        })
            .then(({ data }) => {
                setSubmitting(false)
               let auth = JSON.parse(localStorage.getItem('auth'))
               auth.user = data.updatedUser
               localStorage.setItem('auth', JSON.stringify(auth))
                setState({ ...state, user: data.updatedUser })
                toast.success('profile updated!')
            })
            .catch(err => {
                setSubmitting(false)
                // console.log(err)
                toast.error(err.response.data.err.msg)
            })
    }

    let handleImage = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        let image = e.target.files[0]
        let formData = new FormData()
        formData.append('image', image)
        try {
          let { data } = await axios.post('users/upload-image', formData)
          setSubmitting(false)
          setImage({ url: data.url, public_id: data.public_id })
        } catch (e) {
          setSubmitting(false)
          console.log(e)
        }
      }

    return (
        <>
        <label className="d-flex justify-content-center h5">
        { image && image.url ? <Avatar src={image.url} size={30}/> : 
        submitting ? <LoadingOutlined/> : <CameraOutlined className="mt-2"/>}
           <input type="file" accept="images/*" hidden onChange={handleImage} />
        </label>
        <AuthForm 
        name={name}
        setName={setName}
        email={email}
        setEmail={setEmail}
        secret={secret}
        setSecret={setSecret}
        submitting={submitting}
        update={update}
        username={username}
        about={about}
        setUsername={setUsername}
        setAbout={setAbout}
        profileUpdate={true}
        />
        </>
    )
}

export default updateProfile