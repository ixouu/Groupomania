import React, { useState } from 'react';
import FollowingModal from '../Modals/FollowingModal';

const Following = ({ following }) => {

  const [followingModalisOpen, setfollowingModalIsOpen] = useState(false);

  return (
    <>
      <button className='user-following_btn' onClick={() => setfollowingModalIsOpen(!followingModalisOpen)}> Abonnement(s) :  {following.length}</button>
      {followingModalisOpen && <FollowingModal open={followingModalisOpen} following={following} onClose={() => setfollowingModalIsOpen(false)} />}
    </>
  )
}

export default Following