import { useAuth } from "../contexts/AuthContext";

import { SignIn } from "../screens/SignIn";
// import { Dashboard } from "../screens/Dashboard";
// import { User } from "../screens/User";
import { Member } from "../screens/Member";

export function Routes() {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? <Member /> : <SignIn />;
}
