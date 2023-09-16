import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const useAuthHost = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  if (isAuthenticated) {
    return true;
  }
  return false;
};

const ProtectedRoute = () => {
  const location = useLocation();
  const isAuth = useAuthHost();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
