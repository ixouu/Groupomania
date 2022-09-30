import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const FollowingModal = ({ open, following, onClose}) => {

    const allUsers = useSelector((state) => state.usersReducer);
    let followingUsers = [];
    following.forEach((id) => {
        for (let i = 0; i < allUsers.length; i++){
            if (allUsers[i]._id === id) {
                followingUsers.push(allUsers[i])
            }
        }
    })

    if (!open) return null

    return ReactDOM.createPortal(
        <>
           <div className="overlay"  onClick={onClose}></div>
           <div className='followingModal'>
            <button  className="modal-close" onClick={onClose}>&times;</button>
            <h3>Abonnement(s) : </h3>
                <div className="modal-content">
                    {
                        followingUsers.map((user, index) => {
                            return <Link to={`../user/?id=${user._id}`} key={index} className='followingModal-userCard'  onClick={onClose}>
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

export default FollowingModal;
