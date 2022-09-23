import React from 'react';
import Footer from '../components/Layout/Footer';
import Header from '../components/Layout/Header';

const AdminDashboard = () => {

    document.title = "Groupomania | Admin Dashboard";

    return (
        <>
            <Header/>
            <h2 className='admin-title'>Administration : </h2>
            <main className='admin'>
                <div className="admin-panel">
                    <section className='admin-actions'>
                        <div className='admin-action admin-actions_users'>
                            <i class="fa-solid fa-users"></i>
                            <span>Gestion des utilisateurs</span> 
                        </div>
                        <div className='admin-action admin-actions_posts'>
                            <i class="fa-solid fa-clipboard"></i>
                            <span>Gestion des postes</span>
                        </div>
                        <div className='admin-action admin-actions_comments'>
                            <i class="fa-solid fa-comments"></i>
                            <span>Gestion des commentaires</span>
                        </div>
                    </section>
                </div>
                <div className='admin-content'>

                </div>
                
            </main>        
            <Footer/>
        </>
    );
}

export default AdminDashboard;
