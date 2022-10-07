import React from 'react';
import ReactDOM from 'react-dom';

const ErrorModal = ({open, onClose, error}) => {
    if (!open) return null

    return  ReactDOM.createPortal(
        <>
            <div className="overlay" onClick={onClose}></div>
                <div className='errorModal'>
                <button  className="modal-close" onClick={onClose}>&times;</button>
                <div className="errorModal-icon"><i className="fa-solid fa-xmark"></i></div>
                <h3>Une erreur est survenue, veuillez réessayer.</h3>
                <p>{error.message}</p>
                {error.response.data.message && <p>{error.response.data.message}</p>}
            </div>
        </>,
    document.getElementById('portal')

    );
}

export default ErrorModal;
