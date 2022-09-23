import {useEffect} from 'react';


import CreatePost from '../components/Layout/CreatePost'
import Footer from '../components/Layout/Footer'
import Header from '../components/Layout/Header'
import LastSignUp from '../components/Layout/LastSignUp';
import Trending from '../components/Layout/Trending';
import LastComments from '../components/Layout/LastComments';
import Feed from '../components/Feed/Index'

const Home = () => {

    return (
        <>
            <Header/>
            <main className='home'>
                <aside className='home-left'>
                   <Trending/>
                   <LastComments/>
                </aside>
                <div className='home-center'>
                    <CreatePost/>
                    <Feed/>
                </div>
                <aside className='home-right'>
                    <LastSignUp/>
                </aside>
                
            </main>

            <Footer/>
        </>
    );
}

export default Home;
