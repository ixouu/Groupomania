import React, {useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { likePost } from '../../redux/actions/post.actions';
import { getPosts } from '../../redux/actions/posts.actions';

import { accountServices } from '../../utils/services/accountServices';


const Post = ({posterId, postId, content, imageUrl, createdAt, comments,likes }) => {

    const [postingComment, setPostingComment] = useState(false);
    const [comment, setComment] = useState('');

    const [isLike, setIsLike] = useState(false);

    const users = useSelector((state) => state.usersReducer);
    const user = useSelector((state)=> state.userReducer).user;

    const author = users.find((user) =>  user._id === posterId);
    const date = accountServices.transformDate(createdAt);
    const time = accountServices.getTime(createdAt);

    const dispatch = useDispatch();

    const handleAddCommentButton = () => {
        postingComment ? setPostingComment(false) : setPostingComment(true) 
    }

    const handleSumbitComment = () => {

    }

    const handleSumbitLike = async (e) => {
        e.preventDefault();
        if (likes.includes(user._id)){
            const data = {
                userId : user._id,
                like : 0
            };
            await dispatch(likePost(postId, data));
            await dispatch(getPosts());

        } else {
            const data = {
                userId : user._id,
                like : 1
            };
            await dispatch(likePost(postId, data));
            await dispatch(getPosts());
        }
    }

    const likeButton = () => {
        if (likes.includes(user._id)){
            return (
                <button
                    onClick = {(e) => handleSumbitLike(e)}
                    style = {{ color: "#0511F2"}}
                ><i class="fa-regular fa-thumbs-up"></i>J'aime</button>
            )
        } else {
            
            return (
                <button
                    onClick = {(e) => handleSumbitLike(e)}
                ><i class="fa-regular fa-thumbs-up"></i>J'aime</button>
            )
        }
    }

    const likeLength = () => {
        if (likes.includes(user._id)){
            return (
                <span style={{ color : "#0511F2"}}><i class="fa-regular fa-heart"></i> Vous et {likes.length} </span>
            )
        }
        else {
            return (
                <span><i class="fa-regular fa-heart"></i> {likes.length}</span>
            )
        }
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
                        {likeLength()}
                    </div>
                    <div className="post-likes_addLike">
                       {likeButton()}
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
                        <button 
                            onClick={() => handleAddCommentButton()}
                        ><i class="fa-regular fa-message"></i> Commenter</button>
                    </div>
                </div>
            </div>
            {postingComment && 
                <div className='post-newComment'>
                    <form>
                        <textarea 
                            name = "comment" 
                            id = "newComment" 
                            placeholder = 'Commenter...'
                            value = {comment}
                            onChange = {()=> setComment()}
                        ></textarea>
                        <button 
                            className='sendComment'
                            onClick={() => handleSumbitComment()}
                        ><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                </div>
            }
        </div>
    );
}

export default Post;
