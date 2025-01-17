import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ModelRepository } from "@/core/data/repositories/model/modelRepository";

interface UseModelScreenProps {
  brandCode: string;
}

export const useModelScreen = ({ brandCode }: UseModelScreenProps) => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const modelRepository = new ModelRepository({
    customApiUrl: "parallelum.com.br",
    customParam: `/fipe/api/v1/carros/marcas/${brandCode}/modelos`,
  });

  const getCarModels = async () => {
    const response = await modelRepository.getModelData();
    return response;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["carModels", brandCode],
    queryFn: getCarModels,
    refetchOnWindowFocus: false,
  });

  const modelFilteredData = data?.modelos?.filter((model: { nome: string }) =>
    model.nome.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setInitialLoading(false);
  }, [data]);

  return {
    initialLoading,
    isLoading,
    error,
    modelFilteredData,
    searchQuery,
    setSearchQuery,
    refetch,
  };
};
