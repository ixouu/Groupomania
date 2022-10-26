import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Progress from "../components/Signup/Prgoress";
import SucessModal from "../components/Modals/SucessModal";
import ErrorModal from "../components/Modals/ErrorModal";

import { useDispatch } from "react-redux";
import { getUsers } from "../redux/actions/users.actions";

const Signup = () => {
    document.title = "Groupomania | Création de compte";
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // loading
    const [isLoading, setIsLoading] = useState(false);



    // error
    const [error, setError] = useState("")

    // firstName data 
    const [firstName, setFirstName] = useState('');
    const [wrongFirstName, setWrongFirstName] = useState(false);
    const [firstNameIsEditing, setFirstNameIsEditing] = useState(false);
    // lastName data
    const [lastName, setLastName] = useState('');
    const [wrongLastName, setWrongLastName] = useState(false);
    const [lastNameIsEditing, setLastNameIsEditing] = useState(false);
    // email data
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false);
    const [emailIsEditing, setEmailIsEditing] = useState(false);

    // Email error span
    const [emailRequisite, setEmailRequisite] = useState(false)

    // Passwords data
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [pwdNotMatching, setPwdNotMatching] = useState(false);
    // Password strength
    const [pwdLength, setPwdLength] = useState(0);
    const [pwdSpecialChar, setPwdSpecailChar] = useState(false);
    const [pwdCapLetter, setpwdCapLetter] = useState(false);

    // Password progress modal
    const [pwdRequisite, setPwdRequisite] = useState(false);

    //toggle Modals
    const [successModalIsOpen, setSuccessModalIsOpen] = useState(false);
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

    // firstName RegExp 
    const firstNameRegExp = new RegExp('(^[a-zA-Zéè -]{2,55}$)');

    // lastName RegExp
    const lastNameRegExp = new RegExp('(^[a-zA-Z -]{2,55}$)');

    // Password RegExp
    const specialCharRegExp = new RegExp(/[$&+,:;=?@#|'<>.-^*()%!]+/);
    const CapLetterRegExp = new RegExp(/[A-Z\s]+/);

    // Email RegExp 
    const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)

    // Handle firstName
    const handleFirstName = (firstName) => {
        setFirstNameIsEditing(true);
        setFirstName(firstName);
        if (firstName.length < 2 || firstName.length > 55 || !firstNameRegExp.test(firstName)) {
            setWrongFirstName(true)
        } else {
            setWrongFirstName(false)
        }
    }

    // Handle lastName 
    const handleLastName = (lastName) => {
        setLastNameIsEditing(true)
        setLastName(lastName);
        if (firstName.length < 2 || firstName.length > 55 || !lastNameRegExp.test(lastName)) {
            setWrongLastName(true)
        } else {
            setWrongLastName(false)
        }
    }

    // Handle email input changes
    const handleEmail = (email) => {
        setEmail(email);
        setEmailIsEditing(true);
        if (emailRegExp.test(email)) {
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }
    }
    // Handle password input changes
    const handleChange = (pwd) => {
        setPassword(pwd)
        setPwdLength(pwd.length)
        if (specialCharRegExp.test(pwd)) {
            setPwdSpecailChar(true)
        } else {
            setPwdSpecailChar(false)
        }
        if (CapLetterRegExp.test(pwd)) {
            setpwdCapLetter(true)
        } else {
            setpwdCapLetter(false)
        }
    }

    // Handle password input Focus

    const handleFocus = (target) => {
        if (target.id === "password") {
            setPwdRequisite(true)
        }
        if (target.id === "email") {
            setEmailRequisite(true)
        }

    }

    // handle password input Blur
    const handleBlur = (target) => {
        if (target.id === "password") {
            setPwdRequisite(false)
        }
        if (target.id === "email") {
            setEmailRequisite(false)
        }
    }

    // signup Button
    const signupBtn = firstName !== "" && lastName !== "" && email !== "" && password !== "" && passwordConfirm !== "" ?
        (isLoading
            ? (<div className='successModal-loader'>
                <span></span>
                <span></span>
                <span></span>
            </div>
            )
            : <button type="sumbit" className="btn btn-signup" onClick={(e) => handleSignUpButton(e)}>S'inscrire</button>
        )
        :
        (<button type="sumbit" className="btn btn-signup" disabled={true}>S'inscrire</button>);

    // handle signup Button 
    const handleSignUpButton = (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            setPwdNotMatching(true)
        }
        sendSignUpRequest();
    }

    // Signup Request
    const sendSignUpRequest = async () => {
        setIsLoading(true)
        try {
            const newUser = {
                firstName,
                lastName,
                email,
                password,
                passwordConfirm
            }
            await axios.post("http://localhost:5000/api/user/signup", newUser)
                .then(res => {
                    if (res.status === 201) {
                        // show the sucess modal
                        setSuccessModalIsOpen(!successModalIsOpen)
                        // reset the form
                        setFirstName('');
                        setLastName('');
                        setEmail('');
                        setPassword('');
                        setPasswordConfirm('');
                        setIsLoading(false);
                        dispatch(getUsers());
                        // redirection
                        const timer = setTimeout(() => {
                            setSuccessModalIsOpen(!successModalIsOpen);
                            navigate('/')
                        }, 3000)
                        return () => {
                            clearTimeout(timer)
                        }
                    } else {
                        setErrorModalIsOpen(!errorModalIsOpen)
                    }
                })
                .catch(err => {
                    setError(err)
                    setErrorModalIsOpen(!errorModalIsOpen)
                    setIsLoading(false)
                })
        }
        catch (err) {
            setErrorModalIsOpen(!errorModalIsOpen)
        }
    }

    return (
        <div className="welcome-container">
            <div className="welcome-left">
                <h1 className="welcome-title">
                    Groupomania, car la communication est indispensable, jamais
                    suffisante
                </h1>
            </div>
            <div className="signUp-right">
                <form className="signUp-form">
                <h2>Creer un compte</h2>
                    {/* first name */}
                    <div className="form-div">
                        {firstNameIsEditing ? (wrongFirstName ? <div className="checkIcon checkIcon-invalid" ><i className="fa-solid fa-xmark"></i></div> : <div className="checkIcon checkIcon-valid"><i className="fa-solid fa-check"></i></div>) : null}
                        <label htmlFor="firstName">Prénom</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Renseignez votre prénom"
                            value={firstName}
                            onChange={(e) => handleFirstName(e.target.value)}
                            required
                        />
                        {wrongFirstName === true && <p className="wrongInput">Le format de votre prénom est incorrect.</p>}
                    </div>
                    {/* last name */}
                    <div className="form-div">
                        {lastNameIsEditing ? (wrongLastName ? <div className="checkIcon checkIcon-invalid"><i className="fa-solid fa-xmark"></i></div> : <div className="checkIcon checkIcon-valid"><i className="fa-solid fa-check"></i></div>) : null}
                        <label htmlFor="lastName">Nom</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Renseignez votre nom de famille"
                            value={lastName}
                            onChange={(e) => handleLastName(e.target.value)}
                            required
                        />
                        {wrongLastName === true && <p className="wrongInput">Le format de votre nom est incorrect.</p>}
                    </div>
                    {/* email */}
                    <div className="form-div">
                        {emailIsEditing ? (emailIsValid ? <div className="checkIcon checkIcon-valid"><i className="fa-solid fa-check"></i></div> : <div className="checkIcon checkIcon-invalid"><i className="fa-solid fa-xmark"></i></div>) : null}
                        <label htmlFor="email">Adresse Email</label>
                        <input
                            id="email"
                            type="email"
                            placeholder="Entrez votre adresse email"
                            value={email}
                            onChange={(e) => handleEmail(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            required
                        />
                        {emailRequisite && !emailIsValid ? <p className="wrongInput">Le format renseigné n'est pas valide</p> : null}
                    </div>
                    {/* password */}
                    <div className="form-div">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Renseignez votre mot de passe"
                            value={password}
                            onChange={(e) => handleChange(e.target.value)}
                            onFocus={(e) => handleFocus(e.target)}
                            onBlur={(e) => handleBlur(e.target)}
                            required
                        />
                    </div>
                    {pwdRequisite && <Progress pwdLength={pwdLength} pwdSpecialChar={pwdSpecialChar} pwdCapLetter={pwdCapLetter} />}


                    <div className="form-div">
                        <label htmlFor="confirmPassword">
                            Confirmer votre mot de passe
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Renseignez votre mot de passe"
                            value={passwordConfirm}
                            onChange={(e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                        {pwdNotMatching ?
                            <p className="wrongInput">Vos mots de passe ne correspondent pas</p>
                            :
                            null
                        }
                    </div>
                    {signupBtn}
                </form>
            </div>
            <SucessModal email={email} firstName={firstName} open={successModalIsOpen} onClose={() => setSuccessModalIsOpen(false)} />
            <ErrorModal open={errorModalIsOpen} error={error} onClose={() => setErrorModalIsOpen(false)} />
        </div>
    );
};

export default Signup;
