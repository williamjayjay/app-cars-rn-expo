import { Routes } from "@/presentation/ui/routes/route";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  Animated,
  Dimensions,
} from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAppSetup } from "./hooks/useAppSetup";
import colors from "@/presentation/ui/styles/colors.json";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { AuthProvider } from "@/presentation/context/AuthContext";
import React from "react";
import FlashMessage from "react-native-flash-message";
import { ReactQueryProviderCustom } from "@/presentation/context/ReactQueryCustom";

export default function App() {
  const { userHasToken, isAppReady, opacity } = useAppSetup();

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

  return (
    <GestureHandlerRootView
      style={{ flex: 1, backgroundColor: colors.primary[500] }}
    >
      <Animated.View
        style={[
          styles.loadingOverlay,
          { opacity, zIndex: isAppReady ? -1 : 1 },
        ]}
      >
        <ActivityIndicator size="large" color={colors.base.light} />
      </Animated.View>

      <ReactQueryProviderCustom>
        <NavigationContainer>
          <AuthProvider isAppReady={isAppReady} userHasToken={userHasToken}>
            <SafeAreaProvider>
              <View
                testID="main"
                style={{ flex: 1, backgroundColor: colors.primary[500] }}
              >
                <Routes />

                <StatusBar
                  style="light"
                  translucent={true}
                  backgroundColor="transparent"
                />
                <FlashMessage position="top" />
              </View>
            </SafeAreaProvider>
          </AuthProvider>
        </NavigationContainer>
      </ReactQueryProviderCustom>
    </GestureHandlerRootView>
  );
}
