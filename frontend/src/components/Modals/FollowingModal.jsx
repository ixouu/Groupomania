import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';

const FollowingModal = ({ open, following, onClose }) => {


    const allUsers = useSelector((state) => state.usersReducer);

    let followingUsers = [];
    following.forEach((id) => {
        for (let i = 0; i < allUsers.length; i++) {
            if (allUsers[i]._id === id) {
                followingUsers.push(allUsers[i])
            }
        }
    })

    if (!open) return null

    return ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className='followingModal'>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h3>Abonnement(s) : </h3>
                <div className="modal-content">
                    {
                        followingUsers.map((user, index) => {
                            return <button type='button' key={index} className='followingModal-userCard'>
                                <span>{user.firstName} {user.lastName}</span>
                            </button>
                        })
                    }
                </div>
            </div>
        </>,
        document.getElementById('portal')
    );
}

export default FollowingModal;
