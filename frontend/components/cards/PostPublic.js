import renderHTML from "react-render-html"
import moment from "moment"
import { Avatar } from "antd"
import PostImage from "../images/PostImage"
import { HeartOutlined, CommentOutlined, RollbackOutlined } from "@ant-design/icons"
import Link from 'next/link'
import setAvatar from '../../functions/index'

const Post = ({ post, isSinglePost }) => {

    return (
        <>
            {post && post.postedBy && <div key={post._id} className="card mb-5">
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
                        <HeartOutlined className="text-danger pt-2 h5 px-2"
                        />

                        <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                            {post.noOfLikes ? post.noOfLikes : 0} Likes
                        </div>

                        <CommentOutlined 
                            className="text-danger pt-2 h5 px-5" />
                        <div className="pt-2 pl-3">
                            <p>{post.comments.length} comments</p>
                        </div>
                    </div>
                </div>
                {post.comments && post.comments.length ?
                    <ol className="list-group"
                    style={{maxHeight: '125px', overflow: 'scroll'}}
                    >
                        {post.comments.slice(0, post.comments.length).map(comment => (
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
                            </li>
                        ))
                        }
                    </ol>
                    : ''}
            </div>}
          { isSinglePost && <Link href="/">
                <a className="d-flex justify-content-center"><RollbackOutlined /></a>
            </Link>}
        </>
    )
}
export default Post

