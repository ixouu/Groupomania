import {useState} from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { likePost } from '../../redux/actions/post.actions';
import { getPosts } from '../../redux/actions/posts.actions';
import { createComment, getComments } from '../../redux/actions/comment.actions';

import { accountServices } from '../../utils/services/accountServices';

import toast, { Toaster } from 'react-hot-toast';

const Post = ({posterId, postId, content, imageUrl, createdAt,likes }) => {

    // REDUX
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer);
    const user = useSelector((state)=> state.userReducer).user;
    const allComments = useSelector((state) => state.commentReducer)

    // HOT TOAST 
    const validateComment = () => toast.success('Commentaire ajouté',{
        duration : 2000,
    })
    const validateLike= () => toast.success('Like ajouté',{
        duration : 2000,
    })
    const validateUnlike= () => toast.success('Like supprimé',{
        duration : 2000,
    })
    
    // POSTS
    const author = users.find((user) =>  user._id === posterId);
    const date = accountServices.transformDate(createdAt);
    const time = accountServices.getTime(createdAt);

    // COMMENTS
    const [postingComment, setPostingComment] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentsList , setShowCommentsList] = useState(false);
    const [errorComment, setErrorComment] = useState(false);

    const handleShowCommentsButton = () => {
        showCommentsList ? setShowCommentsList(false) : setShowCommentsList(true) 
    }

    const handleAddCommentButton = () => {
        postingComment ? setPostingComment(false) : setPostingComment(true) 
    }

    const handleSumbitComment = async (e) => {
        e.preventDefault();
        if (comment.length > 400 || comment === undefined){
            return setErrorComment(true);
        } else{
            const data = {
                userId : user._id,
                post : postId,
                content : comment
            } 
            await dispatch(createComment(data));
            await dispatch(getPosts());
            await dispatch(getComments());
            validateComment();
            setComment('');
            setPostingComment(false);
        }
    }

    const findPostComments = () => {
        let postCommentsFound = [];
        allComments.forEach((comment) => {
            if ( postId === comment.post._id){
                postCommentsFound.push(comment)
            }
        })
        return postCommentsFound
    }


    const findCommentUserName = (userId) => {
        const userToFind = users.filter(user => user._id === `${userId}`);
        const userFirstName = userToFind[0].firstName
        const userLastName = userToFind[0].lastName
        return `${userFirstName} ${userLastName}` 
    }   

    const commentsList = () => {
        // If no comments to display 
        if (findPostComments().length === 0) {
            return (
                <div className='post-commentsList'>
                    <h4> Pas de commentaires à afficher</h4>
                </div>
            )
        }
        // If comments to display
        return (
            <div className='post-commentsList'>
                {findPostComments().length === 1 
                    ? <h4>Commentaire :</h4> 
                    : <h4>Commentaires :</h4>
                }
            {
                findPostComments().map((comment) =>{
                    return (
                        <div key={comment._id}className='post-comment_container'>
                            <h5>{findCommentUserName(comment.userId)}</h5>
                            <span>Posté le {accountServices.transformDate(comment.createdAt)} à {accountServices.getTime(comment.createdAt)}</span>
                            <p className='post-comment_content'>{comment.content}</p>
                        </div>
                    )
                })
            }
            </div>   
            )
    } 

    // LIKES
    const handleSumbitLike = async (e) => {
        e.preventDefault();
        if (likes.includes(user._id)){
            const data = {
                userId : user._id,
                like : 0
            };
            await dispatch(likePost(postId, data));
            await dispatch(getPosts());
            validateUnlike();
        } else {
            const data = {
                userId : user._id,
                like : 1
            };
            await dispatch(likePost(postId, data));
            await dispatch(getPosts());
            validateLike();
        }
    }

    const likeButton = () => {
        if (likes.includes(user._id)){
            return (
                <button
                    onClick = {(e) => handleSumbitLike(e)}
                    style = {{ color: "#0511F2" , fontWeight : '600'}}
                ><i class="fa-solid fa-thumbs-up"></i>J'aime</button>
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
                <span 
                style={{ color : "#0511F2", fontWeight : '600'}}
                ><i class="fa-solid fa-heart"></i> Vous et {likes.length} </span>
            )
        }
        else {
            return (
                <span><i class="fa-regular fa-heart"></i> {likes.length}</span>
            )
        }
    }

    // POST 
    return (
        <div className='postContainer' id={postId}>
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
                        <span 
                            onClick={() => handleShowCommentsButton()}
                            className = "post-showComments"
                        >{findPostComments().length} {findPostComments().length > 1
                        ? <span> commentaires</span>
                        : <span> commentaire</span>
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
                            onChange = {(e)=> setComment(e.target.value)}
                        ></textarea>
                        <button 
                            className='sendComment'
                            onClick={(e) => handleSumbitComment(e)}
                        ><i class="fa-solid fa-paper-plane"></i></button>
                    </form>
                    {errorComment && <p>Votre commentaire est trop long, 400 caratères maximum svp</p>}
                </div>
            }
            {showCommentsList && commentsList()}
        </div>
    );
}

export default Post;