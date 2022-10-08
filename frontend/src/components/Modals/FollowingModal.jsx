import React from 'react';
import ReactDOM from 'react-dom';
import { useSelector } from 'react-redux';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';

const FollowingModal = ({ open, following, onClose}) => {

    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()

    const allUsers = useSelector((state) => state.usersReducer);

    let followingUsers = [];
    following.forEach((id) => {
        for (let i = 0; i < allUsers.length; i++){
            if (allUsers[i]._id === id) {
                followingUsers.push(allUsers[i])
            }
        }
    })

    const handleClick = (userId) => {
        onClose();
        // setSearchParams({id : userId});
        // searchParams.get('id');
        navigate({ pathname: '../user', search: `?id=${userId}`})
        console.log(userId);
    }

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
                            return <button type='button' key={index} className='followingModal-userCard'  onClick={() => handleClick(user._id)}>
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
