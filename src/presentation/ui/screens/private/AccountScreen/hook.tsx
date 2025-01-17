import { useCallback, useRef, useState } from "react";
import { useAuth } from "@/presentation/context/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import {
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Globe,
} from "lucide-react-native";
import { useTranslation } from "react-i18next";
import { useWindowDimensions, Linking } from "react-native";
import { showMessage } from "react-native-flash-message";
import { BottomSheetComponentRef } from "../../public/PreLoginScreen";
import colors from "@/presentation/ui/styles/colors.json";

export const useAccountScreen = () => {
  const showMessageLogout = () => {
    showMessage({
      message: translate("accountScreen.toastLogoutTitle"),
      description: translate("accountScreen.toastLogoutDescription"),
      type: "success",
      animated: true,
      icon: "success",
      duration: 1500,
      hideOnPress: true,
      statusBarHeight: 48,
    });
  };

  const showMessageChangeLanguage = () => {
    showMessage({
      message: translate("accountScreen.toastLanguageTitle"),
      description: translate("accountScreen.toastLanguageDescription"),
      type: "success",
      animated: true,
      icon: "success",
      duration: 1500,
      hideOnPress: true,
      statusBarHeight: 48,
    });
  };

  const { height } = useWindowDimensions();
  const heightIsMajorOrEqual840 = height >= 840;

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [expandChangeLang, setExpandChangeLang] = useState(false);

  const { t: translate } = useTranslation();
  const { setUnAuthrotized, user } = useAuth();

  const bottomSheetLogoutRef = useRef<BottomSheetComponentRef>(null);

  const handleOpenModalLogout = () => {
    bottomSheetLogoutRef.current?.open();
  };

  const handleCloseModalLogout = () => {
    bottomSheetLogoutRef.current?.close();
  };

  useFocusEffect(
    useCallback(() => {
      setInitialLoading(true);

      setTimeout(() => {
        setInitialLoading(false);
      }, 200);
    }, [])
  );

  const openLink = (url: string) => {
    Linking.openURL(url).catch((err) =>
      console.error("Couldn't load page", err)
    );
  };

  const socialLinks = [
    {
      id: "1",
      title: "Instagram",
      url: "https://www.instagram.com/sgbrsistemas/",
      icon: <Instagram color={colors.base.light} size={20} />,
    },
    {
      id: "2",
      title: "Facebook",
      url: "https://www.facebook.com/sgbrsistemas/",
      icon: (
        <Facebook
          color={colors.base.light}
          size={22}
          style={{ marginLeft: -1 }}
        />
      ),
    },
    {
      id: "3",
      title: "Youtube",
      url: "https://www.youtube.com/c/SGBRSistemas",
      icon: <Youtube color={colors.base.light} size={22} />,
    },
    {
      id: "4",
      title: "Linkedin",
      url: "https://www.linkedin.com/company/sgbrsistemas/",
      icon: <Linkedin color={colors.base.light} size={20} />,
    },
    {
      id: "5",
      title: "SGBR Sistemas",
      url: "https://sgbr.com.br",
      icon: <Globe color={colors.base.light} size={20} />,
    },
  ];

  return {
    handleOpenModalLogout,
    handleCloseModalLogout,
    bottomSheetLogoutRef,
    socialLinks,
    openLink,
    initialLoading,
    user,
    translate,
    expandChangeLang,
    setExpandChangeLang,
    showMessageChangeLanguage,
    heightIsMajorOrEqual840,
    isLogoutLoading,
    setIsLogoutLoading,
    showMessageLogout,
    setUnAuthrotized,
  };
};
