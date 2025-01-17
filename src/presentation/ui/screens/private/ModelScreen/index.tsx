import React from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { SafeAreaContainer } from "@/presentation/ui/components/SafeAreaContainer";
import { SearchBarCustom } from "@/presentation/ui/components/SearchBarCustom";
import { ModelList } from "@/presentation/ui/components/ModelList";
import { useTranslation } from "react-i18next";
import { TextOneCustom } from "@/presentation/ui/components/TextOneCustom";
import colors from "@/presentation/ui/styles/colors.json";
import { PrivateStackRoutes } from "@/presentation/ui/routes/types/route.type";
import { useModelScreen } from "./hook";
interface ModelScreenRouteParams {
  brandCode: string;
  brandName: string;
}

const ModelScreen = ({
  route,
}: {
  route: RouteProp<PrivateStackRoutes, "routeModel">;
}) => {
  const navigation = useNavigation();
  const { brandCode = "", brandName = "-" } =
    route.params as ModelScreenRouteParams;
  const { t: translate } = useTranslation();

  const {
    initialLoading,
    isLoading,
    error,
    modelFilteredData,
    searchQuery,
    setSearchQuery,
  } = useModelScreen({ brandCode });

  if (initialLoading || isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.base.light} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <TextOneCustom style={styles.errorText}>
          {translate("modelCarScreen.error")}
        </TextOneCustom>
      </View>
    );
  }

  return (
    <SafeAreaContainer
      classNameCustom={{ backgroundColor: colors.primary[150] }}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ position: "absolute", left: 0 }}
        >
          <TextOneCustom style={styles.backButtonText}>
            {translate("common.goBack")}
          </TextOneCustom>
        </TouchableOpacity>
        <TextOneCustom style={styles.title}>
          {translate("modelCarScreen.title")}
        </TextOneCustom>
      </View>
      <TextOneCustom style={styles.subTitle}>( {brandName} )</TextOneCustom>

      <SearchBarCustom
        placeHolderText={translate("homeListScreen.searchPlaceholder")}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {modelFilteredData?.length === 0 ? (
        <View style={styles.noResultsContainer}>
          <TextOneCustom style={styles.noResultsText}>
            {translate("homeListScreen.noResults")}
          </TextOneCustom>
        </View>
      ) : (
        <ModelList
          labelCode={translate("modelCarScreen.labelCode")}
          data={modelFilteredData || []}
        />
      )}
    </SafeAreaContainer>
  );
};

const styles = StyleSheet.create({
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

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary[150],
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary[150],
  },
  errorText: {
    color: colors.base.light,
    fontSize: 18,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
  },

  backButtonText: {
    color: colors.base.light,
    fontSize: 16,
    width: 50,
  },
  title: {
    color: colors.base.light,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  subTitle: {
    color: colors.base.light,
    fontSize: 16,
    textAlign: "center",
    marginTop: -8,
    fontWeight: 300,
  },
});

export { ModelScreen };
