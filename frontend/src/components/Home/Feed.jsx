import Post from '../Post/Index';

const Feed = ({ posts }) => {
    return (
        <section className='feed'>
            { posts.length !== 0 
            ? posts.map((post) =>
                <Post
                    key={post._id}
                    post={post}
                    postId={post._id}
                    posterId={post.posterId}
                    content={post.content}
                    imageUrl={post.imageUrl}
                    createdAt={post.createdAt}
                    likes={post.likes} />
            )
            : <p>Pas de posts pour le moment</p>
            }
        </section>
    );
}

export default Feed;

