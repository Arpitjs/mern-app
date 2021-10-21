import { useContext, useState, useEffect } from "react"
import { useRouter } from "next/router"
import { UserContext } from "../../context"
import axios from 'axios'
import { toast } from 'react-toastify'
import { RollbackOutlined } from '@ant-design/icons'
import Link from 'next/link'
import setAvatar from '../../functions/index'
import { Card } from 'antd'
import moment from 'moment'

const Username = () => {
    const [state, setState] = useContext(UserContext)
    let [user, setUser] = useState({})
    const router = useRouter()

    useEffect(() => {
        if (router.query.username) fetchUser()
    }, [router.query.username])

    let fetchUser = async () => {
        try {
            let { data } = await axios.get(
                `/users/fetch-user/${router.query.username}`)
            setUser(data.user)
        } catch (err) {
            toast.error(err.response.data.err.msg)
        }
    }

    return (
        <div className="row col-md-6 offset-md-3">
           {/* {JSON.stringify(user, null, 4)} */}
          <div className="pt-5 pb-5">
          <Card hoverable cover={<img alt={user.name} height="400px"
          src={setAvatar(user)}/>}>
                <Card.Meta title={user.name}
                description={user.about}
                />
             <p className="pt-2 text-muted">
                 Joined {moment(user.createdAt).fromNow()}</p>   
               <div className="d-flex justify-content-between">
                   <span className="btn btn-sm">
                       {user.followers && user.followers.length} Followers
                   </span>
                   <span className="btn btn-sm">
                       {user.following && user.following.length} Following
                   </span>
                   </div>  
            </Card>
            <Link href="/user/dashboard">
                <a><RollbackOutlined /></a>
            </Link>
          </div>
        </div>
    )
}

export default Username
