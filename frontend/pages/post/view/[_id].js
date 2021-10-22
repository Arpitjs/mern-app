import axios from "axios";
import PostPublic from "../../../components/cards/PostPublic"
import Head from "next/head";

const SinglePost = ({ post }) => {
  const head = () => (
    <Head>
      <title>MERNCAMP - A social network by devs for devs</title>
      <meta name="description" content={post.content} />
      <meta
        property="og:description"
        content="A social network by developers for other web developers"
      />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="MERNCAMP" />
      <meta
        property="og:url"
        content={`http://merncamp.com/post/view/${post._id}`}
      />
      <meta property="og:image:secure_url" content={imageSource(post)} />
    </Head>
  );

  const imageSource = post => post.image ? post.image.url : "/images/default.jpg"

  return (
    <>
      {head()}
      <div className="container-fluid"
        style={{
            backgroundImage: "url( "+ "/images/default.jpg"+ ")",
            backgroundAttachment: "fixed",
            padding: "100px 0px 75px 0px",
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
            display: 'block'
        }}>
                <h1 className="display-1 font-weight-bold text-center py-5">MERNCAMP</h1>
        </div>
      <div className="container">
        <div className="row pt-5">
          <div className="col-md-8 offset-md-2">
            <PostPublic key={post._id} post={post} isSinglePost={true} />
          </div>
        </div>
      </div>
    </>
  )
}

export async function getServerSideProps(ctx) {
  const { data } = await axios.get(`/posts/post/${ctx.params._id}`);
  return {
    props: { post: data.post }
  }
}

export default SinglePost
