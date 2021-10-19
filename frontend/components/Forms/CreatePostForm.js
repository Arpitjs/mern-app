import { Avatar } from 'antd'
import { CameraOutlined, SyncOutlined, LoadingOutlined } from '@ant-design/icons'
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false })
import 'react-quill/dist/quill.snow.css'

const CreatePostForm = ({ content, setContent, postSubmit,
    submitting, handleImage, image, loading }) => {
    return (
        <div className="card">
            <div className="card-body py-3">
                <form className="form-group">
                    <ReactQuill
                        theme="snow"
                        className="form-control" value={content}
                        onChange={e => setContent(e)}
                        placeholder="write something..." />
                </form>
            </div>

            <div className="card-footer d-flex justify-content-between text-muted">
                {submitting ? <SyncOutlined></SyncOutlined> : <button className="btn btn-primary btn-sm mt-1"
                    onClick={postSubmit}>Post</button>}
                <label>
                    {
                        image && image.url ? <Avatar src={image.url} size={30} /> 
                        : loading ? <LoadingOutlined /> 
                        : <CameraOutlined className="mt-2" />
                    }
                    <input type="file" accept="images/*" hidden onChange={handleImage} />
                </label>
            </div>
        </div>
    )
}

export default CreatePostForm
