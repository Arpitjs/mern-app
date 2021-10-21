import { useContext } from "react"
import { Avatar, List } from "antd"
import { UserContext } from "../../context"
import setAvatar from '../../functions/index'
import Link from 'next/link'

const People = ({ people, handleFollow, handleUnfollow }) => {
  const [state, setState] = useContext(UserContext)

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
                  <Link href={`/user/${user.username}`}>
                  <a>{user.username}</a>
                  </Link>
                 
                  {/* <pre>{JSON.stringify(user, null, 4)}</pre> */}
                {state && state.user && user.followers && user.followers.includes(state.user._id) ?
               <span
               className="text-primary pointer" 
               onClick={() => handleUnfollow(user)}>Unfollow</span> : 
               <span
               className="text-primary pointer" 
               onClick={() => handleFollow(user)}>Follow</span>  
              }
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
