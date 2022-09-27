import React, { useState } from 'react';

import { accountServices } from '../../utils/services/accountServices';

const FollowBtns = ({ followers }) => {

  const [isFollowing, setIsFollowing] = useState(false);

  const findUserIdInFollowing = () => {
    const user = accountServices.getUserId();
    console.log(user);
    if (followers.includes(user)){
      setIsFollowing(true);
    } else {
      setIsFollowing(false);
    }
  }

  const followBtn = <button className='followUser-btn'><i class="fa-solid fa-user-plus"></i></button>

  const unfollowBtn = <button className='unfollowUser-btn'><i class="fa-solid fa-user-minus"></i></button>
  

    return (
      <>
        {isFollowing === true ? unfollowBtn: followBtn}
      </>
    )
}

export default FollowBtns