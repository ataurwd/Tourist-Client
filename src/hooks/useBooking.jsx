import { useQuery } from '@tanstack/react-query';
import  axios  from 'axios';
import { useContext } from 'react';
import { FormContext } from '../context/FormData';

const useBooking = () => {
      const { user } = useContext(FormContext);

    const { data: guideBooking = [], refetch } = useQuery({
        queryKey: ["guideBooking"],
        queryFn: async () => {
          const response = await axios.get(
            `${import.meta.env.VITE_URL}/guide-booking/${user.email}`
          );
          return response.data;
        },
        
    })
    return [guideBooking, refetch];
};

export default useBooking;