import React, {useState} from 'react';

const FindUser = () => {

    const [isActive, setIsActive] = useState(false);

    const toggleInput = () => {
        isActive ? setIsActive(false) : setIsActive(true); 
    }

    return (
        <section className={isActive? "findUser findUser-active" : 'findUser'}>
            <h2 className='findUser-title'>Trouver un utilisateur</h2>
            <form className={isActive? "findUser-form active-input" : "findUser-form"}>
                <label for="findUser-input">Recherche</label>
                <input type="search" id='findUser-input' onFocus={() => toggleInput()} onBlur={() => setIsActive(false)}></input>
            </form>
        </section>
    );
}

export default FindUser;
