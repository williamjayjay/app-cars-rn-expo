import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { Keyboard } from "react-native";
import { useTranslation } from "react-i18next";
import BottomSheet, { useBottomSheetSpringConfigs } from "@gorhom/bottom-sheet";
import { useAuth } from "@/presentation/context/AuthContext";
import {
  validationUserLoginSchemaEnUS,
  validationUserLoginSchemaPtBR,
} from "./schema/index.validationUserLogin";
import { ZodSchema } from "zod";
import { BottomSheetComponentRef, LoginFormInputs } from ".";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignInRepository } from "@/core/data/repositories/signIn/signInRepository";
import { showMessage } from "react-native-flash-message";
import { USER_STORE_DATA } from "@/core/constants/storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UseBottomSheetLoginProps {
  customSnapPoints?: string[];
  RefObject: React.ForwardedRef<BottomSheetComponentRef>;
}

export const useBottomSheetLogin = ({
  customSnapPoints,
  RefObject,
}: UseBottomSheetLoginProps) => {
  const { t: translate, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const translatedSchema =
    currentLanguage === "en-US"
      ? validationUserLoginSchemaEnUS
      : validationUserLoginSchemaPtBR;

  const formSchema: ZodSchema<LoginFormInputs> = translatedSchema;

  const snapPoints = useMemo(
    () => customSnapPoints || ["70%", "70%"],
    [customSnapPoints]
  );

  const animationConfigs = useBottomSheetSpringConfigs({
    damping: 40,
    overshootClamping: true,
    restDisplacementThreshold: 0.1,
    restSpeedThreshold: 0.1,
    stiffness: 250,
  });

  const open = useCallback(() => {
    bottomSheetRef.current?.snapToIndex(0);
  }, []);

  const close = useCallback(() => {
    if (Keyboard.isVisible()) {
      Keyboard.dismiss();

      setTimeout(() => {
        bottomSheetRef.current?.close();
      }, 600);

      return;
    }

    bottomSheetRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback(() => {}, []);

  useImperativeHandle(RefObject, () => ({
    open,
    close,
  }));

  const formLogin = useForm<LoginFormInputs>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleReset = () => {
    formLogin.reset({
      username: undefined,
      password: undefined,
    });
  };

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );

    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const signInRepository = new SignInRepository({
    customApiUrl: "test-api-y04b.onrender.com",
    customParam: "/signIn",
  });

  const showMessageIfExistsError = (message: string) => {
    showMessage({
      message: "Error",
      description: message,
      type: "danger",
      animated: true,
      icon: "danger",
      duration: 2000,
      hideOnPress: true,
      statusBarHeight: 48,
    });
  };

  const showMessageSuccess = (message: string) => {
    showMessage({
      message: "Success",
      description: message,
      type: "success",
      animated: true,
      icon: "success",
      duration: 1000,
      hideOnPress: true,
      statusBarHeight: 48,
    });
  };

  const errorCustom =
    currentLanguage === "en-US" ? "Login Failed" : "Login falhou";

  const handleLogin = useCallback(async () => {
    const data = formLogin.getValues();

    const dataCheckedTransformed = formSchema
      .transform((transformData) => ({
        username: transformData.username,
        password: transformData.password,
      }))
      .safeParse(data);

    if (dataCheckedTransformed.success) {
      setIsLoading(true);

      const { username: user, password } = dataCheckedTransformed.data;

      try {
        const signInParams = { user, password };
        const response = await signInRepository.postUserData(signInParams);

        if (response.error === true) {
          setIsLoading(false);
          return showMessageIfExistsError(errorCustom);
        }

        showMessageSuccess(
          currentLanguage === "en-US"
            ? "Login successful!"
            : "Login realizado com sucesso!"
        );

        if (response.user.token) {
          await AsyncStorage.setItem(
            USER_STORE_DATA,
            JSON.stringify(response.user)
          );
        }

        setAuthrotized();
      } catch (error) {
        setIsLoading(false);

        if (error instanceof Error) {
          showMessageIfExistsError(error.message || errorCustom);
        } else {
        }
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const buttonHandleLogin = () => {
    formLogin.handleSubmit(async () => {
      try {
        Keyboard.dismiss();
        await handleLogin();
      } catch (error) {
        setIsLoading(false);
        console.error("Erro ao fazer login:222", error);
      } finally {
        setIsLoading(false);
      }
    })();
  };

  const { setAuthrotized } = useAuth();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const bottomSheetRef = useRef<BottomSheet>(null);

  return {
    translate,
    bottomSheetRef,
    snapPoints,
    formLogin,
    handleReset,
    isKeyboardVisible,
    isLoading,
    handleSheetChanges,
    buttonHandleLogin,
    animationConfigs,
  };
};
