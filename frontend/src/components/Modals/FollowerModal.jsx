import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FollowerModal = ({ followers, onClose, open}) => {

    const allUsers = useSelector((state) => state.usersReducer);
    let followersUsers = [];
    followers.forEach((id) => {
        for (let i = 0; i < allUsers.length; i++){
            if (allUsers[i]._id === id) {
                followersUsers.push(allUsers[i])
            }
        }
    })

    if (!open) return null

    return ReactDOM.createPortal(
        <>
           <div className="overlay"  onClick={onClose}></div>
           <div className='followerModal'>
            <button  className="modal-close" onClick={onClose}>&times;</button>
            <h3>Follower(s) : </h3>
                <div className="modal-content">
                    {
                        followersUsers.map((user, index) => {
                            return <Link to={`./user/?id=${user._id}`} relative="path" key={index} className='followerModal-userCard'  onClick={onClose}>
                                <span>{user.firstName} {user.lastName}</span>
                            </Link>
                        })
                    }
                </div>
            </div> 
        </>,
    document.getElementById('portal')
    );
}

export default FollowerModal;
