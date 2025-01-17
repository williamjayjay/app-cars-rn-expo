import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer";
import { TextOneCustom } from "@/presentation/ui/components/TextOneCustom";
import colors from "@/presentation/ui/styles/colors.json";
import { PrivateStackRoutes } from "@/presentation/ui/routes/types/route.type";
import { useHomeList } from "./hook";
import { CarListCustom } from "@/presentation/ui/components/CarListCustom";
import { SearchBarCustom } from "@/presentation/ui/components/SearchBarCustom";

interface WelcomeScreenProps {
  navigation: NavigationProp<PrivateStackRoutes>;
}

const HomeListScreen = ({ navigation }: WelcomeScreenProps) => {
  const { t: translate } = useTranslation();
  const {
    searchQuery,
    setSearchQuery,
    filteredData,
    isLoading,
    refreshing,
    onRefresh,
    handleItemPress,
  } = useHomeList(navigation);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
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
      <TextOneCustom style={styles.title}>
        {translate("homeListScreen.title")}
      </TextOneCustom>

      <SearchBarCustom
        placeHolderText={translate("homeListScreen.searchPlaceholder")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {filteredData?.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <TextOneCustom style={styles.noResultsText}>
            {translate("homeListScreen.noResults")}
          </TextOneCustom>
        </View>
      ) : (
        <CarListCustom
          data={filteredData || []}
          refreshing={refreshing}
          onRefresh={onRefresh}
          handlePress={handleItemPress}
        />
      )}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary[150],
  },
  title: {
    color: colors.base.light,
    fontSize: 24,
    fontWeight: "bold",
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 18,
    color: colors.base.light,
    textAlign: "center",
  },
});

export { HomeListScreen };
