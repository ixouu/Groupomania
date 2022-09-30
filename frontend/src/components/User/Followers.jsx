import React from 'react'

const Followers = ({ followers }) => {
  return (
    <button className='user-follower_btn'> Follower(s) : {followers.length}</button>
  )
}

export default Followers
