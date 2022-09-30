import React from 'react';
import toast, { Toaster } from 'react-hot-toast';

const AUsers = ({users}) => {
    
    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Êtes-vous sûr de vouloir bannir cet utilisateur? ') === true) {
            console.log("delete")
        } else {
            return
        }
    }

    return (
        <>
            {users.map((user) => {
                return (
                    <section key={user._id} className='admin-user'>
                        <button className='admin-user_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
                        <p>{user.firstName} {user.lastName}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default AUsers;
