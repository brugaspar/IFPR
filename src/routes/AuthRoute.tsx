import { createStackNavigator } from "@react-navigation/stack";

import { useAuth } from "../contexts/AuthContext";

import { SignIn } from "../screens/SignIn";
import { MemberMailValidation } from "../screens/MemberMailValidation";
import { MemberPasswordRegister } from "../screens/MemberPasswordRegister";

const Stack = createStackNavigator();

export function AuthRoutes() {
  const {} = useAuth();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="MemberMailValidation" component={MemberMailValidation} />
      <Stack.Screen name="MemberPasswordRegister" component={MemberPasswordRegister} />
    </Stack.Navigator>
  );
}
