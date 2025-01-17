import React, {
  forwardRef,
} from "react";
import { View, Text, TouchableOpacity, Keyboard } from "react-native";
import BottomSheet from "@gorhom/bottom-sheet";
import { Controller } from "react-hook-form";
import InteractiveTextInput from "../InteractiveTextInput/InteractiveTextInput";
import { X } from "lucide-react-native";
import colors from "@/presentation/ui/styles/colors.json";
import { ButtonConfirm } from "../ButtonConfirm";
import { PasswordInputCustom } from "../PasswordInputCustom";
import { useBottomSheetLogin } from "./hook";

interface BottomSheetComponentProps {
  count?: number;
  initialIndex?: number;
  snapPoints?: string[];
  handleClose?: () => void;
}
export interface BottomSheetComponentRef {
  open: () => void;
  close: () => void;
}
export interface LoginFormInputs {
  username: string;
  password: string;
}

const BottomSheetComponent = forwardRef<
  BottomSheetComponentRef,
  BottomSheetComponentProps
>(({ initialIndex = -1, snapPoints: customSnapPoints }, RefObject) => {
  const {
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
  } = useBottomSheetLogin({
    customSnapPoints,
    RefObject,
  });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={initialIndex}
      snapPoints={snapPoints}
      keyboardBehavior="fillParent"
      enableDynamicSizing={false}
      enablePanDownToClose={false}
      animationConfigs={animationConfigs}
      onChange={handleSheetChanges}
      handleIndicatorStyle={{
        backgroundColor: colors.base.light,
      }}
      backgroundStyle={{
        backgroundColor: colors.primary[200],
        borderRadius: 24,
      }}
    >
      <View
        style={{
          width: "100%",
          paddingHorizontal: 16,
        }}
      >
        <TouchableOpacity
          disabled={isLoading}
          onPress={() => {
            if (isKeyboardVisible) {
              Keyboard.dismiss();

              return setTimeout(() => {
                bottomSheetRef.current?.close();

                setTimeout(() => {
                  handleReset();
                }, 500);
              }, 500);
            }

            bottomSheetRef.current?.close();

            setTimeout(() => {
              handleReset();
            }, 500);
          }}
          style={{
            alignSelf: "flex-end",
            position: "absolute",
            right: 16,
            height: 26,
            width: 26,
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
            opacity: isLoading ? 0.5 : 1,
          }}
        >
          <X size={24} color={colors.base.light} strokeWidth={2.5} />
        </TouchableOpacity>

        <Text
          allowFontScaling={false}
          style={{
            fontSize: 16,
            paddingTop: 2,
            fontWeight: 700,
            color: colors.base.light,
            textAlign: "left",
            marginTop: 24,
          }}
        >
          {translate("preLoginScreen.titleModal")}
        </Text>

        <Controller
          name="username"
          control={formLogin.control}
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <View
              style={{
                gap: 4,
                marginBottom: 16,
              }}
            >
              <Text
                numberOfLines={1}
                allowFontScaling={false}
                style={{
                  color: colors.base.midnight,
                  fontSize: 14,
                  marginBottom: 4,
                  marginTop: 4,
                }}
              >
                {translate("preLoginScreen.modalLabelUser")}
              </Text>

              <InteractiveTextInput
                allowFontScaling={false}
                value={value}
                autoComplete="off"
                onChangeText={(text) => {
                  if (text.length === 0) {
                    return onChange(undefined);
                  }

                  onChange(text.toLowerCase());
                }}
                autoCapitalize="none"
                placeholder={translate("preLoginScreen.modalPlaceholderUser")}
                originalColor={
                  error ? colors.signal["danger-light"] : colors.base.midnight2
                }
                mainColor={
                  error ? colors.signal["danger-light"] : colors.base.light
                }
                placeholderTextColor={colors.base.midnight2}
                textInputStyle={{
                  width: "100%",
                  backgroundColor: "transparent",
                  color: colors.base.light,
                }}
              />

              {error && (
                <Text
                  allowFontScaling={false}
                  style={{
                    color: colors.signal["danger-light"],
                    fontSize: 12,
                  }}
                >
                  {error.message}
                </Text>
              )}
            </View>
          )}
        />

        <PasswordInputCustom
          control={formLogin.control}
          translate={translate}
        />

        <ButtonConfirm
          disabled={isLoading}
          isLoading={isLoading}
          customBtnStyle={{
            marginTop: 20,
          }}
          title={translate("preLoginScreen.btnModal")}
          onPress={() => buttonHandleLogin()}
        />
      </View>
    </BottomSheet>
  );
});

export default BottomSheetComponent;
