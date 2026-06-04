import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const usePackage = () => {
  const { data: packageItem = [], refetch, isLoading } = useQuery({
    queryKey: ["packageItem"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_URL}/packages`);
      return response.data;
    },
  });
  return [packageItem, refetch, isLoading];
};

export default usePackage;
