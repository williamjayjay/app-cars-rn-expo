import React from "react";
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  ActivityIndicator,
} from "react-native";
import { IButtonConfirm } from "./types";
import colors from "@/presentation/ui/styles/colors.json";

const ButtonConfirm: React.FC<IButtonConfirm> = ({
  title,
  onPress,
  width = "100%",
  disabled,
  leftIcon,
  rightIcon,
  customBtnStyle: customBtnStyle,
  customTextStyle: customTextStyle,
  isLoading,
}) => {
  const buttonStyle: ViewStyle = { width };

const styles = StyleSheet.create({
  button: {
    height: 44,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.base.light,
    borderRadius: 35,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    marginHorizontal: 5,
  },
  disabledButton: {
    opacity: 0.3,
  },
  buttonText: {
    fontSize: 16,
    color: colors.primary[100],
    fontWeight: "500",
  },
});

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      style={[
        styles.button,
        buttonStyle,
        disabled && styles.disabledButton,
        customBtnStyle,
      ]}
      onPress={!disabled ? onPress : undefined}
      disabled={disabled}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.primary[100]} />
      ) : (
        <View style={styles.content}>
          {leftIcon && <View style={styles.iconContainer}>{leftIcon}</View>}
          <Text
            allowFontScaling={false}
            numberOfLines={1}
            style={[
              styles.buttonText,
              customTextStyle, 
            ]}
          >
            {title}
          </Text>
          {rightIcon && <View style={styles.iconContainer}>{rightIcon}</View>}
        </View>
      )}
    </TouchableOpacity>
  );
};


export { ButtonConfirm };
