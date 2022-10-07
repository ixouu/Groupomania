import React, {} from 'react';

import { useSelector } from 'react-redux';


import CreatePost from './CreatePost'
import Footer from '../Layout/Footer'
import Header from '../Layout/Header'
import LastSignUp from './LastSignUp';
import Trending from './Trending';
import LastComments from './LastComments';
import Feed from './Feed'
import SocialMedias from './SocialMedias';
import FindUser from './FindUser';

const Home = () => {

    document.title = 'Groupomania | Home';
    
    const posts = useSelector((state) => state.postReducer);

    return (
        <>
            <Header/>
            <main className='home'>
                <aside className='home-left'>
                   <Trending posts={posts}/>
                   <LastComments/>
                </aside>
                <div className='home-center'>
                    <CreatePost/>
                    <Feed posts={posts}/>
                </div>
                <aside className='home-right'>
                    <LastSignUp/>
                    <FindUser/>
                    <SocialMedias/>
                </aside>
            </main>
            <Footer/>
        </>
    );
} 

export default Home;
