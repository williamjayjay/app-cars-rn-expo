import React, {
  useCallback,
  useMemo,
  useRef,
  forwardRef,
  useImperativeHandle,
} from "react";
import { View, TouchableOpacity, Keyboard } from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  useBottomSheetSpringConfigs,
} from "@gorhom/bottom-sheet";
import { X } from "lucide-react-native";
import colors from "@/presentation/ui/styles/colors.json";
import { TextOneCustom } from "../TextOneCustom";

interface BottomSheetComponentProps {
  count?: number;
  initialIndex?: number;
  snapPoints?: string[];
  handleClose?: () => void;
  children?: React.ReactNode;
  titleModal: string;
}

export interface BottomSheetComponentRef {
  open: () => void;
  close: () => void;
}

const BottomSheetGohromOne = forwardRef<
  BottomSheetComponentRef,
  BottomSheetComponentProps
>(
  (
    { initialIndex = -1, snapPoints: customSnapPoints, children, titleModal },
    ref
  ) => {
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(
      () => customSnapPoints || ["40%", "40%"],
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
      bottomSheetRef.current?.snapToIndex(1);
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

    useImperativeHandle(ref, () => ({
      open,
      close,
    }));

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
        backdropComponent={(backdropProps) => (
          <BottomSheetBackdrop
            {...backdropProps}
            disappearsOnIndex={-1}
            appearsOnIndex={0}
          />
        )}
      >
        <View
          style={{
            width: "100%",
            paddingHorizontal: 16,
          }}
        >
          <TextOneCustom
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: colors.base.light,
              textAlign: "center",
              alignSelf: "center",
              lineHeight: 24,
              maxWidth: "85%",
            }}
          >
            {titleModal}
          </TextOneCustom>

          <TouchableOpacity
            onPress={() => {
              bottomSheetRef.current?.close();
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
            }}
          >
            <X size={24} color={colors.base.light} strokeWidth={2.5} />
          </TouchableOpacity>

          {children}
        </View>
      </BottomSheet>
    );
  }
);

export { BottomSheetGohromOne };
