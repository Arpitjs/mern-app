import AuthRoute from '../../components/routes/AuthRoute'
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context"
import CreatePostForm from '../../components/Forms/CreatePostForm'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import PostList from '../../components/cards/PostList'
import People from '../../components/cards/People'
import Link from 'next/link'

const dashboard = () => {
  let router = useRouter()
  let [posts, setPosts] = useState([])
  const [state, setState] = useContext(UserContext)
  let [content, setContent] = useState('')
  let [image, setImage] = useState({})
  let [submitting, setSubmitting] = useState(false)
  let [loading, setLoading] = useState(false)

  useEffect(() => {
    try {
      if (state && state.token) {
        fetchUserPosts()
      }
    } catch (e) {
      toast(e.response.data)
    }
  }, [state && state.token])

  function fetchUserPosts() {
    try {
      axios.get('posts/user-posts')
        .then(({ data }) => setPosts(data.posts))
    } catch (e) {
      // console.log(e)
      toast.error(err.response.data.err.msg)
    }
  }

  let postSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await axios.post('posts/create-post', { content, image })
      setSubmitting(false)
      setLoading(false)
      fetchUserPosts()
      setContent("")
      setImage({})
      toast.success('post created!')
    } catch (err) {
      setSubmitting(false)
      // console.log('ERR', err)
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

  async function deletePost(toDel) {
    try {
      let areYouSure = confirm('are you sure want to delete?')
      if (!areYouSure) return;
      await axios.delete(`/posts/delete-post/${toDel._id}`)
       let filteredPosts = posts.filter(p => p._id !== toDel._id)
      setPosts(filteredPosts)
      toast.error('post deleted!')
    } catch (err) {
      // console.log(err)
      toast.error(err.response.data.err.msg)
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
          <div className="col-md-8">
            <CreatePostForm
              content={content} setContent={setContent}
              submitting={submitting}
              postSubmit={postSubmit} loading={loading}
              handleImage={handleImage}
              image={image} setImage={setImage}
            />
            <br />
            <PostList posts={posts}
             fetchUserPosts={fetchUserPosts}
                deletePost={deletePost}
            />
          </div>
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4">
          { state && state.user &&
             <Link href={'/user/following'}>
               <a className="h6">
                 {state.user.following && state.user.following.length}  Following</a>
            </Link>} <br/>
            <People 
            fetchUserPosts={fetchUserPosts}
            />
          </div>
        </div>
      </div>
    </AuthRoute>
  )
}

export default dashboard
