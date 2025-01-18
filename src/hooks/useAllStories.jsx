import { useQuery } from '@tanstack/react-query';
import React from 'react';
import  axios  from 'axios';

const useAllStories = () => {
    const {data: allStorie = [], refetch } = useQuery({
        queryKey: ['allSrotiesData'],
        queryFn: async () => {
            const res = axios.get(`${import.meta.env.VITE_URL}/stories`)
            return (await res).data;
        }
        
    })
    return [allStorie, refetch];
};

export default useAllStories;