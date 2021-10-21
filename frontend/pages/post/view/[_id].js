import axios from 'axios'
import Post from '../../../components/cards/Post'
import Head from 'next/head'

const SinglePost = ({ post }) => {
    let head = () => (
        <Head>
            <title>Merncamp -- A social network</title>
            <meta name="description" 
            content={post.content}/>
            <meta property="og:description"
            content="social network"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="MERNCAMP"/>
            <meta property="og:url" content={`http://merncamp.com/post/view/${post._id}`}/>
            <meta property="og:image:secure_url" 
            content={setPostImage(post)}/>
        </Head>
    )
    let setPostImage = post => post.image ? post.image.url : '/images/default.jpg'

    return (
        <>
        {head()}
        <div className="container">
            <div className="row pt-5">
          <div className="col-md-4 offset-md-2">
              <Post post={post} key={post._id} isHome={true}/>
          </div>
            </div>
        </div>
        </>
    )
}

export async function getServerSideProps(ctx) {
    let { data } = await axios.get(`/posts/post/${ctx.params._id}`)
    return {
        props: { post: data }
    }
}

export default SinglePost
