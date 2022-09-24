import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

import toast, { Toaster } from 'react-hot-toast'

import { accountServices } from '../../utils/services/accountServices';
import Axios from '../../utils/services/callerService';

import NoAccount from './NoAccount';
import ErrorModal from '../Modals/ErrorModal';

const Login = () => {

    document.title = "Groupomania - Acceuil";


    const navigate = useNavigate();


    const validateLogin = () => toast.success('Connexion établie',{
        duration : 2000,
    })
    
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
    const handleSubmit = async (e) =>{
        setWrongInformations(false)
        e.preventDefault();
        try{
            const response = await Axios.post("/user/login", loginData)
            // store informations to the local storage
            accountServices.saveToken(response.data.accessToken);
            accountServices.saveRoles(response.data.roles);
            accountServices.saveUserId(response.data.userId);
            // localStorage.setItem("user", JSON.stringify(response.data.userId));
            // localStorage.setItem("token", JSON.stringify(response.data.accessToken));
            // localStorage.setItem("role", JSON.stringify(response.data.roles));
            // initialize the inputs
            setLoginData({
                email: '',
                password: ''
            })
            validateLogin();
            const timer = setTimeout(() =>{
                accountServices.isAdmin()
                ? navigate('/admin')
                : navigate('/home');
            },2000)
            return () => clearTimeout(timer)
        }
        catch(err){
            if(!err.response.status === 400 || !err.response.status === 403){
                setErrorModalIsOpen(!errorModalIsOpen)
            } else {
                setWrongInformations(true);
            }
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
        <div><Toaster/></div>
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