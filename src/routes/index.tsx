import { useAuth } from "../contexts/AuthContext";

// import { Dashboard } from "../screens/Dashboard";
import { SignIn } from "../screens/SignIn";
import { User } from "../screens/User";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <User /> : <SignIn />;
}
