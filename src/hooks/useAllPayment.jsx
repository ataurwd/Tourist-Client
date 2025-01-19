import { useQuery } from '@tanstack/react-query';
import React from 'react';
import  axios  from 'axios';

const useAllPayment = () => {
    const {data: payment = [], refetch } = useQuery({
        queryKey: ['allpayment'],
        queryFn: async () => {
            const res = await axios.get(`${import.meta.env.VITE_URL}/payments`)
            return res.data;
        }
        
    })
    return [payment, refetch];
};

export default useAllPayment;