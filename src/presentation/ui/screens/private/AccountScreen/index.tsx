import { ListItem } from "@/presentation/ui/components/ListItemCustom";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer";
import { TextOneCustom } from "@/presentation/ui/components/TextOneCustom";
import colors from "@/presentation/ui/styles/colors.json";
import { ChevronDown, ChevronRight } from "lucide-react-native";
import {
  View,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Language } from "@/presentation/ui/components/Language";
import { BottomSheetGohromOne } from "@/presentation/ui/components/BottomSheetGohromOne";
import { ButtonConfirm } from "@/presentation/ui/components/ButtonConfirm";
import { useAccountScreen } from "./hook";

const AccountScreen = () => {
  const {
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
  } = useAccountScreen();

  if (initialLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: colors.primary[150],
        }}
      >
        <ActivityIndicator size="large" color={colors.base.light} />
      </View>
    );
  }

  return (
    <SafeAreaContainer
      justDefaultPaddingBottom
      classNameCustom={{
        backgroundColor: colors.primary[150],
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
        }}
      >
        <TextOneCustom
          style={{ color: colors.base.light, fontSize: 24, fontWeight: "bold" }}
        >
          {translate("accountScreen.title")}
        </TextOneCustom>

        <TextOneCustom
          style={{
            color: colors.base.light,
            fontSize: 18,
            fontWeight: "bold",
            marginLeft: 8,
          }}
        >
          {user?.name || "-"}
        </TextOneCustom>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TextOneCustom
          style={{
            color: colors.base.light,
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 24,
          }}
        >
          {translate("accountScreen.social")}
        </TextOneCustom>

        {socialLinks.map((item) => (
          <ListItem
            key={item.id}
            marginTop={16}
            title={item.title}
            leftIcon={item.icon}
            rightIcon={
              <ChevronRight
                color={colors.base.light}
                size={22}
                strokeWidth={2.5}
              />
            }
            onPress={() => openLink(item.url)}
          />
        ))}

        <TextOneCustom
          style={{
            color: colors.base.light,
            fontSize: 16,
            fontWeight: "bold",
            marginTop: 24,
          }}
        >
          {translate("accountScreen.advanced")}
        </TextOneCustom>

        <ListItem
          onPress={() => {
            setExpandChangeLang(!expandChangeLang);
          }}
          marginTop={16}
          title={translate("accountScreen.changeLanguage")}
          rightIcon={
            expandChangeLang ? (
              <ChevronDown
                color={colors.base.light}
                size={22}
                strokeWidth={1.5}
              />
            ) : (
              <ChevronRight
                color={colors.base.light}
                size={22}
                strokeWidth={1.5}
              />
            )
          }
        />
        {expandChangeLang && (
          <View style={{ paddingTop: 16 }}>
            <Language customFn={showMessageChangeLanguage} />
          </View>
        )}

        <ListItem
          onPress={() => handleOpenModalLogout()}
          marginTop={16}
          title={translate("accountScreen.exit")}
          customTitleStyle={{ color: colors.signal.danger }}
          rightIcon={
            <ChevronRight
              color={colors.base.light}
              size={22}
              strokeWidth={1.5}
            />
          }
        />

        <TextOneCustom
          style={{
            color: colors.base.midnight2,
            fontSize: 14,
            marginTop: 32,
            marginBottom: 8,
            textAlign: "center",
          }}
        >
          1.0.0 (1)
        </TextOneCustom>
      </ScrollView>

      <BottomSheetGohromOne
        titleModal={translate("accountScreen.descriptionModalLogout")}
        snapPoints={heightIsMajorOrEqual840 ? ["25%", "25%%"] : ["30%", "30%"]}
        ref={bottomSheetLogoutRef}
        initialIndex={-1}
      >
        <TouchableOpacity
          disabled={isLogoutLoading}
          onPress={() => {
            setIsLogoutLoading(true);

            setTimeout(() => {
              setUnAuthrotized(), showMessageLogout();
            }, 100);
          }}
          style={{
            alignSelf: "center",
            alignItems: "center",
            width: 60,
            marginTop: 32,
            marginBottom: 16,
          }}
        >
          <View
            style={{
              height: 24,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {isLogoutLoading ? (
              <ActivityIndicator size="small" color={colors.base.light} />
            ) : (
              <TextOneCustom
                customNumberOfLines={0}
                style={{
                  color: colors.base.light,
                  fontSize: 14,
                  lineHeight: 23,
                }}
              >
                {translate("accountScreen.titleButtonModalLogout")}
              </TextOneCustom>
            )}
          </View>
        </TouchableOpacity>

        <ButtonConfirm
          title={translate("accountScreen.titleButtonModalCancel")}
          onPress={() => {
            handleCloseModalLogout();
          }}
        />
      </BottomSheetGohromOne>
    </SafeAreaContainer>
  );
};

export { AccountScreen };
