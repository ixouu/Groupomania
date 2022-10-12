import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteComment, updateComment } from '../../redux/actions/comment.actions';
import toast, { Toaster } from 'react-hot-toast';


const AComments = ({ comments }) => {

    const dispatch = useDispatch()

    const [isUpdating, setIsUpdating] = useState(false);
    const [commentContent, setCommentContent] = useState('');
    const [currentCommentId, setCurrentCommentId] = useState('')


    const validateDelete = () => toast.success('Commentaire supprimé', {
        duration: 2000
    })
    const validateUpdate = () => toast.success('Commentaire édité', {
        duration: 2000
    })

    const handleDelete = (e) => {
        e.preventDefault();
        const commentId = e.target.closest('section').id
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce commentaire ?') === true) {
            dispatch(deleteComment(commentId));
            validateDelete();
        } else {
            return
        }
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        setIsUpdating(true);
        setCommentContent(e.target.closest('section').innerText);
        setCurrentCommentId(e.target.closest('section').id)
    }

    const cancelUpdate = () => {
        setIsUpdating(false);
        setCommentContent('');
        setCurrentCommentId('');
    }

    const sumbitUpdate = (e) => {
        e.preventDefault();
        const data = {
            content: commentContent
        }
        if (window.confirm('Êtes-vous sûr de vouloir modifier ce commentaire ?') === true) {
            dispatch(updateComment(currentCommentId, data));
            cancelUpdate();
            validateUpdate();
        } else {
            return
        }
    }

    return (
        <>
            <div><Toaster /></div>
            {isUpdating &&
                <form className='admin-comment_form'>
                    <label htmlFor="admin-comment_textarea" className='admin-comment_label'>Edition du commentaire</label>
                    <textarea id="admin-comment_textarea" value={commentContent} onChange={(e) => setCommentContent(e.target.value)}></textarea>
                    <button className='admin-comment_btnCancel' onClick={() => cancelUpdate()}><i className="fa-solid fa-arrow-rotate-left"></i></button>
                    <button className='admin-comment_btnSend' onClick={(e) => sumbitUpdate(e)}><i className="fa-solid fa-paper-plane"></i></button>
                </form>
            }
            {comments.map((comment) => {
                return (
                    <section key={comment._id} id={comment._id} className='admin-comment'>
                        <button className='admin-comment_delete' onClick={(e) => handleDelete(e)}><i className="fa-solid fa-xmark"></i></button>
                        <button className='admin-comment_update' onClick={(e) => handleUpdate(e)}><i className="fa-solid fa-pen-to-square"></i></button>
                        <p className='admin-comment_content'>{comment.content}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default AComments;