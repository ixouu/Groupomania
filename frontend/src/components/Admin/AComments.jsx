import React, {useEffect, useState}from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteComment, getComments } from '../../redux/actions/comment.actions';



const AComments = ({ comments }) => {

    const dispatch = useDispatch()
    const [isDeleted, setIsDeleted] = useState(false)


    const handleDelete = (e) => {
        e.preventDefault();
        if(isDeleted) setIsDeleted(false)
        const commentId = e.target.closest('section').id
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post? ') === true) {
           dispatch(deleteComment(commentId))
           setIsDeleted(true)
        } else {
            return
        }
    }

    return (
           <>
            {comments.map((comment) => {
                return (
                    <section key={comment._id} id={comment._id} className='admin-comment'>
                        <button className='admin-comment_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
                        <p className='admin-comment_content'>{comment.content}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default AComments;
