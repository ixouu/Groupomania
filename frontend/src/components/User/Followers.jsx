import React from 'react'


import FollwerModal from './FollwerModal';
const Followers = ({ followers }) => {
  return (
    <button className='user-follower_btn'> Follower(s) : {followers.length}</button>
  )
}

export default Followers
