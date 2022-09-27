import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getUsers } from '../../redux/actions/user.actions';

const LastSignUp = () => {

    const users = useSelector((state) => state.usersReducer)

    return (
        <section className='LastSignUp'>
            <h2>Dernières Inscriptions</h2>
            {
                users.map((user, index) =>{
                    return (
                        <div key={index} className="LastSignUp-user">
                            <img src={`${user.photo}`} alt={`photo de ${user.lastName}`} className='LastSignUp-img'/>
                            <Link to={`../user/?id=${user._id}`}><p className='LastSignUp-Name'>{user.firstName} {user.lastName}</p> </Link>
                        </div>
                        )
                })
            }
        </section>
    );
}

export default LastSignUp;
