import { useState, useEffect } from "react"
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import AuthRoute from '../../components/routes/AuthRoute'
import Post from '../../components/cards/Post'
import Link from 'next/link'
import { RollbackOutlined } from '@ant-design/icons'

let PostComments = (isHome) => {
    let router = useRouter()
    let id = router.query._id
    let [post, setPost] = useState({})
    let [comment, setComment] = useState('')
    let [visible, setVisible] = useState(false)

    useEffect(() => {
        if (id) fetchPost()
    }, [id])

    let fetchPost = () => {
        try {
            axios.get(`posts/user-post/${id}`)
                .then(({ data }) => setPost(data.post))
        } catch (e) {
            // console.log(e)
            toast.error(err.response.data.err.msg)
        }
    }

    let likePost = async (post) => {
        try {
            await axios.post('/posts/like', { post })
            fetchPost()
        } catch (err) {
            console.log(err)
        }
    }

    let unlikePost = async (post) => {
        try {
            await axios.post('/posts/unlike', { post })
            fetchPost()
        } catch (err) {
            console.log(err)
        }
    }


    async function deletePost(toDel) {
        try {
            let areYouSure = confirm('are you sure want to delete?')
            if (!areYouSure) return;
            await axios.delete(`/posts/delete-post/${toDel._id}`)
            toast.error('post deleted!')
            setPost({})
        } catch (err) {
            // console.log(err)
            toast.error(err.response.data.err.msg)
        }
    }

    let handleComment = () => setVisible(true)

    let addComment = async (e, postId) => {
        e.preventDefault()
        try {
            await axios.post('/posts/add-comment', { postId, comment })
            toast.success('your comment is added.')
            setVisible(false)
            fetchPost()
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.err.msg)
        }
    }
    let deleteComment = async (postId, toDel) => {
        try {
            let areYouSure = confirm('are you sure want to delete?')
            if (!areYouSure) return;
            await axios.delete(`/posts/remove-comment/${postId}/${toDel._id}`)
            toast.error('comment deleted!')
            fetchPost()
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.err.msg)
        }
    }

    return (
        <AuthRoute>
            <div className="container-fluid"
                style={{
                    backgroundImage: "url( " + "/images/default.jpg" + ")",
                    backgroundAttachment: "fixed",
                    padding: "100px 0px 75px 0px",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center center',
                    display: 'block'
                }}>
                <h1 className="display-1 font-weight-bold text-center py-5">MERNCAMP</h1>
            </div>
            <div className="container col-md-8 offset-md-2 pt-5">
                <Post
                    post={post}
                    likePost={likePost}
                    unlikePost={unlikePost}
                    handleComment={handleComment}
                    comment={comment}
                    addComment={addComment}
                    setComment={setComment}
                    deleteComment={deleteComment}
                    deletePost={deletePost}
                    visible={visible}
                    setVisible={setVisible}
                    commentsCount={100}
                    isHome={true}
                />
            </div>

            <Link href="/user/dashboard">
                <a className="d-flex justify-content-center"><RollbackOutlined /></a>
            </Link>
        </AuthRoute>

    )
}

export default PostComments