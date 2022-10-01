import React, {useState} from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/post.actions';
import toast, { Toaster } from 'react-hot-toast'; 
import { adminEditPost } from '../../redux/actions/post.actions';

const APosts = ({ posts }) => {
    
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [postContent, setPostContent] = useState('');
    const [currentPostId, setCurrentPostId] = useState('');

    const validateDelete = () => toast.success('Post supprimé', {
        duration : 2000
    })
    const validateUpdate = () => toast.success('Post edité', {
        duration : 2000
    })

    const handleDelete = (e) => {
        e.preventDefault();
        const postId = e.target.closest('section').id
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post? ') === true) {
            dispatch(deletePost(postId));
            validateDelete();
        } else {
            return
        }
    }
    const handleUpdate = (e) => {
        e.preventDefault();
        setPostContent(e.target.closest('section').innerText);
        setCurrentPostId(e.target.closest('section').id);
        setIsEditing(true);
    }

    const sumbitUpdate = async (e) => {
        e.preventDefault()
        const data = {
            content : postContent
        }
        if (window.confirm('Êtes-vous sûr de vouloir modifier ce post ?') === true) {
            await dispatch(adminEditPost(currentPostId, data));
            cancelUpdate();
            validateUpdate();
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
            <div><Toaster/></div>
            {isEditing && 
                <form className='admin-post_form'>
                    <label htmlFor="admin-post_textarea" className='admin-post_label'>Edition du post</label>
                    <textarea id="admin-post_textarea" value={postContent} onChange={(e) => setPostContent(e.target.value)}></textarea>
                    <button className='admin-post_btnCancel' onClick={() => cancelUpdate()}><i class="fa-solid fa-arrow-rotate-left"></i></button>
                    <button className='admin-post_btnSend' onClick={ (e) => sumbitUpdate(e)}><i class="fa-solid fa-paper-plane"></i></button>
                </form>
            }
            {posts.map((post) => {
                return (
                    <section key={post._id} id={post._id} className='admin-post'>
                        <button className='admin-post_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
                        <button className='admin-post_update' onClick={(e) => handleUpdate(e)}><i class="fa-solid fa-pen-to-square"></i></button>
                        <p className='admin-post_content'>{post.content}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default APosts;
