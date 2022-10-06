import React from 'react';

const EditPost = ({ postId, posterId, user, setIsEditing}) => {

    function editPost() {
        setIsEditing(true)
    }

        return (
            <div className='post-actionEdit'>
                {posterId === user._id ? <button className='post-editBtn' onClick={ () => editPost()}>Modifier votre publication</button> : null}
            </div>
        );
}

export default EditPost;
