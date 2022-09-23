import {ReactComponent as Logo} from "../../images/logo.svg";
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { accountServices } from '../../utils/services/accountServices';

const Header = () => {

    const currentUser = useSelector((state) => state.userReducer);
    const navigate = useNavigate();
    const validateLogout = () => toast.success('Déconnexion en cours...',{
        duration : 2000,
    })
    const userId = accountServices.getUserId()

    const logout = () => {
        validateLogout()
        const timer = setTimeout(() =>{
                localStorage.clear();
                navigate('/');
            },2000)
            return () => clearTimeout(timer)
    }
    return (
        <header>
            <div className="header-logo">
                <Link to="/home"> <Logo className="header-logo"/> </Link>
            </div>
            <div className="header-title">
                <h1>Bienvenue {currentUser.user.firstName}</h1>
            </div>
            <nav>
            <div><Toaster/></div>
            <ul>
                <li>
                    <Link to={`/profil/?id=${userId}`}><i class="fa-solid fa-user"></i>Mon profil</Link>
                </li>
                <li>
                    <button onClick={() => logout()} className='header-logout'><i class="fa-solid fa-arrow-right-from-bracket"></i>Se déconnecter</button>
                </li>
            </ul>
        </nav>
        </header>
    );
}

export default Header;


