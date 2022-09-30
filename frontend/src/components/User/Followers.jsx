import React, { useState } from 'react'

import FollowerModal from '../Modals/FollowerModal';


const Followers = ({ followers}) => {

  const [followerModalIsOpen, setFollowerModalIsOpen] = useState(false);
  return (
    <>
      <button className='user-follower_btn' onClick={ () => setFollowerModalIsOpen(!followerModalIsOpen)}> Follower(s) : {followers.length} </button>
      {followerModalIsOpen && <FollowerModal open={followerModalIsOpen} followers={followers} onClose={() => setFollowerModalIsOpen(false)}/>}
    </>
  )
}

export default Followers
