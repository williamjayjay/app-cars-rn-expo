import { initI18n } from '@/core/translate_i18n';
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Alert, Animated, BackHandler } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_STORE_DATA } from '@/core/constants/storage';

export const useAppSetup = () => {
  const [userHasToken, setUserHasToken] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  const opacity = useState(new Animated.Value(1))[0];

  useEffect(() => {
    SplashScreen.preventAutoHideAsync();

    const startTime = Date.now();

    const prepareApp = async () => {
      try {
        await initI18n();

        const userAndToken = await AsyncStorage.getItem(USER_STORE_DATA);
        const appIsAuth = !!userAndToken;

        setUserHasToken(appIsAuth);

        await new Promise((resolve) => setTimeout(resolve, 1));
      } catch (e) {
        console.warn("Erro durante a inicialização:", e);
      } finally {
        const endTime = Date.now();
        console.log(`Tempo total de inicialização: ${endTime - startTime}ms`);
        setIsAppReady(true);
        SplashScreen.hideAsync();
      }
    };

    const backAction = () => {
      Alert.alert("Tem certeza?", "Você deseja sair do aplicativo?", [
        {
          text: "Cancelar",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: () => BackHandler.exitApp(),
        },
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    prepareApp();

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (isAppReady) {
      Animated.timing(opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => SplashScreen.hideAsync());
    }
  }, [isAppReady, opacity]);

  return {
    isAppReady,
    opacity,
    userHasToken
  };
};
