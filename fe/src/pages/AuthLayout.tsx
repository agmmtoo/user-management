import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../contexts/auth.context";

function AuthLayout() {
  const location = useLocation();  
  
  const auth = useAuth();
  if (auth.user == null) {    

    return <Navigate to="login" state={{ from: location }} replace />;
  } else {
    return <Outlet />;
  }
}

export default AuthLayout;
