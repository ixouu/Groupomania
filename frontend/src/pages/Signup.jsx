import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Progress from "../components/Signup/Prgoress";
import SucessModal from "../components/Modals/SucessModal";
import ErrorModal from "../components/Modals/ErrorModal";

const Signup = () => {
    document.title = "Groupomania | Création de compte";
    const navigate = useNavigate();

    // firstName data 
    const [firstName, setFirstName] = useState('');

    // lastName data
    const [lastName, setLastName] = useState('');

    // email data
    const [email, setEmail] = useState('');
    const [emailIsValid, setEmailIsValid] = useState(false)

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
    
    // Password RegExp
    const specialCharRegExp = new RegExp(/[$&+,:;=?@#|'<>.-^*()%!]+/);
    const CapLetterRegExp = new RegExp(/[A-Z\s]+/);

    // Email RegExp 
    const emailRegExp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)

    // Handle email input changes
    const handleEmail = (email) =>{
        setEmail(email)
        if(emailRegExp.test(email)){
            setEmailIsValid(true)
        } else {
            setEmailIsValid(false)
        }
    }
    // Handle password input changes
    const handleChange = (pwd) =>{
        setPassword(pwd)
        setPwdLength(pwd.length)
        if(specialCharRegExp.test(pwd)){
            setPwdSpecailChar(true)
        } else {
            setPwdSpecailChar(false)
        }
        if(CapLetterRegExp.test(pwd)){
            setpwdCapLetter(true)
        } else {
            setpwdCapLetter(false)
        }
    }

    // Handle password input Focus
    const handleFocus = (target) =>{
        if(target.id === "password"){
            setPwdRequisite(true)
        }
        if(target.id === "email"){
            setEmailRequisite(true)
        }
        
    }

    // handle password input Blur
    const handleBlur = (target) =>{
        if(target.id === "password"){
            setPwdRequisite(false)
        }
        if(target.id === "email"){
            setEmailRequisite(false)
        }
    }

    // signup Button
    const signupBtn = firstName !== "" && lastName !== "" && email!== "" && password!=="" && passwordConfirm !== "" ?
    (<button type="sumbit" className="btn btn-signup" onClick={ (e) => handleSignUpButton(e)}>S'inscrire</button>)
    :
    (<button type="sumbit" className="btn btn-signup" disabled={true}>S'inscrire</button>);

    // handle signup Button 
    const handleSignUpButton = (e) =>{
        e.preventDefault();
        if(password !== passwordConfirm){
            setPwdNotMatching(true)
        }
        sendSignUpRequest();
    }

    // Signup Request
    const sendSignUpRequest =  () => {
        try{
            const newUser = {
                firstName ,
                lastName ,
                email ,
                password ,
                passwordConfirm 
            }
            axios.post("http://localhost:5000/api/user/signup", newUser)
            .then(res => {
                if (res.status === 201){
                    console.log("success")
                    // show the sucess modal
                    setSuccessModalIsOpen(!successModalIsOpen)
                    // reset the form
                    setFirstName('');
                    setLastName('');
                    setEmail('');
                    setPassword('');
                    setPasswordConfirm('');
                    // redirection
                    const timer = setTimeout(() => {
                        setSuccessModalIsOpen(!successModalIsOpen);
                        navigate('/')
                    },3000)
                    return () => {
                        clearTimeout(timer)
                    }
                } else {
                    setErrorModalIsOpen(!errorModalIsOpen)
                }
            })
            .catch(err => {
                setErrorModalIsOpen(!errorModalIsOpen)
            })
        }
        catch(err) {
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
                <h2>Creer un compte</h2>
                <form className="signUp-form">
                    {/* first name */}
                    <div className="form-div">
                        <label htmlFor="firstName">Prénom</label>
                        <input
                            id="firstName"
                            type="text"
                            placeholder="Renseignez votre prénom"
                            value={firstName}
                            onChange={ (e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    {/* last name */}
                    <div className="form-div">
                        <label htmlFor="lastName">Nom</label>
                        <input
                            id="lastName"
                            type="text"
                            placeholder="Renseignez votre nom de famille"
                            value={lastName}
                            onChange={ (e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
                    {/* email */}
                    <div className="form-div">
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
                        {emailRequisite &&  !emailIsValid ? <p className="invalidEmail">Le format renseigné n'est pas valide</p> : null}
                    </div>
                    {/* password */}
                    <div className="form-div">
                        <label htmlFor="password">Mot de passe</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Renseignez votre mot de passe"
                            value={password}
                            onChange={ (e) => handleChange(e.target.value)}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                            required
                        />
                    </div>
                    {pwdRequisite ?  <Progress pwdLength={pwdLength} pwdSpecialChar={pwdSpecialChar}  pwdCapLetter={pwdCapLetter}/> : null}
                  

                    <div className="form-div">
                        <label htmlFor="confirmPassword">
                            Confirmer votre mot de passe
                        </label>
                        <input
                            id="confirmPassword"
                            type="password"
                            placeholder="Renseignez votre mot de passe"
                            value={passwordConfirm}
                            onChange={ (e) => setPasswordConfirm(e.target.value)}
                            required
                        />
                        {pwdNotMatching ?
                            <p className="wrongPwd">Vos mots de passe ne correspondent pas</p>
                            :
                            null
                        }
                    </div>
                    {signupBtn}
                </form>
            </div>
            <SucessModal email={email} firstName={firstName} open={successModalIsOpen} onClose={()=> setSuccessModalIsOpen(false)}/>
            <ErrorModal open={errorModalIsOpen} onClose={()=> setErrorModalIsOpen(false)}/>
        </div>
    );
};

export default Signup;
