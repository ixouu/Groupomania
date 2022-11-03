import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const LastSignUp = () => {

    const users = useSelector((state) => state.usersReducer)
    const sortedUsers = users && [...users].reverse();
    const slicedUsers = sortedUsers && sortedUsers.slice(0, 4)
    return (
        <section className='LastSignUp'>
            <h2>Dernières Inscriptions</h2>
            {
                slicedUsers && slicedUsers.map((user, index) => {
                    return (
                        <div key={index} className="LastSignUp-user">
                            <img src={process.env.REACT_APP_BACKEND_SERVER_URL+`${user.photo}`} alt={`photo de ${user.lastName}`} className='LastSignUp-img' />
                            <Link to={`../user/?id=${user._id}`}><p className='LastSignUp-Name'>{user.firstName} {user.lastName}</p> </Link>
                        </div>
                    )
                })
            }
        </section>
    );
}

export default LastSignUp;

