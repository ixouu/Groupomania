import React from 'react';

import { useNavigate} from 'react-router-dom';

const NoAccount = () => {

    const navigate = useNavigate()    
    const displaySignup = () => {
        navigate("/signup")
        }    

    return (
        <div className='no-account'>
            <span> Vous n'avez pas encore de compte?</span>
            <button className='btn btn-signup' onClick={displaySignup}> S'inscrire</button>
        </div>
    );
}

export default NoAccount;
