import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Control, Controller } from "react-hook-form";
import { MaterialIcons } from "@expo/vector-icons"; // Certifique-se de ter o pacote expo/vector-icons instalado
import colors from "@/presentation/ui/styles/colors.json";
import InteractiveTextInput from "../InteractiveTextInput/InteractiveTextInput";
import { LoginFormInputs } from "../BottomSheetGohrom";

interface PasswordInputProps {
  control: Control<LoginFormInputs>;
  translate: (key: string) => string;
}

const PasswordInputCustom = ({ control, translate }: PasswordInputProps) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      name="password"
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View
          style={{
            gap: 4,
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
            {translate("preLoginScreen.modalLabelPassword")}
          </Text>

          
          <View
         style={{
            flexDirection: "row", 
            alignItems: "center",
          }}
          >

            <InteractiveTextInput
              allowFontScaling={false}
              value={value}
              autoComplete="off"
              secureTextEntry={!showPassword}
              onChangeText={(text) => {
                if (text.length === 0) {
                  return onChange(undefined);
                }

                onChange(text);
              }}
              autoCapitalize="none"
              placeholder={translate("preLoginScreen.modalPlaceholderPassword")}
              originalColor={
                error ? colors.signal["danger-light"] : colors.base.midnight2
              }
              mainColor={
                error ? colors.signal["danger-light"] : colors.base.light
              }
              placeholderTextColor={colors.base.midnight2}
              textInputStyle={{
                flex: 1,
                backgroundColor: "transparent",
                color: colors.base.light,
              }}
            />

            <TouchableOpacity
              style={{
                position: "absolute",
                right: 0,
                height: 50,
                paddingRight:8,
                width: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => setShowPassword((prev) => !prev)}
            >
              <MaterialIcons
                name={showPassword ? "visibility" : "visibility-off"}
                size={24}
                color={colors.base.light}
              />
            </TouchableOpacity>
          </View>


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
  );
};

export { PasswordInputCustom };
