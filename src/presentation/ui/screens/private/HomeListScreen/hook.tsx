import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CarsRepository } from "@/core/data/repositories/cars/carsRepository";
import { NavigationProp } from "@react-navigation/native";
import { PrivateStackRoutes } from "@/presentation/ui/routes/types/route.type";

export const useHomeList = (navigation: NavigationProp<PrivateStackRoutes>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const carsRepository = new CarsRepository({
    customApiUrl: "parallelum.com.br",
    customParam: "/fipe/api/v1/carros/marcas",
  });

  const getCarBrands = async () => {
    const response = await carsRepository.getCarsData();
    return response;
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["cars"],
    queryFn: getCarBrands,
    refetchOnWindowFocus: false,
    refetchOnReconnect: true,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    setSearchQuery("");
    await refetch();
    setRefreshing(false);
  };

  const filteredData = data?.filter((item) =>
    item.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleItemPress = (brandCode: string, brandName: string) => {
    navigation.navigate("routeModel", { brandCode, brandName });
  };

  return {
    searchQuery,
    setSearchQuery,
    filteredData,
    isLoading,
    refreshing,
    onRefresh,
    handleItemPress,
  };
};
