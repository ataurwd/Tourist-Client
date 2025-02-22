import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { FormContext } from "../context/FormData";
import { myAxios } from './useAxios';

const useUser = () => {
  const { user } = useContext(FormContext);

  const { data: loginUser = [], refetch, isLoading } = useQuery({
    queryKey: ["user", user?.email],
    queryFn: async () => {
      if (!user?.email) return null; // Handle case where email is not available
      const res = await myAxios.get(`/user/${user.email}`);
      return res.data[0];
    },
    enabled: !!user?.email, // Run query only if email exists
  });

  return [loginUser, refetch, isLoading];
};

export default useUser;
