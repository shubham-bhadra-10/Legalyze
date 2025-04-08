import { api } from '@/lib/api';
import { useQuery } from '@tanstack/react-query';

export const useCurrentUser = () => {
  const {
    isLoading,
    isError,
    data: user,
  } = useQuery({
    queryKey: ['currentUser'],
    queryFn: async () => {
      try {
        const response = await api.get('/auth/current-user');
        return response.data;
      } catch (err: any) {
        if (err.response?.status === 401) {
          return null; // User is not logged in
        }
      }
    },
  });

  return { isLoading, isError, user };
};
