import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { adminDeletePost } from '../../redux/actions/post.actions';
import toast, { Toaster } from 'react-hot-toast';
import { adminEditPost } from '../../redux/actions/post.actions';

const APosts = ({ posts }) => {

    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [currentPostId, setCurrentPostId] = useState('');


    const handleDelete = (e) => {
        e.preventDefault();
        const postId = e.target.closest('section').id
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post? ') === true) {
            dispatch(adminDeletePost(postId));
        } else {
            return
        }
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        const section = e.target.closest('section')
        const content = section.querySelector('.admin-post_content').innerText
        setPostContent(content);
        setCurrentPostId(e.target.closest('section').id);
        setIsEditing(true);
    }

    const handleDeleteImg = async (e) => {
        e.preventDefault();
        const postId = e.target.closest('section').id
        const data = {
            imageUrl: ''
        }
        if (window.confirm('Êtes-vous sûr de vouloir supprimer cette image ?') === true) {
            await dispatch(adminEditPost(postId, data));
            cancelUpdate();
        } else {
            return
        }
    }

    const sumbitUpdate = async (e) => {
        e.preventDefault()
        const data = {
            content: postContent
        }
        if (window.confirm('Êtes-vous sûr de vouloir modifier ce post ?') === true) {
            await dispatch(adminEditPost(currentPostId, data));
            cancelUpdate();
        } else {
            return
        }
    }

    const cancelUpdate = () => {
        setIsEditing(false);
        setPostContent('');
        setCurrentPostId('');
    }

    return (
        <>
            <div><Toaster /></div>
            {isEditing &&
                <form className='admin-post_form'>
                    <label htmlFor="admin-post_textarea" className='admin-post_label'>Edition du post</label>
                    <textarea id="admin-post_textarea" value={postContent} onChange={(e) => setPostContent(e.target.value)} ></textarea>
                    <button className='admin-post_btnCancel' onClick={() => cancelUpdate()}><i className="fa-solid fa-arrow-rotate-left"></i></button>
                    <button className='admin-post_btnSend' onClick={(e) => sumbitUpdate(e)}><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            }
            {posts.map((post) => {
                return (
                    <section key={post._id} id={post._id} className='admin-post'>
                        <button className='admin-post_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
                        <button className='admin-post_update' onClick={(e) => handleUpdate(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <p className='admin-post_content'>{post.content}</p>
                        {post.imageUrl &&
                            <div className='admin-post_imgContainer'>
                                <img src={process.env.REACT_APP_BACKEND_SERVER_URL+`${post.imageUrl}`} alt="Image du post" className='admin-post_img' />
                                <div className='admin-post_imgBtnContainer'>
                                    <button className='btn admin-post_deleteImgBtn' onClick={(e) => handleDeleteImg(e)}>Supprimer la photo</button>
                                </div>
                            </div>}
                    </section>
                )
            })
            }
        </>
    );
}

export default APosts;
