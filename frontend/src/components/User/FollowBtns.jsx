import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addFollower, addFollowing, removeFollower, removeFollowing } from '../../redux/actions/user.actions';
import { getUsers } from '../../redux/actions/users.actions';
import { getUser } from '../../redux/actions/user.actions';
import { accountServices } from '../../utils/services/accountServices';


const FollowBtns = ({ followers, currentUser }) => {

  const dispatch = useDispatch()
  const uid = accountServices.getUserId()
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    if (followers.includes(uid)){
      setIsFollowing(true);
    } else  setIsFollowing(false);
  },[])

  const followUser = async (e) => {
    e.preventDefault()
    const data = {
      followerId : uid
    }
    const data2 = {
      userIdToFollow : currentUser
    }
    await dispatch(addFollower(currentUser, data, uid));
    await dispatch(addFollowing(uid, data2, currentUser));
    dispatch(getUsers());
    dispatch(getUser(uid));
    setIsFollowing(true);
  }

  const unfollowUser = async (e) => {
    e.preventDefault();
    const data = {
      followerId : uid
    }
    const data2 = {
      userIdToUnfollow : currentUser
    }
    await dispatch(removeFollower(currentUser, data, uid));
    await dispatch(removeFollowing(uid, data2, currentUser));
    dispatch(getUsers());
    dispatch(getUser(uid));
    setIsFollowing(false);
  }

  const followBtn = <button className='followUser-btn' onClick={(e) => followUser(e)}><i className="fa-solid fa-user-plus"></i></button>

  const unfollowBtn = <button className='unfollowUser-btn'onClick={(e) => unfollowUser(e)}><i className="fa-solid fa-user-minus"></i></button>
  

    return (
      <> 
        {currentUser === uid ? null : (isFollowing === true ? unfollowBtn : followBtn)}
      </>
    )
}

export default FollowBtns