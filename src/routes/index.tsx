import { useAuth } from "../contexts/AuthContext";

import { Dashboard } from "../screens/Dashboard";
import { SignIn } from "../screens/SignIn";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Dashboard /> : <SignIn />;
}
