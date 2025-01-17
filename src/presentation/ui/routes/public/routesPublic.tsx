import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PublicStackRoutes } from "../types/route.type";
import { PreLoginScreen, WelcomeScreen } from "@/presentation/ui/screens/public";

const PublickStack = createNativeStackNavigator<PublicStackRoutes>();

export const PublicRoutes = () => {
  return (
    <PublickStack.Navigator initialRouteName="routeWelcome" screenOptions={{ headerShown: false }}>
      <PublickStack.Screen name="routeWelcome" component={WelcomeScreen} />
      <PublickStack.Screen name="routePreLogin" component={PreLoginScreen} />
    </PublickStack.Navigator>
  );
};
