import React, { useState } from 'react';
import EditPostModal from '../Modals/EditPostModal';

const EditPost = ({ post }) => {

    const [isOpen, setIsOpen] = useState(false)

    const displayEditModal = (e) => {
        e.preventDefault();
        setIsOpen(true);
    }

    return (<>
        <button className='post-editBtn' onClick={(e) => displayEditModal(e)}>Modifier votre publication</button>
        {isOpen && <EditPostModal open={isOpen} onClose={() => setIsOpen(false)} post={post} />}
    </>
    );
}

export default EditPost;
