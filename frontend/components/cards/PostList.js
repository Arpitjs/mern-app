import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Post from '../../components/cards/Post'

const PostList = ({ posts, deletePost, fetchUserPosts }) => {
  let [comment, setComment] = useState('')
  let [visible, setVisible] = useState(false)

  let likePost = async (post) => {
    try {
      await axios.post('/posts/like', { post })
      fetchUserPosts()
    } catch (err) {
      console.log(err)
    }
  }

  let unlikePost = async (post) => {
    try {
      await axios.post('/posts/unlike', { post })
      fetchUserPosts()
    } catch (err) {
      console.log(err)
    }
  }


  let handleComment = () => setVisible(true)

  let addComment = async (e, postId) => {
    e.preventDefault()
    try {
      await axios.post('/posts/add-comment', { postId, comment })
      toast.success('your comment is added.')
      setVisible(false)
      fetchUserPosts()
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.err.msg)
    }
  }
  let removeComment = async () => {

  }
  return (
    <>
      {posts.length ?
        posts.map(post => (
         <Post
         key={post._id}
          post={post}
          likePost={likePost}
          unlikePost={unlikePost}
          handleComment={handleComment}
          comment={comment}
          setComment={setComment}
          addComment={addComment}
          removeComment={removeComment}
          deletePost={deletePost}
          visible={visible}
          setVisible={setVisible}
          />
        )) : <h3>No posts yet!</h3>}
    </>
  )
}
export default PostList

