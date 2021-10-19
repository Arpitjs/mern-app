import { useContext, useEffect, useState } from "react"
import { Avatar, List } from "antd"
import { useRouter } from "next/router"
import { UserContext } from "../../context"
import axios from 'axios'
import { toast } from 'react-toastify'

const People = ({ fetchUserPosts }) => {
  const [state, setState] = useContext(UserContext)
  let [people, setPeople] = useState([])
  const router = useRouter()

  useEffect(() => {
    try {
      if (state && state.token) {
        findPeople()
      }
    } catch (e) {
      console.log(e)
      toast(e.response.data.err.msg)
    }
  }, [state && state.token])

  function findPeople() {
    try {
      axios.get('users/find-people')
        .then(({ data }) => setPeople(data.people))
    } catch (e) {
      // console.log(e)
      toast.error(err.response.data.err.msg)
    }
  }

  function followUsers(user) {
    try {
      axios.post('users/follow', user)
        .then(({ data }) => {
          toast.success(`you are now following ${user.name}`)
          let auth = JSON.parse(localStorage.getItem('auth'))
          auth.user = data.user
          localStorage.setItem('auth', JSON.stringify(auth))
          setState({ ...state, user: data.user })
          setPeople(people.filter(p => p._id !== user._id))
          //re-render the posts, of the followed users
          fetchUserPosts()
        })
    } catch (e) {
      // console.log(e)
      toast.error(err.response.data.err.msg)
    }
  }

  let setAvatar = user => user.photo ? user.photo.url : '/images/default.jpg'
  return (
    <>
      <List
        itemLayout="horizontal"
        dataSource={people}
        renderItem={(user) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={setAvatar(user)} />}
              title={
                <div className="d-flex justify-content-between">
                  {user.username} <span
                    className="text-primary pointer" onClick={() => followUsers(user)}>Follow</span>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </>
  )
}

export default People
