
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import LikesPhotos from './LikesPhotos';

import DeletePost from './DeletePost'
import EditPost from './EditPost';

import { useSelector, useDispatch } from 'react-redux';
import { likePost, getPosts, dislikePost } from '../../redux/actions/post.actions';
import { getComments } from '../../redux/actions/comment.actions';
import { createComment } from '../../redux/actions/comment.actions';

import { accountServices } from '../../utils/services/accountServices';

import toast from 'react-hot-toast';


const Post = ({ post, posterId, postId, content, imageUrl, createdAt, likes }) => {

    // REDUX
    const dispatch = useDispatch();
    const users = useSelector((state) => state.usersReducer);
    const user = useSelector((state) => state.userReducer).user
    const allComments = useSelector((state) => state.commentReducer).comments;

    // TOAST 
    const validateComment = () => toast.success('Commentaire ajouté', {
        duration: 2000,
    })
    const validateLike = () => toast.success('Like ajouté', {
        duration: 2000,
    })
    const validateUnlike = () => toast.success('Like supprimé', {
        duration: 2000,
    })

    // POSTS
    const author = users.find((user) => user._id === posterId);
    const date = accountServices.transformDate(createdAt);
    const time = accountServices.getTime(createdAt);

    // COMMENTS
    const [postingComment, setPostingComment] = useState(false);
    const [comment, setComment] = useState('');
    const [showCommentsList, setShowCommentsList] = useState(false);
    const [errorComment, setErrorComment] = useState(false);


    const handleShowCommentsButton = () => {
        showCommentsList ? setShowCommentsList(false) : setShowCommentsList(true)
    }

    const handleAddCommentButton = () => {
        postingComment ? setPostingComment(false) : setPostingComment(true)
    }

    const handleSumbitComment = async (e) => {
        e.preventDefault();
        if (comment.length > 400 || comment === undefined) {
            return setErrorComment(true);
        } else {
            const data = {
                userId: user._id,
                post: postId,
                content: comment
            }

            await dispatch(createComment(data))
            dispatch(getPosts())
            dispatch(getComments())
            findPostComments();
            validateComment();
            setComment('');
            setPostingComment(false);
        }
    }

    const findPostComments = () => {
        let postCommentsFound = [];
        allComments.forEach((comment) => {
            if (postId === comment.post._id) {
                postCommentsFound.push(comment)
            } else {
                return
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
                    findPostComments().map((comment) => {
                        return (
                            <div key={comment._id} className='post-comment_container'>
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
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        if (likes.includes(user._id)) {
            setLiked(true);
        }
        else setLiked(false)
    }, [liked, likes, user._id])

    const handleSumbitLike = (e) => {
        e.preventDefault();
        const data = {
            userId: user._id,
            like: 1,
        };
        dispatch(likePost(postId, data, user._id));
        setLiked(true);
        validateLike();
    }

    const handleSumbitDislike = (e) => {
        e.preventDefault();
        const data = {
            userId: user._id,
            like: 0,
        };
        dispatch(dislikePost(postId, data, user._id));
        setLiked(false);
        validateUnlike();
    }
    // POST 
    return (
        <div className='postContainer' id={`${postId}`}>
            <div className="postContainer-header">
                <img src={`${author.photo}`} alt={`photo de ${author.lastName}`} className='post-author_photo' />
                <Link to={`../user/?id=${author._id}`}><p className='post-author'>{author.firstName} {author.lastName}</p></Link>
                <span className='post-date'>Posté le {date} à {time}</span>
            </div>
            {/* CONTENT  */}
            <div className="postContainer-content">
                <p className='post-content'>{content}</p>
                {imageUrl && <img src={`${imageUrl}`} alt='img' className='post-img' />}
            </div>
            <div className='postContainer-footer'>

                <div className="post-counts">
                    <LikesPhotos likes={likes} likesLength={likes.length} />
                    <span className='likes_count'>{likes.length} J'aime</span>
                    <span onClick={() => handleShowCommentsButton()} className="post-showComments">
                        {findPostComments().length} {findPostComments().length > 1
                            ? <span> commentaires</span>
                            : <span> commentaire</span>}
                    </span>
                </div>
                <div className="post-actions">
                    {/* Add Like */}
                    <div className="post-actions_addLike">
                        {liked && (
                            <button
                                onClick={(e) => handleSumbitDislike(e)}
                                style={{ color: "#222F40", fontWeight: '600' }}
                            ><i className="fa-solid fa-thumbs-up"></i>J'aime
                            </button>
                        )}
                        {liked === false && (
                            <button
                                onClick={(e) => handleSumbitLike(e)}
                            ><i className="fa-regular fa-thumbs-up"></i>J'aime
                            </button>
                        )}
                    </div>
                    {/* Add comment */}
                    <div className="post-action_addComment">
                        <button
                            onClick={() => handleAddCommentButton()}
                        ><i className="fa-regular fa-message"></i> Commenter</button>
                    </div>
                </div>
            </div>
            {postingComment &&
                <div className='post-newComment'>
                    <form>
                        <textarea
                            name="comment"
                            id="newComment"
                            placeholder='Commenter...'
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                        ></textarea>
                        <button
                            className='sendComment'
                            onClick={(e) => handleSumbitComment(e)}
                        ><i className="fa-solid fa-paper-plane"></i></button>
                    </form>
                    {errorComment && <p>Votre commentaire est trop long, 400 caratères maximum svp</p>}
                </div>
            }
            {showCommentsList && commentsList()}
            {posterId === user._id
                ? <div className='post-actionEdit'>
                    <EditPost post={post} />
                    <DeletePost postId={postId} posterId={posterId} user={user} />
                </div>
                : null
            }
        </div>
    );
}

export default Post;