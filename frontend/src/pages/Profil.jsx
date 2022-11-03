import React, { useState } from 'react';

import Header from '../components/Layout/Header';
import Footer from '../components/Layout/Footer';

import { accountServices } from '../utils/services/accountServices';

import { useDispatch, useSelector } from 'react-redux';
import { updateUser, uploadPhoto } from '../redux/actions/user.actions';
import { getUser } from '../redux/actions/user.actions';

import { Toaster } from 'react-hot-toast';
import { getUsers } from '../redux/actions/users.actions';

const Profil = () => {
    
    const dispatch = useDispatch();

    document.title = "Groupomania | Mon profil";
    const currentUser = useSelector((state) => state.userReducer).user;

    const [isEditing, setIsEditing] = useState(false);
    const [bio, setBio] = useState('');
    const [img, setImg] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null)

    const saveBio = async () => {
        await dispatch(updateUser(currentUser._id, bio))
        await dispatch(getUser(currentUser._id))
        setIsEditing(false);
    }

    const uploadPicture = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("name", currentUser.name);
        data.append("userId", currentUser._id);
        data.append("photo", img);
        await dispatch(uploadPhoto(currentUser._id, data));
        await dispatch(getUser(currentUser._id));
        setImg(null);
        await dispatch(getUsers())
    }

    const handlePhoto = (e) => {
        setImg(e.target.files[0]);
        setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <>
            <div><Toaster /></div>
            <Header />

            <main className='profile-page'>
                <div className='profile-title'>
                    <h2>Mon profil </h2>
                </div>
                <div className='profile'>
                    <section className='profile-infos'>
                        <h3>Mes informations :</h3>
                        <h4>Prenom : {currentUser.firstName}</h4>
                        <h4>Nom : {currentUser.lastName}</h4>
                        <h4>Email : {currentUser.hiddenEmail}</h4>
                        <h4>Inscrit le : {accountServices.transformDate(currentUser.createdAt)} </h4>
                        <span className='profile-infos-follow'> {
                            currentUser.followers.length > 1
                                ? <span>Followers</span>
                                : <span>Follower</span>
                        } : {currentUser.followers.length}</span>
                        <span className='profile-infos-follow'>{
                            currentUser.following.length > 1
                                ? <span>Abonnements</span>
                                : <span>Abonnement</span>
                        } : {currentUser.following.length}</span>
                    </section>
                    <section className='profile-bio'>
                        <h3>Ma bio :</h3>
                        {isEditing
                            ? (
                                <textarea className='profile-bio_textArea' defaultValue={currentUser.bio} onChange={(e) => setBio(e.target.value)}></textarea>
                            )
                            : (
                                currentUser.bio === ''
                                    ? <p className='profile-bio_paragraph'>Vous n'avez pas encore écrit de bio</p>
                                    : <p className='profile-bio_paragraph'>{currentUser.bio}</p>
                            )
                        }
                        <div className='profile-bio_buttons'>
                            {isEditing ? <button className='profile-bio_cancel' onClick={() => setIsEditing(false)}> Annuler </button> : <button className='profile-bio_edit' onClick={() => setIsEditing(true)}> Modifier / Ajouter </button>}
                            {isEditing && <button className='profile-bio_save' onClick={() => saveBio()}>Enregistrer les changements</button>}
                        </div>

                    </section>
                    <section className='profile-photo'>
                        <h3>Ma photo de profil :</h3>
                        {photoPreview !== null
                            ? <img src={photoPreview} alt="preview" className='profile-photo_img' />
                            : <img src={`${currentUser.photo}`} alt={`${currentUser.lastName}`} className='profile-photo_img' />
                        }

                        <form className="profile-photo_form">
                            <label htmlFor="profile-photo_upload">Changer de photo</label>
                            <input
                                type='file'
                                id='profile-photo_upload'
                                name='photo' accept='.jpg, .jpeg, .png'
                                className='profile-photo_edit'
                                onChange={(e) => handlePhoto(e)}
                            />
                            {img !== null
                                ? <button className='profile-photo_save' onClick={(e) => uploadPicture(e)}>Envoyer</button>
                                : <button className='profile-photo_save' disabled>Changer</button>
                            }
                        </form>
                    </section>
                </div>

            </main>
            <Footer />
        </>
    );
}

export default Profil;
