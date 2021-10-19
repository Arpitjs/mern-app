import { useRouter } from "next/router"
import {  useState, useEffect, useContext } from "react"
import axios from 'axios'
import CreatePostForm from '../../../components/Forms/CreatePostForm'
import { UserContext } from "../../../context/index"
import AuthRoute from '../../../components/routes/AuthRoute'
import { toast } from 'react-toastify'

const EditPost = () => {
    let router = useRouter()
    let [post, setPost] = useState({})
    const [state, setState] = useContext(UserContext)
    let [content, setContent] = useState('')
    let [image, setImage] = useState({})
    let [submitting, setSubmitting] = useState(false)
    let [loading, setLoading] = useState(false)
  
    let id = router.query._id
    useEffect(async () => {
        try {
            let { data } = await axios.get(`posts/user-post/${id}`)
            setPost(data.post)
            setContent(data.post.content)
            setImage(data.post.image)
        } catch (err) {
            console.log(err)
        }
    },[state && state.token, id])

    let postSubmit = async (e) => {
        e.preventDefault()
        setSubmitting(true)
        try {
          await axios.patch(`posts/edit-post/${id}`, { content, image })
          setSubmitting(false)
          setContent()
          toast.success('post updated!')
          router.push('/user/dashboard')
        } catch (err) {
          setSubmitting(false)
          toast.error(err.response.data.err.msg)
        }
      }

      let handleImage = async (e) => {
        setLoading(true)
        let image = e.target.files[0]
        let formData = new FormData()
        formData.append('image', image)
        try {
          let { data } = await axios.post('posts/upload-image', formData)
          setSubmitting(false)
          setImage({ url: data.url, public_id: data.public_id })
        } catch (e) {
          setSubmitting(false)
          console.log(e)
        }
      }

    return (
        <AuthRoute>
      <div className="container-fluid">
        <div className="row py-5 bg-default-image text-light">
          <div className="col text-center">
            <h1>News Feed</h1>
          </div>
        </div>
        <div className="row py-3">
          <div className="col-md-8 offset-md-2">
            <CreatePostForm
              content={content} setContent={setContent}
              submitting={submitting}
              postSubmit={postSubmit} loading={loading}
              handleImage={handleImage}
              image={image} setImage={setImage}
            />
          </div>
        </div>
      </div>
    </AuthRoute>
    )
}

export default EditPost
