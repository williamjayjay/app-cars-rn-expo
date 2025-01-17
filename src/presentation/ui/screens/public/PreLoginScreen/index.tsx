import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer";
import colors from "@/presentation/ui/styles/colors.json";
import { ButtonConfirm } from "@/presentation/ui/components/ButtonConfirm";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { useState, useCallback, useRef } from "react";
import { NavigationProp, useFocusEffect } from "@react-navigation/native";
import { TextOneCustom } from "@/presentation/ui/components/TextOneCustom";
import React from "react";
import BottomSheetLogin from "@/presentation/ui/components/BottomSheetLogin";
import { PublicStackRoutes } from "@/presentation/ui/routes/types/route.type";
import { useTranslation } from "react-i18next";
import { Car } from "lucide-react-native";

interface PreLoginScreenProps {
  navigation: NavigationProp<PublicStackRoutes>;
}

export interface BottomSheetComponentRef {
  open: () => void;
  close: () => void;
}

const PreLoginScreen = ({ navigation }: PreLoginScreenProps) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const { t: translate } = useTranslation();

  useFocusEffect(
    useCallback(() => {
      setInitialLoading(true);

      setTimeout(() => {
        setInitialLoading(false);
      }, 600);
    }, [])
  );

  const bottomSheetRef = useRef<BottomSheetComponentRef>(null);

  const handleOpen = () => {
    bottomSheetRef.current?.open();
  };

  if (initialLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary[500],
        }}
      >
        <ActivityIndicator size="large" color={colors.base.light} />
      </View>
    );
  }

  return (
    <SafeAreaContainer
      classNameCustom={{
        backgroundColor: colors.primary[500],
        justifyContent: "flex-end",
      }}
    >
      <Car
        size={100}
        color={colors.base.light}
        style={{
          marginBottom: 40,
          alignSelf: "center",
          position: "absolute",
          top: 100,
        }}
      />

      <ButtonConfirm
        title={translate("preLoginScreen.titleBtn")}
        onPress={handleOpen}
        customBtnStyle={{}}
      />

      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          alignSelf: "center",
          alignItems: "center",
          width: 60,
          marginTop: 24,
        }}
      >
        <TextOneCustom
          customNumberOfLines={0}
          style={{
            color: colors.base.light,
            fontSize: 14,
            lineHeight: 23,
            marginBottom: 16,
          }}
        >
          {translate("preLoginScreen.subTitleBtn")}
        </TextOneCustom>
      </TouchableOpacity>

      <BottomSheetLogin ref={bottomSheetRef} />
    </SafeAreaContainer>
  );
};

export { PreLoginScreen };
