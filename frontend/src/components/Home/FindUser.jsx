import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

const FindUser = () => {

    const [isActive, setIsActive] = useState(false);
    const [isSearching, setIsSearching] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [foundResultsLength, setFoundResultsLength] = useState(0);
    const [foundResult, setFoundResult] = useState(null);

    const users = useSelector((state) => state.usersReducer)

    useEffect(() => {
        if (searchValue === '') {
            return
        } else {
            let sanitizedValue = searchValue[0].toUpperCase() + searchValue.substring(1);
            let result = users.filter((user) => user.firstName === `${sanitizedValue}` || user.lastName === `${sanitizedValue}`);
            setFoundResultsLength(result.length)
            result.length !== 0 && setFoundResult(result[0])
        }
    }, [searchValue, users])

    const toggleInput = () => {
        isActive ? setIsActive(false) : setIsActive(true);
    }

    const handleChange = (e) => {
        setIsSearching(true);
        setSearchValue(e.target.value)
    }

    const handleBlur = (e) => {
        e.target.value = searchValue;
        const timer = setTimeout(() => {
            setIsActive(false);
            setSearchValue('');
            setIsSearching(false);
        }, 2000)
        return () => {
            clearTimeout(timer)
        }
    }

    return (
        <section className={isActive ? "findUser findUser-active" : 'findUser'}>
            <h2 className='findUser-title'>Trouver un utilisateur</h2>
            <form className={isActive ? "findUser-form active-input" : "findUser-form"}>
                <label htmlFor="findUser-input">Recherche</label>
                <input
                    type="search"
                    id='findUser-input'
                    value={searchValue}
                    // defaultValue = {searchValue}
                    onFocus={() => toggleInput()}
                    onBlur={(e) => handleBlur(e)}
                    onChange={(e) => handleChange(e)}
                ></input>
            </form>
            {isActive
                ? (!isSearching
                    ? <legend>Cherchez un nom ou un prénom</legend>
                    : <p>{foundResultsLength} Resultat(s)</p>
                )
                : null
            }
            {foundResult &&
                <Link to={`../user/?id=${foundResult._id}`} className='findUser-result'>
                    <img src={foundResult.photo} alt={`Photo de ${foundResult.lastName}`} />
                    <span>{foundResult.firstName} {foundResult.lastName}</span>
                </Link>
            }
        </section>
    );
}

export default FindUser;
