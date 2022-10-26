import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { CSSTransition } from 'react-transition-group'

const LikesPhotos = ({ likes, likesLength }) => {

    const [likersAreVisible, setLikersAreVisible] = useState(false)
    const nodeRef = useRef(null);
    const allUsers = useSelector((state) => state.usersReducer);
    // GET ALL PHOTO LINK FROM USERS WHO LIKED THE POST
    let likersPhotoLink = [];
    // GET ALL LIKERS NAMES 
    let likersNames = [];



    likes.forEach((id) => {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id === id) {
                likersPhotoLink.push(allUsers[i].photo)
                likersNames.push(allUsers[i].firstName + " " + allUsers[i].lastName)
            }
        }
    });

    function toggleLikersNames() {
        return (
            <CSSTransition in={likersAreVisible} nodeRef={nodeRef} timeout={900} classNames='likersNames-transistion' >
                <div className='post-counts_likersNames' ref={nodeRef}>
                    {likersNames.map((name, index) => {
                        return <p key={index}>{name}</p>
                    })}
                </div>
            </CSSTransition>

        )
    }
    // CASE 1 LIKE
    const oneLike = () => {
        return (
            <div
                className="post-counts_photos oneLike"
                onMouseEnter={() => setLikersAreVisible(!likersAreVisible)}
                onMouseLeave={() => setLikersAreVisible(!likersAreVisible)}
            >
                {likersAreVisible && toggleLikersNames()}
                <img src={`${likersPhotoLink[0]}`} alt='Photo de profil mignature' />
            </div>)
    };

    // CASE 2 LIKES
    const twoLikes = () => {
        return (
            <div
                className="post-counts_photos twoLikes"
                onMouseEnter={() => setLikersAreVisible(!likersAreVisible)}
                onMouseLeave={() => setLikersAreVisible(!likersAreVisible)}
            >
                {likersAreVisible && toggleLikersNames()}
                <img src={`${likersPhotoLink[0]}`} alt='Photo de profil mignature' />
                <img src={`${likersPhotoLink[1]}`} alt='Photo de profil mignature' />
            </div>)
    };
    // CASE 3 LIKES
    const threeLikes = () => {
        return (
            <div
                className="post-counts_photos twoLikes"
                onMouseEnter={() => setLikersAreVisible(!likersAreVisible)}
                onMouseLeave={() => setLikersAreVisible(!likersAreVisible)}
            >
                {likersAreVisible && toggleLikersNames()}
                <img src={`${likersPhotoLink[0]}`} alt='Photo de profil mignature' />
                <img src={`${likersPhotoLink[1]}`} alt='Photo de profil mignature' />
                <img src={`${likersPhotoLink[2]}`} alt='Photo de profil mignature' />
            </div>)
    };

    // CASE MORE THAN 3 LIKES
    const manyLikes = () => {
        return (
            <div
                className="post-counts_photos manyLikes"
                onMouseEnter={() => setLikersAreVisible(!likersAreVisible)}
                onMouseLeave={() => setLikersAreVisible(!likersAreVisible)}
            >
                {likersAreVisible && toggleLikersNames()}
                <div className='post-counts_miniNumber'><span><i className="fa-solid fa-plus"></i> {likesLength}</span></div>
                <img src={`${likersPhotoLink[0]}`} alt='Photo de profil mignature' />
                <img src={`${likersPhotoLink[1]}`} alt='Photo de profil mignature' />
                <img src={`${likersPhotoLink[2]}`} alt='Photo de profil mignature' />
            </div>)
    };

    const displayPhotos = () => {
        if (likesLength < 1) {
            return
        } else if (likesLength === 1) {
            return oneLike();
        } else if (likesLength === 2) {
            return twoLikes();
        } else if (likesLength === 3) {
            return threeLikes();
        } else {
            return manyLikes();
        }
    }
    return (
        <>
            {displayPhotos()}
        </>
    );
}

export default LikesPhotos;
