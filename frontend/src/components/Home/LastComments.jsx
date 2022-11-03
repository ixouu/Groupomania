import { useSelector } from 'react-redux';
import { commentServices } from '../../utils/services/commentServices';

const LastComments = () => {

    const lastComments = useSelector((state) => state.commentReducer).comments.slice(0, 5);

    return (
        <section className='lastComments'>
            <h2 className='lastComment-title'>Les derniers commentaires</h2>
            {
                lastComments
                ?(lastComments.map((comment, index) => {
                    return (
                        <div className="lastComment-container" key={index}>
                            <span className="lastComment-timer">{commentServices.getTimeDifference(comment.updatedAt)}</span>
                            <p className='lastComment-content'>{comment.content}</p>
                        </div>
                    )
                }))
                :<span> Pas encore de commentaires disponibles</span>
            }
        </section>
    );
}

export default LastComments;