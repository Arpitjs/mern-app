import axios from 'axios'
import PostPublic from '../components/cards/PostPublic'
import Head from 'next/head'
import Link from 'next/link'
import io from 'socket.io-client'
import { useState, useEffect } from "react"

let socket = io(process.env.NEXT_PUBLIC_SOCKETIO, {path: '/socket.io'}, {
  reconnection: true
})

const Home = ({ posts }) => {
  let [newsFeed, setNewsFeed] = useState([])
 
  useEffect(() => {
    socket.on('send post', post => setNewsFeed([post, ...posts]))
    socket.on('deleted', () => setNewsFeed([...posts]))
  }, [])

  let data = newsFeed.length ? newsFeed : posts

    let head = () => (
        <Head>
            <title>Merncamp -- A social network</title>
            <meta name="description" 
            content="social network"/>
            <meta property="og:description"
            content="social network"/>
            <meta property="og:type" content="website"/>
            <meta property="og:site_name" content="MERNCAMP"/>
            <meta property="og:url" content="localhost:3000"/>
            <meta property="og:image:secure_url" 
            content="http://merncamp.com/images/default.jpg"/>
        </Head>
    )
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
          {data.map(post => (
            <div key={post._id} className="col-md-4">
              <Link href={`/post/view/${post._id}`}><a>
                  <PostPublic key={post._id} post={post}/>
                  </a>
                  </Link>
            </div>
          ))}
        </div>
      </div>
          </>    
    )
}

//SSR ma backend bata data ae pachi only the client is loaded,
// but in use effect, first client loads, then calls BE, then re renders the contents

export async function getServerSideProps() {
    let { data } = await axios.get('/posts/posts')
    return {
        props: { posts: data }
    }
}

export default Home
