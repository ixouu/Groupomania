import React from 'react';

const ProgressModal = ({pwdLength, pwdSpecialChar, pwdCapLetter})  => {


    return (
        <div className="progressModal">
        <div className="passwordRequirments">
            <span>
                Votre mot de passe doit contenir au moins : 
            </span>
            <ul>
                {pwdLength >= 8 ?
                    <li style={{color : 'green '}}>8 caractères</li>
                    :
                    <li style={{color : 'orange '}}>8 caractères</li>
                }
                {
                    pwdSpecialChar === true ?
                    <li style={{color : 'green '}}>1 caractère spécial @`(){}*#$</li> 
                    :
                    <li style={{color : 'orange '}}>1 caractère spécial @`(){}*#$</li>
                }
                {
                    pwdCapLetter === true ?
                    <li style={{color : 'green '}}>1 lettre majuscule</li>
                    :
                    <li style={{color : 'orange '}}>1 lettre majuscule</li>
                }
                
            </ul>
        </div>
    </div>
    );
}

export default ProgressModal;