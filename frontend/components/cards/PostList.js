import renderHTML from "react-render-html";
import moment from "moment";
import { Avatar } from "antd";
import PostImage from "../images/PostImage";
import { HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { UserContext } from '../../context/index'
import { useContext, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

const PostList = ({ posts, deletePost, fetchUserPosts }) => {
  let router = useRouter()
  let [state] = useContext(UserContext)

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

  return (
    <>
      {posts.length ?
        posts.map(post => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              {!post.postedBy.photo ? <Avatar size={40}>{post.postedBy.name[0]}</Avatar> :
                <Avatar src={post.postedBy.photo.url} size={40} />
              }
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{renderHTML(post.content)}</div>
            <div className="card-footer">
              {post.image && <PostImage url={post.image.url} />}

              <div className="d-flex pt-2">

                {!post.likes.includes(state.user._id) ? <HeartOutlined className="text-danger pt-2 h5 px-2"
                  onClick={() => likePost(post)} /> :
                  <HeartFilled className="text-danger pt-2 h5 px-2"
                    onClick={() => unlikePost(post)} />
                }
                <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                  {post.noOfLikes ? post.noOfLikes : 0} Likes
                </div>

                <CommentOutlined className="text-danger pt-2 h5 px-5" />
                <div className="pt-2 pl-3">2 comments</div>

                {state && state.user && state.user._id === post.postedBy._id && <>
                  <EditOutlined className="text-danger pt-2 h5 px-2 mx-auto"
                    onClick={() => router.push(`/user/post/${post._id}`)}
                  />
                  <div className="pt-2 pl-3"></div>

                  <DeleteOutlined className="text-danger pt-2 h5 px-2"
                    onClick={() => deletePost(post)}
                  />
                  <div className="pt-2 pl-3"></div>
                </>}
              </div>
            </div>
          </div>
        )) : <h3>No posts yet!</h3>}
    </>
  )
}
export default PostList

