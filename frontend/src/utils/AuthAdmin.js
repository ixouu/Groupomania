import { Navigate } from "react-router-dom";
import { accountServices } from "./services/accountServices";

const AuthAdmin = ({ children }) => {
        if(!accountServices.isAdmin() || !accountServices.isLog()){
            return <Navigate to="/unauthorized"/>
        }
      return children
}
    
    
export default AuthAdmin