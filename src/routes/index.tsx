import { useAuth } from "../contexts/AuthContext";


// import { Dashboard } from "../screens/Dashboard";
import { SignIn } from "../screens/SignIn";
import { User } from "../screens/User";
import { Plan } from "../screens/Plan";
import { Product } from "../screens/Product";
import { Activity } from "../screens/Activities";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Activity /> : <SignIn />;
}
