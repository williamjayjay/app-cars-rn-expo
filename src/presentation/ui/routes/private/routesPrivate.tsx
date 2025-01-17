import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { PrivateStackRoutes } from "../types/route.type";
import { TabRoutes } from "../components/tabRoutes";
import { ModelScreen } from "@/presentation/ui/screens/private";

const PrivateStack = createNativeStackNavigator<PrivateStackRoutes>();

export const PrivateRoutes = () => {
  return (
    <PrivateStack.Navigator initialRouteName="routeTabs" screenOptions={{ headerShown: false }}>
      <PrivateStack.Screen name="routeTabs" component={TabRoutes} />
      <PrivateStack.Screen name="routeModel" component={ModelScreen} />
    </PrivateStack.Navigator>
  );
};
