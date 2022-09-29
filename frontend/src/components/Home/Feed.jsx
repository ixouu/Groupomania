import React , {useEffect} from 'react';
import { useSelector } from 'react-redux';
import Post from '../Post/Index';
import { isEmpty } from '../../utils/isEmpty'

const Feed = ({ posts }) => {

    return (
        <div className='feed'>
            {!isEmpty(posts[0]) && posts.map((post) => 
                 <Post 
                key={post._id}
                postId= {post._id}
                posterId={post.posterId} 
                content={post.content} 
                imageUrl={post.imageUrl} 
                createdAt={post.createdAt} 
                likes={post.likes}/>
            )}
        </div>
    );
}

export default Feed;

