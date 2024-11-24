import { Navigate, Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PrivateRouter = () => {
  const user = useAuth();


  // Redirect to login if user is not authenticated
  return user ? <Outlet /> : <Navigate to="/auth" replace />;
}

export default PrivateRouter
