import { useQueries, useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

const useCandidate = () => {
  const { data: candidate = [], refetch } = useQuery({
    querykey: ["candidate"],
    queryFn: async () => {
      const response = await axios.get(`${import.meta.env.VITE_URL}/guides`);
      return response.data;
    },
  });
  return [candidate, refetch];
};

export default useCandidate;
