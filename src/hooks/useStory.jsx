import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useUser from './useUser';
import axios from 'axios';

const useStory = () => {
    const [loginUser] = useUser()

      const {
        data: stories,
        isLoading,
        error,
        refetch,
      } = useQuery({
        queryKey: ["touristStories", loginUser?.email],
        queryFn: async () => {
          const response = await axios.get(`${import.meta.env.VITE_URL}/storie/${loginUser.email}`);
          return response.data;
        },
      });
    
    return [stories, isLoading, error, refetch]
};

export default useStory;