import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
} from "react-native";
import { IInitialRootRoutes, IRootStackName } from "./types/route.type";
import { PublicRoutes } from "./public/routesPublic";
import { PrivateRoutes } from "./private/routesPrivate";
import { useAuth } from "@/presentation/context/AuthContext";
import colors from "@/presentation/ui/styles/colors.json";

const Stack = createNativeStackNavigator<IRootStackName>();

const Routes = () => {
  const { isAuthenticated } = useAuth();

  const styles = StyleSheet.create({
    loadingOverlay: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: colors.primary[500],
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
    },
  });

  if (isAuthenticated === null) {
    return (
      <Animated.View style={[styles.loadingOverlay, { opacity: 1 }]}>
        <ActivityIndicator size="large" color={colors.base.light} />
      </Animated.View>
    );
  }

  return (
    <Stack.Navigator
      initialRouteName={isAuthenticated ? "routesPrivate" : "routesPublic"}
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
        animationDuration: 500,
      }}
    >
      {isAuthenticated ? (
        <Stack.Screen
          name="routesPrivate"
          component={PrivateRoutes}
          initialParams={{
            screen: "routeTabs",
          }}
        />
      ) : (
        <Stack.Screen
          name="routesPublic"
          component={PublicRoutes}
          initialParams={{
            screen: "routeWelcome",
          }}
        />
      )}
    </Stack.Navigator>
  );
};

export { Routes };
