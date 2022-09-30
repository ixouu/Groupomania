import React, { useState } from 'react';

import { useSelector } from 'react-redux';

import { accountServices } from '../../utils/services/accountServices';

import Header from '../Layout/Header';
import Footer from '../Layout/Footer';
import Followers from './Followers';
import Following from './Following';
import FollowBtns from './FollowBtns';

 const User = () => {

    const users = useSelector((state) => state.usersReducer);
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams(currentUrl.search);
    const userIdToFind = params.get("id")

    const user = () => {
        return  users.filter(user => user._id === `${userIdToFind}`)
    }

    document.title = `Groupomania | Profil de ${user()[0].firstName} ${user()[0].LastName}` 


    const userBio = () => {
        if (user()[0].bio === ''){
            return <p> {user()[0].firstName} n'a pas encore écrit sa bio</p>
        } else {
            return <p>{user()[0].bio}</p>
        }
    }

    
  return (
    <>
        <Header/>
            <main className='user'>
                <div className="user-card">
                    <div className="user-card_left">
                        <div className="user-name">
                            <h1>{user()[0].firstName} {user()[0].lastName}</h1>
                            <span>Inscrit le {accountServices.transformDate(user()[0].createdAt)}</span>
                        </div>
                        <div className="user-bio">
                            <h2>Bio : </h2>
                            <p>{userBio()}</p>
                        </div>
                        <div className="user-follow_bloc">
                            <div className="user-follow">
                                <Followers followers={user()[0].followers} />
                                <FollowBtns followers={user()[0].followers} currentUser={userIdToFind}/>
                            </div>
                            <Following following={user()[0].following}/>
                        </div>
                    </div>
                    <div className="user-card_right">
                        <img src={`${user()[0].photo}`} alt={`Photo de ${user()[0].lastName}`} />
                    </div>
                </div>
                
            </main>
        <Footer/>
    </>
  )

}

export default User