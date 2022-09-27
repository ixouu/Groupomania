import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Trending = () => {

    const posts = useSelector((state) => state.postsReducer);
    const sortedPosts = posts.sort(function (a,b) {return b.likes.length - a.likes.length}).slice(0, 3);

    return (
        <section className='trending'>
            <h2 className='trending-title'>Publications populaires</h2>
            <div>
                <p className='trending-rank'><span className='trending-star trending-gold'><i class="fa-solid fa-star"></i> Top 1</span><span className='trending-likes'>{sortedPosts[0].likes.length} likes</span></p>
                <div className="trending-post">
                    <p className='trending-content'>{sortedPosts[0].content}</p>
                    <Link to={`./#${sortedPosts[0]._id}`} className="trending-link">Lire</Link>
                </div>
               
            </div>
            <div>
                <p className='trending-rank'><span className='trending-star trending-silver'><i class="fa-solid fa-star"></i>Top 2</span><span className='trending-likes'>{sortedPosts[1].likes.length} likes</span></p>
                <div className="trending-post">
                    <p className='trending-content'>{sortedPosts[1].content}</p>
                    <Link to={`./#${sortedPosts[1]._id}`} className="trending-link">Lire</Link>
                </div>    
                
            </div>
            <div>
                <p className='trending-rank'><span className='trending-star trending-bronze'><i class="fa-solid fa-star"></i>Top 3</span><span className='trending-likes'>{sortedPosts[2].likes.length} likes</span></p>
                <div className="trending-post">
                    <p className='trending-content'>{sortedPosts[2].content}</p>
                    <Link to={`./#${sortedPosts[2]._id}`} className="trending-link">Lire</Link>
                </div>
            </div>
        </section>
    );
}

export default Trending;
