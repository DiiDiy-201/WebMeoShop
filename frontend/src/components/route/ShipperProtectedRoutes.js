import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const useAuthHost = () => {
  const { isAuthenticated } = useSelector((state) => state.shipperAuth);
  if (isAuthenticated) {
    return true;
  }
  return false;
};

const ShipperProtectedRoute = () => {
  const location = useLocation();
  const isAuth = useAuthHost();
  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to="/shipper/login" state={{ from: location }} replace />
  );
};

export default ShipperProtectedRoute;
