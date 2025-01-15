import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { FormContext } from "../context/FormData";

const useUser = () => {
    const {user} = useContext(FormContext)
    const { data: loginUser = {}, refetch } = useQuery({
        queryKey: ["cart"],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_URL}/user/${user?.email}`);
            return res.data;
        },
    });
    return {loginUser, refetch};
};

export default useUser;