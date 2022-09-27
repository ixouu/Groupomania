import React from 'react';

const APosts = ({ posts }) => {
    console.log(posts);
    const handleDelete = (e) => {
        e.preventDefault();
        if (window.confirm('Êtes-vous sûr de vouloir supprimer ce post? ') === true) {
            console.log("delete")
        } else {
            return
        }
    }

    return (
        <>
            {posts.map((post) => {
                return (
                    <section key={post._id} className='admin-post'>
                        <button className='admin-post_delete' onClick={(e) => handleDelete(e)}><i class="fa-solid fa-xmark"></i></button>
                        <p className='admin-post_content'>{post.content}</p>
                    </section>
                )
            })
            }
        </>
    );
}

export default APosts;
