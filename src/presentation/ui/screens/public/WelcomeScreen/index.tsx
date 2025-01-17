import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer";
import { TextOneCustom } from "@/presentation/ui/components/TextOneCustom";
import colors from "@/presentation/ui/styles/colors.json";
import { ButtonConfirm } from "@/presentation/ui/components/ButtonConfirm";
import { NavigationProp } from "@react-navigation/native";
import { PublicStackRoutes } from "@/presentation/ui/routes/types/route.type";
import { useTranslation } from "react-i18next";
import { Car } from "lucide-react-native";

interface WelcomeScreenProps {
  navigation: NavigationProp<PublicStackRoutes>;
}

const WelcomeScreen = ({ navigation }: WelcomeScreenProps) => {
  const { t: translate } = useTranslation();

  const handleNavigateToSelfCustodyScreen = () => {
    navigation.navigate("routePreLogin");
  };

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

      <TextOneCustom
        style={{ color: colors.base.light, fontSize: 24, fontWeight: "bold" }}
      >
        {translate("welcomeScreen.title")}
      </TextOneCustom>

      <TextOneCustom
        customNumberOfLines={0}
        style={{
          color: colors.base.light,
          fontSize: 14,
          lineHeight: 23,
          paddingTop: 16,
          paddingBottom: 40,
        }}
      >
        {translate("welcomeScreen.description")}
      </TextOneCustom>

      <ButtonConfirm
        title={translate("welcomeScreen.titleButton")}
        onPress={handleNavigateToSelfCustodyScreen}
      />
    </SafeAreaContainer>
  );
};

export { WelcomeScreen };
