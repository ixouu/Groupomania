import React from 'react'

const Following = ({ following }) => {

  return (
    <button className='user-following_btn'> Abonnement(s) :  {following.length}</button>
  )
}

export default Following