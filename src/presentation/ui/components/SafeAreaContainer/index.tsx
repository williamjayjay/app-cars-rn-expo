import { type FC, type ReactNode } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { Platform, StyleProp, View, ViewStyle } from "react-native";

const SafeAreaContainer: FC<{
  children: ReactNode;
  classNameCustom?: StyleProp<ViewStyle>;
  justDefaultPaddingBottom?: boolean;
  testID?: string;
}> = ({ children, classNameCustom, justDefaultPaddingBottom, testID }) => {
  const insets = useSafeAreaInsets();

  return (
    <View
      testID={testID}
      style={[
        {
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: justDefaultPaddingBottom
            ? insets.bottom
            : insets.bottom + 16,

          paddingHorizontal: 16,
          height: "100%",
        },
        classNameCustom,
      ]}
    >
      {children}
    </View>
  );
};

export { SafeAreaContainer };
