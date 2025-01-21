import { useQuery } from '@tanstack/react-query';
import React from 'react';
import  axios  from 'axios';
import useAxios from './useAxios';

const useAllStories = () => {
    const secureAxios = useAxios()
    const {data: allStorie = [], refetch, isLoading } = useQuery({
        queryKey: ['allSrotiesData'],
        queryFn: async () => {
            const res = secureAxios.get(`/stories`)
            return (await res).data;
        }
        
    })
    return [allStorie, refetch,isLoading];
};

export default useAllStories;