import * as React from "react";
import {
  StyleProp,
  TextInput,
  TextInputProps,
  ViewStyle,
  Animated,
  TouchableOpacity,
  View,
  TextStyle,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Certifique-se de ter o pacote expo/vector-icons instalado
import styles, { _textInputStyle } from "./InteractiveTextInput.style";

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

const MAIN_COLOR = "#2a41cb";
const ORIGINAL_COLOR = "transparent";
const PLACEHOLDER_COLOR = "#757575";
const ORIGINAL_VALUE = 0;
const ANIMATED_VALUE = 1;

export interface IInteractiveTextInputProps extends TextInputProps {
  style?: StyleProp<ViewStyle>;
  textInputStyle?: StyleProp<TextStyle>;
  enableIcon?: boolean;
  mainColor?: string;
  originalColor?: string;
  animatedPlaceholderTextColor?: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

interface IState {
  isPasswordVisible: boolean;
}

export default class InteractiveTextInput extends React.Component<
  IInteractiveTextInputProps,
  IState
> {
  interpolatedColor: Animated.Value;

  constructor(props: IInteractiveTextInputProps) {
    super(props);
    this.interpolatedColor = new Animated.Value(ORIGINAL_VALUE);
    this.state = {
      isPasswordVisible: !this.props.secureTextEntry, // Define se a senha está visível
    };
  }

  showOriginColor = () => {
    Animated.timing(this.interpolatedColor, {
      duration: 350,
      toValue: ORIGINAL_VALUE,
      useNativeDriver: false,
    }).start();
  };

  showFocusColor = () => {
    Animated.timing(this.interpolatedColor, {
      duration: 450,
      toValue: ANIMATED_VALUE,
      useNativeDriver: false,
    }).start();
  };

  togglePasswordVisibility = () => {
    this.setState((prevState) => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  /* -------------------------------------------------------------------------- */
  /*                               Render Methods                               */
  /* -------------------------------------------------------------------------- */

  renderIcon = () => {
    const { enableIcon, secureTextEntry } = this.props;

    if (!enableIcon || !secureTextEntry) return null;

    const { isPasswordVisible } = this.state;

    return (
      <TouchableOpacity
        style={{
          position: "absolute",
          right: 16,
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
        onPress={this.togglePasswordVisibility}
      >
        <MaterialIcons
          name={isPasswordVisible ? "visibility" : "visibility-off"}
          size={24}
          color={MAIN_COLOR}
        />
      </TouchableOpacity>
    );
  };

  renderAnimatedTextInput = () => {
    const mainColor = this.props.mainColor || MAIN_COLOR;
    const originalColor = this.props.originalColor || ORIGINAL_COLOR;
    const animatedPlaceholderTextColor =
      this.props.animatedPlaceholderTextColor || PLACEHOLDER_COLOR;

    let borderColor = this.interpolatedColor.interpolate({
      inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
      outputRange: [originalColor, mainColor],
    });
    let placeholderTextColor = this.interpolatedColor.interpolate({
      inputRange: [ORIGINAL_VALUE, ANIMATED_VALUE],
      outputRange: [animatedPlaceholderTextColor, mainColor],
    });

    return (
      <AnimatedTextInput
        {...this.props}
        placeholderTextColor={placeholderTextColor}
        secureTextEntry={!this.state.isPasswordVisible && this.props.secureTextEntry}
        style={[
          _textInputStyle(borderColor),
          this.props.textInputStyle,
          { paddingRight: 50 },
        ]}
        onFocus={() => {
          this.showFocusColor();
          this.props.onFocus && this.props.onFocus();
        }}
        onBlur={() => {
          this.showOriginColor();
          this.props.onBlur && this.props.onBlur();
        }}
      />
    );
  };

  render() {
    return (
      <View style={[styles.container, this.props.style]}>
        {this.renderAnimatedTextInput()}
        {this.renderIcon()}
      </View>
    );
  }
}
