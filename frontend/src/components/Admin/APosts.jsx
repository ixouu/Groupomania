import React from 'react';
import { useDispatch } from 'react-redux';
import { deletePost } from '../../redux/actions/post.actions';
import toast, { Toaster } from 'react-hot-toast'; 

const APosts = ({ posts }) => {
    
    const dispatch = useDispatch();

    const validateDelete = () => toast.success('Post supprimé', {
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

    return (
        <>
            <div><Toaster/></div>
            {posts.map((post) => {
                return (
                    <section key={post._id} id={post._id} className='admin-post'>
                        <button className='admin-post_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
                        <p className='admin-post_content'>{post.content}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default APosts;
