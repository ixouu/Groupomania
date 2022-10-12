import React from 'react';

const SocialMedias = () => {
    return (
        <section className='socialMedias'>
            <h2 className='socialMedias-title'>Suivez-nous</h2>
            <ul>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.facebook.com/' className='socialMedia-Link'>
                        <i className="fa-brands fa-instagram"></i>Facebook
                    </a>
                </li>

                <li>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/' className='socialMedia-Link'>
                        <i className="fa-brands fa-facebook"></i>Instagram
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href='https://twitter.com/' className='socialMedia-Link'>
                        <i className="fa-brands fa-twitter"></i>Twitter
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/' className='socialMedia-Link'>
                        <i className="fa-brands fa-linkedin"></i>Linkedin
                    </a>
                </li>
            </ul>
        </section>
    );
}

export default SocialMedias;
