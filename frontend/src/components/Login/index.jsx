import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import NoAccount from './NoAccount';
import ErrorModal from '../Modals/ErrorModal';

const Login = () => {

    document.title = "Groupomania - Acceuil";
    const navigate = useNavigate();

    const data = {
        email : "",
        password: ""
    }

    const [loginData, setLoginData] = useState(data)
    const {email, password} = loginData

    // error Modal
    const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);

    // wrong user informations
    const [wrongInformations, setWrongInformations] = useState(false)

    // Login request
    const handleSubmit = (e) =>{
        setWrongInformations(false)
        e.preventDefault();
        try{
            axios.post("http://localhost:5000/api/user/login", loginData)
            .then((res)=>{
                setLoginData({
                    email: '',
                    password: ''
                })
                const data = res.data
                localStorage.setItem("user", JSON.stringify(data));
                
            })
            .catch((err) =>{
                console.log(err);
                setWrongInformations(true);
            })
        }
        catch(err){
            setErrorModalIsOpen(!errorModalIsOpen)
        }
        
    }

    const handleChange = (e) => {
        setLoginData({...loginData, [e.target.id]:e.target.value})
    }

    // Login btn
    const loginBtn = email !== "" && password !== "" ?
        (<button className='btn btn-connect' onClick={(e) => handleSubmit(e)}> Se connecter </button>)
        :
        (<button className='btn btn-connect' disabled={true}> Se connecter </button>);

  return (
    <>
        <form className='login-form'>
            <div className='form-div'>
                <label htmlFor="email">Adresse Email</label>
                <i class="fa-solid fa-envelope"></i>
                <input 
                    id="email"
                    type="email"
                    placeholder='Entrez votre adresse email' 
                    value={email}
                    onChange={ handleChange }
                    required
                />
            </div>
            <div className='form-div'>
                <label htmlFor="password">Mot de passe</label>
                <i class="fa-solid fa-key"></i>
                <input 
                    id="password" 
                    type="password" 
                    placeholder='Entrez votre mot de passe'
                    value={password} 
                    onChange={handleChange}
                    required
                />
            </div>
            {loginBtn}
            <div className="wrongInformations-container">
            {wrongInformations ? 
                <p className='wrongInformations'>Veuillez renseigner un mot de passe et une adresse email valide</p>
                : 
                null
            }
            </div>
        </form>
        <NoAccount/>
        <ErrorModal open={errorModalIsOpen} onClose={()=> setErrorModalIsOpen(false)}/>
    </>
  )
}

export default Login