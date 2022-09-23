import React, {useState} from 'react';
import { useSelector } from 'react-redux';

import { accountServices } from '../../utils/services/accountServices';

const Post = ({posterId, content, imageUrl, createdAt, comments,likes }) => {

    const [postingComment, setPostingComment] = useState(false);


    const users = useSelector((state) => state.usersReducer);
    const author = users.find((user) =>  user._id === posterId);
    const date = accountServices.transformDate(createdAt);
    const time = accountServices.getTime(createdAt);

    const handleAddCommentButton = () => {
        
    }
    

    return (
        <div className='postContainer'>
            <div className="postContainer-header">
                <img src={`${author.photo}`} alt={`photo de ${author.lastName}`} className='post-author_photo'/>
                <h2 className='post-author'>{author.firstName} {author.lastName}</h2>
                <span className='post-date'>Posté le {date} à {time}</span>
            </div>
            <div className="postContainer-content">
                <p className='post-content'>{content}</p>
                {imageUrl && <img src={`${imageUrl}`} alt='img' className='post-img'/>}
            </div>
            <div className='postContainer-footer'>
                <div className="post-likes">
                    <div className="post-likes_count">
                        <span><i class="fa-regular fa-heart"></i> {likes.length}</span>
                    </div>
                    <div className="post-likes_addLike">
                        <button><i class="fa-regular fa-thumbs-up"></i>Aimer la publication</button>
                    </div>
                </div>
                <div className="post-comments">
                    <div className="post-comments_count">
                        <span>{comments.length} {comments.length > 1
                        ? <span> commentaires</span>
                        : <span>commentaire</span>
                        }</span>
                    </div>
                    <div className="post-comment_addComment">
                        <button onClick={() => setPostingComment(true)}><i class="fa-regular fa-message"></i> Commenter</button>
                    </div>
                </div>
            </div>
            {postingComment && 
                <div className='post-newComment'>
                    <form>
                        <textarea name="comment" id="newComment" placeholder='Commenter...'></textarea>
                        <button className='sendComment'><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Post;
