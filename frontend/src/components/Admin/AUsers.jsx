import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminUpdateUser } from '../../redux/actions/users.actions'

const AUsers = ({ users }) => {

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('');
    const [userToEdit, setUserToEdit] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');
    const [isPhoto, setIsPhoto] = useState(true);



    const handleUpdate = (e) => {
        e.preventDefault();
        if (isEditing === true) {
            setFirstName('');
            setLastName('');
            setBio('');
            setPhoto('');
            setIsEditing(false)
        }
        const userToFilter = users.filter(user => user._id === e.target.closest('section').id);
        setUserToEdit(userToFilter[0])
        setFirstName(userToFilter[0].firstName);
        setLastName(userToFilter[0].lastName);
        setCurrentUserId(userToFilter[0]._id);
        setBio(userToFilter[0].bio);
        setPhoto([0].photo);
        setIsEditing(true);
    }

    const cancelUpdate = () => {
        setIsEditing(false);
    }

    const updateUser = (e) => {
        e.preventDefault();
        const dataWithPhoto = {
            firstName,
            lastName,
            bio,
            photo
        }
        const data = {
            firstName,
            lastName,
            bio,
        }
        if (window.confirm('Êtes-vous sûr de vouloir modifier cet utilisateur? ') === true) {
            photo === undefined ? dispatch(adminUpdateUser(currentUserId, data)) : dispatch(adminUpdateUser(currentUserId, dataWithPhoto))
            cancelUpdate();
        } else {
            return
        }
    }

    return (
        <>
            {isEditing &&
                <div className='aUser-updateForm_container'>
                    <h2>Edition de {firstName} {lastName}</h2>
                    <form className='aUser-updateForm'>
                        <label htmlFor="aUser-updateForm_firstName">Prenom</label>
                        <input
                            type="text"
                            defaultValue={firstName}
                            id='aUser-updateForm_firstName'
                            onChange={(e) => setFirstName(e.target.value)}
                        />
                        <label htmlFor="aUser-updateForm_lastName">Nom</label>
                        <input
                            type="text"
                            defaultValue={lastName}
                            id='aUser-updateForm_lastName'
                            onChange={(e) => setLastName(e.target.value)}
                        />
                        <label htmlFor="aUser-updateForm_bio">Bio</label>
                        <textarea
                            id='aUser-updateFrom_bio'
                            defaultValue={bio}
                            onChange={(e) => setBio(e.target.value)}
                        />
                        {isPhoto
                            ? <img src={userToEdit.photo} alt="Photo de l'utilisateur" />
                            : <img src='http://localhost:5000/upload/profile/random-user.png' alt="Photo de l'utilisateur" />
                        }
                        <div className='aUser-btnContainer'>
                            <button
                                className='btn aUser-cancelBtn'
                            >Annuler l'édition
                            </button>
                            <button onClick={(e) => {
                                setIsPhoto(false);
                                setPhoto('http://localhost:5000/upload/profile/random-user.png');
                                e.preventDefault();
                            }}
                                className='btn aUser-deleteBtn'
                            >Supprimer la photo
                            </button>
                            <button
                                className='btn aUser-UpdateBtn'
                                onClick={(e) => updateUser(e)}
                            >Valider les Modifications
                            </button>
                        </div>

                    </form>
                </div>
            }
            {users.map((user) => {
                return (
                    <section key={user._id} id={user._id} className='admin-user'>
                        <button className='admin-user_update' onClick={(e) => handleUpdate(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <p>{user.firstName} {user.lastName}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default AUsers;
