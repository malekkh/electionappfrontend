import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../components/contexts/AuthContext";

const PrivateRoute = () => {
  const { token } = useAuth();
  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default PrivateRoute;
