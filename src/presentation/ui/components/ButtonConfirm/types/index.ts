import { DimensionValue, StyleProp, TextStyle, ViewStyle } from "react-native";

interface IButtonConfirm {
    title: string;
    onPress: () => void;
    width?: DimensionValue | undefined;
    disabled?: boolean;
    isLoading?: boolean;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    customBtnStyle?: StyleProp<ViewStyle>; 
    customTextStyle?: StyleProp<TextStyle>; 
}

export { IButtonConfirm }