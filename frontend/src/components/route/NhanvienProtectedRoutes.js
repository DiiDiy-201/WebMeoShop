import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuthHost = () => {
  const { isAuthenticated } = useSelector((state) => state.nhanvienAuth);
  if (isAuthenticated) {
    return true;
  }
  return false;
};

const NhanvienProtectedRoute = () => {
  const location = useLocation();
  const isAuth = useAuthHost();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/nhanvien/login" state={{ from: location }} replace />
  );
};

export default NhanvienProtectedRoute;
