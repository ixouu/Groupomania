import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { commentServices } from '../../utils/services/commentServices';

const LastComments = () => {

    const lastComments = useSelector((state) => state.commentReducer).slice(0, 4)
    console.log(lastComments)
    // Return for 4th last comments
    // extract updateAt and transform it into a time difference
  
    return (
        <section className='lastComments'>
            <h2 className='lastComment-title'>Les derniers commentaires</h2>
            { 
                lastComments.map((comment) =>{
                    return (
                        <div className="lastComment-container">
                            <p className='lastComment-content'>{comment.content}</p>
                            <span className="lastComment-timer">{commentServices.getTimeDifference(comment.updatedAt)}</span>
                            <Link to={`/home/#${comment.post._id}`}><span>Voir le post</span></Link>
                        </div>
                    )
                })
            }
        </section>
    );
}

export default LastComments;
