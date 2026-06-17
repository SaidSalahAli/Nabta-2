import { useMemo } from 'react';

// third-party
import useSWR from 'swr';

// project-imports
import { fetcher } from 'utils/axios';

// ==============================|| API - USERS ||============================== //

const endpoints = {
  key: 'api/AccountNabta/GetAllUsers',
  list: 'api/AccountNabta/GetAllUsers'
};

// Get all users
export function useGetUsers(params = {}) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR([endpoints.key, params], () => fetcher([endpoints.list, { params }]), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      users: Array.isArray(data) ? data : data?.data || data?.Data || [],
      usersLoading: isLoading,
      usersError: error,
      usersMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}
