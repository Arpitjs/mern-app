import renderHTML from "react-render-html"
import moment from "moment"
import { Avatar } from "antd"
import PostImage from "../images/PostImage"
import { HeartOutlined, HeartFilled, CommentOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons"
import { UserContext } from '../../context/index'
import { useContext } from 'react'
import { useRouter } from 'next/router'
import { Modal } from 'antd'
import Link from 'next/link'
import setAvatar from '../../functions/index'

const Post = ({ post, deletePost, visible, setVisible, comment, setComment, isHome,
    likePost, unlikePost, handleComment, addComment, removeComment, commentsCount = 2
}) => {
  let router = useRouter()
  let [state] = useContext(UserContext)

  return (
    <>
        {post && post.postedBy &&  <div key={post._id} className="card mb-5">
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

                {state && state.user
                  && post.likes && !post.likes.includes(state.user._id) ? <HeartOutlined className="text-danger pt-2 h5 px-2"
                    onClick={() => likePost(post)} /> :
                  <HeartFilled className="text-danger pt-2 h5 px-2"
                    onClick={() => unlikePost(post)} />
                }
                <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                  {post.noOfLikes ? post.noOfLikes : 0} Likes
                </div>

                <CommentOutlined onClick={() => handleComment()}
                  className="text-danger pt-2 h5 px-5" />
                <div className="pt-2 pl-3">
                  <Link href={`/post/${post._id}`}>
                    <a>{post.comments.length} comments</a>
                  </Link>
                </div>

                <Modal visible={visible}
                  onCancel={() => setVisible(false)}
                  title="Comment" footer={null}
                >
                  <form onSubmit={(e) => addComment(e, post._id)}>
                    <input type="text" placeholder="write something.."
                      className="form-control"
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                    />
                    <button
                      className="btn btn-primary btn-sm btn-block mt-3">
                      Submit
                    </button>
                  </form>
                </Modal>

                {state && state.user && state.user._id === post.postedBy._id && !isHome && <>
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
            {post.comments && post.comments.length && !isHome ?
              <ol className="list-group" 
              style={{maxHeight: '125px', overflow: 'scroll'}}
              >
                {post.comments.slice(0, commentsCount).map(comment => (
                  <li 
                  key={comment._id}
                  className="list-group-item d-flex justify-content-between align-items-start">
                    <div className="ms-2 me-auto">
                      <div>
                        <Avatar
                          size={20}
                          className="mb-1 mr-3"
                          src={setAvatar(comment.postedBy)}
                        />
                        &nbsp;{comment.postedBy.name}
                      </div>
                      <i className="text-muted">{comment.comment}</i>
                    </div>
                    <span className="badge rounded-pill text-muted">
                      {moment(comment.created).fromNow()}
                    </span>
                   {state && state.user && state.user._id === comment.postedBy._id && <>
                    <DeleteOutlined className="text-danger pt-2 h5 px-2"
                    onClick={() => removeComment(post._id, comment)}/>
                    </>}
                   
                  </li>
                ))
                }
              </ol>
            : '' }
          </div>}
       
    </>
  )
}
export default Post

