import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const useGuides = () => {
  const { data: guides = [], refetch, isLoading } = useQuery({
    queryKey: ['allGuidesList'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_URL}/users/role/guide`);
      return res.data;
    }
  });
  return [guides, refetch, isLoading];
};

export default useGuides;
