import Post from '../Post/Index';
import { isEmpty } from '../../utils/isEmpty'

const Feed = ({ posts }) => {

    return (
        <section className='feed'>
            {!isEmpty(posts[0]) && posts.map((post) =>
                <Post
                    key={post._id}
                    post={post}
                    postId={post._id}
                    posterId={post.posterId}
                    content={post.content}
                    imageUrl={post.imageUrl}
                    createdAt={post.createdAt}
                    likes={post.likes} />
            )}
        </section>
    );
}

export default Feed;

