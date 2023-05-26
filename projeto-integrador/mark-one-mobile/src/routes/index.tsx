import { useAuth } from "../contexts/AuthContext";

import { AppRoutes } from "./AppRoutes";
import { AuthRoutes } from "./AuthRoute";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <AppRoutes /> : <AuthRoutes />;
}
