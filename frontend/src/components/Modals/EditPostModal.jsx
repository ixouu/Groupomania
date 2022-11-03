import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';

import { editPost } from '../../redux/actions/post.actions';


const EditPostModal = ({ onClose, open, post }) => {

    //States
    const [newContent, setNewContent] = useState(post.content);
    const [editPostImg, setEditPostImg] = useState(null);
    const [editPostImgUrl, setEditPostImgUrl] = useState(null);
    const [newPostImg, setNewPostImg] = useState(null);
    const [newPostImgUrl, setNewPostImgUrl] = useState(null);
    const [currentImgUrl, setCurrentImgUrl] = useState(post.imageUrl);
    const [deletePostImg, setDeletePostImg] = useState(false);
    const [isTooShort, setIsTooShort] = useState(false);

    //Ref
    const textAreaRef = useRef(null)

    //Handle focus
    useEffect(() => {
        textAreaRef.current.focus();
    }, [])

    //Redux
    const dispatch = useDispatch();


    const handleEditPostImg = (e) => {
        setEditPostImg(e.target.files[0]);
        setEditPostImgUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleNewPostImg = (e) => {
        setNewPostImg(e.target.files[0]);
        setNewPostImgUrl(URL.createObjectURL(e.target.files[0]))
    }

    const handleDeletePostImg = (e) => {
        e.preventDefault();
        setEditPostImg(null);
        setEditPostImgUrl(null);
        setCurrentImgUrl(null);
        setDeletePostImg(true);
    }

    const handleCancelEdit = (e) => {
        e.preventDefault();
        setEditPostImg(null);
        setNewContent("");
        setCurrentImgUrl(post.imageUrl)
    }

    const handleContent = (e) => {
        setNewContent(e.target.value)
        if (textAreaRef.current.value.length > 3) {
            setIsTooShort(false);
        }
    }

    const handleEditPost = async (e) => {
        e.preventDefault();
        if (textAreaRef.current.value.length < 3) {
            setIsTooShort(true);
            return
        }

        const data = {
            posterId: post.posterId,
            content: newContent
        }
        const imageUrl = { imageUrl: null }
        deletePostImg && Object.assign(data, imageUrl)
        const dataWithImg = new FormData();
        dataWithImg.append("posterId", post.posterId);
        dataWithImg.append("content", newContent);
        editPostImg && dataWithImg.append('file', editPostImg);
        newPostImg && dataWithImg.append('file', newPostImg);
        if (window.confirm('Êtes-vous sûr de vouloir modifier ce post ?') === true) {
            if (newPostImg !== null || editPostImg !== null) {
                await dispatch(editPost(post._id, dataWithImg));
            } else {
                await dispatch(editPost(post._id, data));
            }
            setEditPostImg(null);
            setNewContent(post.content);
            setCurrentImgUrl(post.imageUrl);
            setDeletePostImg(false);
            setIsTooShort(false);
            onClose();
        } else {
            return
        }
    }


    return ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={onClose}></div>
            <div className='editPostModal'>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <form>
                    <label htmlFor="editPostModal-textArea"> Modifiez votre publication :</label>
                    <textarea
                        name="editPostModal-textArea"
                        id='editPostModal-textArea'
                        defaultValue={post.content}
                        onChange={(e) => handleContent(e)}
                        ref={textAreaRef}
                    ></textarea>
                    {/* ERROR RENDER */}
                    {isTooShort && <p className='editPostModal-error'>Vous message est trop court !</p>}
                    {/* DISPLAY THE NEW IMAGE TO POST WHEN NONE WAS IN THE POST */}
                    {newPostImg && <img className="editPostModal-previewImg" src={newPostImgUrl} alt="Previsualiton de la nouvelle image du post" style={{ maxWidth: '300px' }}></img>}
                    {currentImgUrl
                        ? (<div className='editPostModal-imgContainer'>
                            {editPostImg && <img src={editPostImgUrl} alt="Image du post" style={{ maxWidth: '300px' }}></img>}
                            {!editPostImg && <img src={post.imageUrl} alt="Image du post" style={{ maxWidth: '300px' }}></img>}
                            <div className='imgContainer-btns'>
                                <label
                                    htmlFor="editPostModal-uploadImg"
                                    className='btn editPostModal-labelUploadImg'
                                >Modifier mon image</label>
                                <input
                                    type='file'
                                    id='editPostModal-uploadImg'
                                    name='image'
                                    onChange={(e) => handleEditPostImg(e)}
                                ></input>
                                <button
                                    className='editPostModal-deleteImgBtn btn'
                                    onClick={(e) => handleDeletePostImg(e)}
                                >Supprimer mon image</button>
                            </div>
                        </div>)
                        // POST DOESNT HAVE AN IMAGE YET
                        : (<div className='editPostModal-imgContainer'>
                            <label
                                htmlFor="editPostModal-addImg"
                                className='btn editPostModal-labelUploadImg'
                            >{newPostImg ? 'Changer d\'image' : 'Ajouter une image'}</label>
                            <input
                                type='file'
                                id='editPostModal-addImg'
                                name='image'
                                accept='image/*'
                                onChange={(e) => handleNewPostImg(e)}
                            ></input>
                        </div>)
                    }
                    {/* EDIT FORM BUTTONS */}
                    <div className='editPostModal-editBtnContainer'>
                        <button
                            className='editPostModal-editBtn btn'
                            onClick={(e) => handleCancelEdit(e)}
                        >Annuler l'édition</button>
                        <button
                            className='editPostModal-confirmBtn btn'
                            onClick={(e) => handleEditPost(e)}
                        >Valider les changements</button>
                    </div>
                </form>
            </div>
        </>,
        document.getElementById('portal')
    );

}

export default EditPostModal;