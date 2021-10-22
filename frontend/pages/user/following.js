import { useContext, useState, useEffect } from "react"
import { Avatar, List } from "antd"
import { useRouter } from "next/router"
import { UserContext } from "../../context"
import axios from 'axios'
import { toast } from 'react-toastify'
import { RollbackOutlined } from '@ant-design/icons'
import Link from 'next/link'
import setAvatar from '../../functions/index'

const Following = () => {
    const [state, setState] = useContext(UserContext)
    let [people, setPeople] = useState([])
    const router = useRouter()

    useEffect(() => {
        if (state && state.token) fetchFollowing()
    }, [state && state.token])

    let fetchFollowing = async () => {
        try {
            let { data } = await axios.get('/users/user-following')
            setPeople(data.following)
        } catch (e) {
            toast.error(err.response.data.err.msg)
        }
    }

    let UnfollowUsers = async (user) => {
        try {
            let { data } = await axios.post('/users/unfollow', user)
            toast.warning(`unfollowed ${user.name}`)
            let auth = JSON.parse(localStorage.getItem('auth'))
            auth.user = data.user
            localStorage.setItem('auth', JSON.stringify(auth))
            setState({ ...state, user: data.user })
            setPeople(people.filter(p => p._id !== user._id))
        } catch (err) {
            console.log(err)
            toast.error(err.response.data.err.msg)
        }
    }

    return (
        <div className="row col-md-6 offset-md-3">
            <List
                itemLayout="horizontal"
                dataSource={people}
                renderItem={(user) => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={<Avatar src={setAvatar(user)} />}
                            title={
                                <div className="d-flex justify-content-between">
                                    {user.name} <span
                                        className="text-primary pointer" onClick={() => UnfollowUsers(user)}>Unfollow</span>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />

            <Link href="/user/dashboard"><a><RollbackOutlined /></a></Link>
        </div>
    )
}

export default Following
