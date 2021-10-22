import { useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import Post from '../../components/cards/Post'

const PostList = ({ posts, deletePost, fetchUserPosts }) => {
  let [comment, setComment] = useState('')
  let [currentPost, setCurrentPost] = useState({})
  let [visible, setVisible] = useState(false)

  let likePost = async (post) => {
    try {
      await axios.post('/posts/like', { post })
      fetchUserPosts()
    } catch (err) {
      console.log(err)
    }
  }

  let unlikePost = async post => {
    try {
      await axios.post('/posts/unlike', { post })
      fetchUserPosts()
    } catch (err) {
      console.log(err)
    }
  }


  let handleComment = post => {
    setCurrentPost(post)
    setVisible(true)
  }

  let addComment = async (e) => {
    e.preventDefault()
    try {
      await axios.post('/posts/add-comment', { postId: currentPost._id, comment })
      toast.success('your comment is added.')
      setVisible(false)
      fetchUserPosts()
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.err.msg)
    }
  }

  let removeComment = async (postId, toDel) => {
    try {
      let areYouSure = confirm('are you sure want to delete?')
      if (!areYouSure) return;
      await axios.delete(`/posts/remove-comment/${postId}/${toDel._id}`)
      toast.error('comment deleted!')
      fetchUserPosts()
    } catch (err) {
      console.log(err)
      toast.error(err.response.data.err.msg)
    }
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
            deletePost={deletePost}
            visible={visible}
            setVisible={setVisible}
            deleteComment={removeComment}
          />
        )) : <h3>No posts yet!</h3>}
    </>
  )
}
export default PostList

