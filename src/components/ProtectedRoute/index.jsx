import { Navigate } from "react-router-dom";
import routePath from "../../constants/routePath";
import authService from "../../services/authService";

const ProtectedRoute = ({ children }) => {
  const userStatus = authService.currentTokenStatus();
  if(!userStatus) {
    return <Navigate to={routePath.LOGIN} replace />
  }

  return children
} 

export default ProtectedRoute;