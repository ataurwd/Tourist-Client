import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxios from "./useAxios";

const useCandidate = () => {
  const axiosInstance = useAxios();
  const { data: candidate = [], refetch, isLoading } = useQuery({
    queryKey: ["candidate"],
    queryFn: async () => {
      const response = await axiosInstance.get(`/guides`);
      return response.data;
    },
  });
  return [candidate, refetch, isLoading];
};

export default useCandidate;
