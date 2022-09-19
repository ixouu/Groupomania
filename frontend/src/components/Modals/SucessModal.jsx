import React from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router-dom';

const SucessModal = ({ email, firstName, open, onClose}) => {

    if (!open) return null

    return  ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={onClose}></div>
                <div className='successModal'>
                <button  className="modal-close" onClick={onClose}>&times;</button>
                <div className="successModal-icon"><i class="fa-solid fa-check"></i></div>
                <h2>Bienvenue {firstName} !</h2>
                <h3>Vous pouvez vous connectez avec votre adresse {email}</h3>
                <div className="successModal-redirect">
                    <p>Vous allez bientôt être redirigé automatiquement</p>
                    <div className='successModal-loader'>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div className="successModal-manualRedirect">
                    <p>Ne pas attendre :</p>
                    <Link to="/">Se connecter</Link>
                </div>
            </div>
        </>,
    document.getElementById('portal')

    );
}

export default SucessModal;