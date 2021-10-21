import AuthRoute from '../../components/routes/AuthRoute'
import { useContext, useState, useEffect } from "react"
import { UserContext } from "../../context"
import CreatePostForm from '../../components/Forms/CreatePostForm'
import axios from 'axios'
import { toast } from 'react-toastify'
import PostList from '../../components/cards/PostList'
import People from '../../components/cards/People'
import Link from 'next/link'
import { Pagination } from 'antd'
import Search from '../../components/Search'

const dashboard = () => {
  let [posts, setPosts] = useState([])
  const [state, setState] = useContext(UserContext)
  let [content, setContent] = useState('')
  let [image, setImage] = useState({})
  let [people, setPeople] = useState([])
  let [submitting, setSubmitting] = useState(false)
  let [loading, setLoading] = useState(false)
  let [totalPosts, setTotalPosts] = useState(0)
  let [page, setPage] = useState(1)

  useEffect(() => {
    try {
      if (state && state.token) {
        fetchUserPosts()
        findPeople()
      }
    } catch (e) {
      toast(e.response.data)
    }
  }, [state && state.token, page])

  useEffect(async () => {
     let { data } = await axios.get('/posts/total-posts')
     setTotalPosts(data)
  }, [])

  function fetchUserPosts() {
    try {
      axios.get(`posts/user-posts?page=${page}`)
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
      setPage(1)
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

  
  function findPeople() {
    try {
      axios.get('users/find-people')
        .then(({ data }) => setPeople(data.people))
    } catch (e) {
      // console.log(e)
      toast.error(err.response.data.err.msg)
    }
  }

  
  function followUsers(user) {
    try {
      axios.post('users/follow', user)
        .then(({ data }) => {
          toast.success(`you are now following ${user.name}`)
          let auth = JSON.parse(localStorage.getItem('auth'))
          auth.user = data.user
          localStorage.setItem('auth', JSON.stringify(auth))
          setState({ ...state, user: data.user })
          setPeople(people.filter(p => p._id !== user._id))
          //re-render the posts, of the followed users
          fetchUserPosts()
        })
    } catch (e) {
      // console.log(e)
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
            {/* 3 posts per page */}
            <Pagination className="pb-5"
            current={page} total={(totalPosts / 3) * 10}
            onChange={value => setPage(value)}
            />
          </div>
          
          {/* <pre>{JSON.stringify(posts, null, 4)}</pre> */}
          <div className="col-md-4">
          <Search/>
          <br />
          { state && state.user &&
             <Link href={'/user/following'}>
               <a className="h6">
                 {state.user.following && state.user.following.length}  Following</a>
            </Link>} <br/>
            <People 
            fetchUserPosts={fetchUserPosts}
            people={people}
            handleFollow={followUsers}
            />
          </div>
        </div>
      </div>
    </AuthRoute>
  )
}

export default dashboard
