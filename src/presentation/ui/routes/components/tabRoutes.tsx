import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CircleUser, List } from "lucide-react-native";
import colors from "@/presentation/ui/styles/colors.json";
import {
  HomeListScreen,
  AccountScreen,
} from "@/presentation/ui/screens/private";
import { useTranslation } from "react-i18next";
import { useWindowDimensions } from "react-native";

const TabNavigator = createBottomTabNavigator();
const TabRoutes = () => {
  const { height } = useWindowDimensions();

  const heightIsMajorOrEqual840 = height >= 840;

  const { t: translate } = useTranslation();

  return (
    <TabNavigator.Navigator
      initialRouteName="routeList"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: colors.base.light,
        tabBarInactiveTintColor: colors.base.midnight,
        tabBarStyle: {
          borderTopWidth: 0,
          backgroundColor: colors.primary[150],
          height: heightIsMajorOrEqual840 ? 84 : 64,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          marginTop: 4,
        },
      }}
    >
      <TabNavigator.Screen
        name="routeList"
        component={HomeListScreen}
        options={{
          headerTitleStyle: {
            fontSize: 22,
          },
          headerTintColor: colors.base.light,
          tabBarIcon: ({ color }) => <List size={22} color={color} />,
          tabBarLabel: translate("tabRoutes.homeListScreen"),
        }}
      />

      <TabNavigator.Screen
        name="routeAccount"
        component={AccountScreen}
        options={{
          headerTitleStyle: {
            fontSize: 22,
          },
          headerTintColor: colors.base.light,
          tabBarIcon: ({ color }) => <CircleUser size={22} color={color} />,
          tabBarLabel: translate("tabRoutes.account"),
        }}
      />
    </TabNavigator.Navigator>
  );
};

export { TabRoutes };
