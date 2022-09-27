import React from 'react';

const AComments = ({ comments }) => {
    console.log(comments)

    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post? ') === true) {
            console.log("delete")
        } else {
            return
        }
    }

    return (
           <>
            {comments.map((comment) => {
                return (
                    <section key={comment._id} className='admin-comment'>
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
