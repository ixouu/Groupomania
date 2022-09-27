import React, { useState } from 'react';

import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

import AUsers from '../components/Admin/AUsers'
import APosts from '../components/Admin/APosts'
import AComments from '../components/Admin/AComments'

import { useSelector } from 'react-redux';
import { pureFinalPropsSelectorFactory } from 'react-redux/es/connect/selectorFactory';


const AdminDashboard = () => {

    
    document.title = "Groupomania | Admin Dashboard";
    
    // USERS 
    const users = useSelector((state) => state.usersReducer);
    const [displayUsers, setDisplayUsers] = useState(false);
    const handleUsers = () => {
        setDisplayUsers(true)
        setDisplayPosts(false)
        setDisplayComments(false)
    }
    
    // POSTS
    const posts = useSelector((state) => state.postReducer);
    const [displayPosts, setDisplayPosts] = useState(false);
    const handlePosts = () => {
        setDisplayPosts(true)
        setDisplayUsers(false)
        setDisplayComments(false)
    }

    // COMMENTS
    const comments = useSelector((state) => state.commentReducer);
    const [displayComments, setDisplayComments] = useState(false);
    const handleComments = () => {
        setDisplayComments(true)
        setDisplayUsers(false)
        setDisplayPosts(false)
    }



    return (
        <>
            <Header/>
            <h2 className='admin-title'>Administration : </h2>
            <main className='admin'>
                <div className="admin-panel">
                    <section className='admin-actions'>
                        <div className='admin-action admin-actions_users' onClick={ () => handleUsers()}>
                            <i className="fa-solid fa-users"></i>
                            <span>Gestion des utilisateurs</span> 
                        </div>
                        <div className='admin-action admin-actions_posts'onClick={ () => handlePosts()}>
                            <i className="fa-solid fa-clipboard"></i>
                            <span>Gestion des postes</span>
                        </div>
                        <div className='admin-action admin-actions_comments'onClick={ () => handleComments()}>
                            <i className="fa-solid fa-comments"></i>
                            <span>Gestion des commentaires</span>
                        </div>
                    </section>
                </div>
                <div className='admin-content'>
                    {displayUsers && <AUsers users={users}/>}
                    {displayPosts && <APosts posts={posts}/>}
                    {displayComments && <AComments comments={comments}/>}
                </div>
                
            </main>        
            <Footer/>
        </>
    );
}

export default AdminDashboard;
