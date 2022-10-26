import { useState } from 'react';

const CommentBtn = () => {

    const [postingComment, setPostingComment] = useState(false);
    const handleAddCommentButton = () => {
        postingComment ? setPostingComment(false) : setPostingComment(true)
    }

    return (
        <button
            onClick={() => handleAddCommentButton()}
        ><i className="fa-regular fa-message"></i> Commenter</button>
    );
}

export default CommentBtn;
