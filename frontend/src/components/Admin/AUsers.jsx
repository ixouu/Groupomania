import React, {useState} from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch} from 'react-redux';
import { adminUpdateUser  } from '../../redux/actions/users.actions'

const AUsers = ({users}) => {

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [currentUserId, setCurrentUserId] = useState('');
    const [userToEdit, setUserToEdit] = useState(null);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [photo, setPhoto] = useState('');
    const [isPhoto, setIsPhoto] = useState(true);
    
    const validateDelete = () => toast.success('Post supprimé', {
        duration : 2000
    })
    const validateUpdate = () => toast.success('Post edité', {
        duration : 2000
    })

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Êtes-vous sûr de vouloir bannir cet utilisateur? ') === true) {
            console.log("delete")
        } else {
            return
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setCurrentUserId(e.target.closest('section').id);
        console.log(currentUserId);
        const userToFilter = users.filter(user => user._id === currentUserId)
        setUserToEdit(userToFilter)
        setFirstName(userToEdit[0].firstName);
        setLastName(userToEdit[0].lastName);
        setBio(userToEdit[0].bio);
        setPhoto(userToEdit[0].photo);
        setIsEditing(true);
    }

    const cancelUpdate = () => {
        setIsEditing(false);
        
    }

    const updateUser = (e) => {
        e.preventDefault();
        const data = {
            firstName,
            lastName,
            bio,
            photo 
        }
        if (window.confirm('Êtes-vous sûr de vouloir modifier cet utilisateur? ') === true) {
            dispatch(adminUpdateUser(currentUserId, data));
            validateUpdate();
            cancelUpdate();
        } else {
            return
        }
    }

    return (
        <>  
            {isEditing && 
                <div className='aUser-updateForm_container'>
                <h2>Edition de {userToEdit[0].firstName} {userToEdit[0].lastName}</h2>
                <form className='aUser-updateForm'>
                    <label htmlFor="aUser-updateForm_firstName">Prenom</label>
                    <input 
                    type="text" 
                    defaultValue={userToEdit[0].firstName} 
                    id='aUser-updateForm_firstName'
                    onChange={(e) => setFirstName(e.target.value)}
                    />
                    <label htmlFor="aUser-updateForm_lastName">Nom</label>
                    <input 
                    type="text" 
                    defaultValue={userToEdit[0].lastName} 
                    id='aUser-updateForm_lastName'
                    onChange={(e) => setLastName(e.target.value)}
                    />
                    <label htmlFor="aUser-updateForm_bio">Bio</label>
                    <textarea 
                    id='aUser-updateFrom_bio' 
                    defaultValue={userToEdit[0].bio}
                    onChange={(e) => setBio(e.target.value)}
                    />
                    {isPhoto
                    ? <img src={userToEdit[0].photo} alt="Photo de l'utilisateur"/> 
                    : <img src='http://localhost:5000/upload/profile/random-user.png' alt="Photo de l'utilisateur"/>
                    }
                    <div className='aUser-btnContainer'>
                        <button 
                            className='btn aUser-cancelBtn'
                        >Annuler l'édition
                        </button>
                        <button onClick={ (e) => {
                            setIsPhoto(false); 
                            setPhoto('http://localhost:5000/upload/profile/random-user.png'); 
                            e.preventDefault();
                            }}
                            className='btn aUser-deleteBtn'
                        >Supprimer la photo
                        </button>
                        <button
                            className='btn aUser-UpdateBtn'
                            onClick={ (e) => updateUser(e) }
                        >Valider les Modifications
                        </button>
                    </div>
                    
                </form>
                </div>
            }
            {users.map((user) => {
                return (
                    <section key={user._id} id={user._id} className='admin-user'>
                        <button className='admin-user_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
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
