import React from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';

const Feed = () => {

    const posts = useSelector((state) => state.postsReducer);

    return (
        <div className='feed'>
            {posts.map(post => {
                return <Post 
                key={post._id}
                postId= {post._id}
                posterId={post.posterId} 
                content={post.content} 
                imageUrl={post.imageUrl} 
                createdAt={post.createdAt} 
                likes={post.likes}/>
            })}
        </div>
    );
}

export default Feed;

