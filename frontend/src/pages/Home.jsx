import React from 'react';
import CreatePost from '../components/Layout/CreatePost'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import LastSignUp from '../components/Layout/LastSignUp';
import Trending from '../components/Layout/Trending';
import LastComments from '../components/Layout/LastComments';
import Feed from '../components/Posts/Index'
const Home = () => {
    return (
        <>
            <Header/>
            <main>
                <div className='main-left'>
                   <Trending/>
                   <LastComments/>
                </div>
                <div className='main-center'>
                    <CreatePost/>
                    <Feed/>
                </div>
                <div className='main-right'>
                    <LastSignUp/>
                </div>
                
            </main>

            <Footer/>
        </>
    );
}

export default Home;
