import React from 'react';
import { Toaster } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/post.actions';

const DeletePost = ({ postId, posterId, user }) => {

    const dispatch = useDispatch();

    const handleDelete = async () => {
        const data = {
            authorId: user._id
        }
        if (window.confirm('Êtes-vous sûr de vouloir supprimer votre post? ') === true) {
            await dispatch(deletePost(postId, data));
           
        } else {
            return
        }
    }

    return (
        <>
            <div><Toaster /></div>
            <div className='post-actionDelete'>
                {posterId === user._id ? <button className='post-deleteBtn' onClick={() => handleDelete()}>Supprimer votre publication</button> : null}
            </div>
        </>
    );
}

export default DeletePost;
