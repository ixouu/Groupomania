
const Trending = ({ posts }) => {

    // verfier si le state change 
    const sortedPosts = posts && [...posts].sort(function (a, b) { return b.likes.length - a.likes.length }).slice(0, 3);
    return (
        <>
            <section className='trending'>
             <h2 className='trending-title'>Publications populaires</h2>
                {/** WILL DISPLAY ONLY IF 3 POSTS ARE CREATED ***/}
                {sortedPosts.length >= 3 &&
                    <>
                    <div>
                        <p className='trending-rank'><span className='trending-star trending-gold'><i className="fa-solid fa-star"></i></span><span className='trending-likes'>{sortedPosts[0].likes.length} likes</span></p>
                        <div href={`#${sortedPosts[2]._id}`} className="trending-post">
                            <p className='trending-content'>{sortedPosts[0].content}</p>
                            <a href={`#${sortedPosts[0]._id}`} className="trending-link">Lire</a>
                        </div>

                    </div>
                    <div>
                        <p className='trending-rank'><span className='trending-star trending-silver'><i className="fa-solid fa-star"></i></span><span className='trending-likes'>{sortedPosts[1].likes.length} likes</span></p>
                        <div href={`#${sortedPosts[2]._id}`} className="trending-post">
                            <p className='trending-content'>{sortedPosts[1].content}</p>
                            <a href={`#${sortedPosts[1]._id}`} className="trending-link">Lire</a>
                        </div>
                    </div>
                    <div>
                        <p className='trending-rank'><span className='trending-star trending-bronze'><i className="fa-solid fa-star"></i></span><span className='trending-likes'>{sortedPosts[2].likes.length} likes</span></p>
                        <div href={`#${sortedPosts[2]._id}`} className="trending-post">
                            <p className='trending-content'>{sortedPosts[2].content}</p>
                            <a href={`#${sortedPosts[2]._id}`} className="trending-link">Lire</a>
                        </div>
                    </div>
                    </>
                }
                {/** WILL DISPLAY ONLY IF 2 POSTS ARE CREATED ***/}
                {
                    sortedPosts.length === 2 && 
                    <>
                    <div>
                        <p className='trending-rank'><span className='trending-star trending-gold'><i className="fa-solid fa-star"></i></span><span className='trending-likes'>{sortedPosts[0].likes.length} likes</span></p>
                        <div href={`#${sortedPosts[0]._id}`} className="trending-post">
                            <p className='trending-content'>{sortedPosts[0].content}</p>
                            <a href={`#${sortedPosts[0]._id}`} className="trending-link">Lire</a>
                        </div>

                    </div>
                    <div>
                        <p className='trending-rank'><span className='trending-star trending-silver'><i className="fa-solid fa-star"></i></span><span className='trending-likes'>{sortedPosts[1].likes.length} likes</span></p>
                        <div href={`#${sortedPosts[1]._id}`} className="trending-post">
                            <p className='trending-content'>{sortedPosts[1].content}</p>
                            <a href={`#${sortedPosts[1]._id}`} className="trending-link">Lire</a>
                        </div>
                    </div>
                    </>
                }
                {/** WILL DISPLAY ONLY IF 1 POST IS CREATED ***/}
                {
                    sortedPosts.length === 1 && 
                    <div>
                        <p className='trending-rank'><span className='trending-star trending-gold'><i className="fa-solid fa-star"></i></span><span className='trending-likes'>{sortedPosts[0].likes.length} likes</span></p>
                        <div href={`#${sortedPosts[0]._id}`} className="trending-post">
                            <p className='trending-content'>{sortedPosts[0].content}</p>
                            <a href={`#${sortedPosts[0]._id}`} className="trending-link">Lire</a>
                        </div>

                    </div>

                }
            </section>
        </>
    );
}

export default Trending;

