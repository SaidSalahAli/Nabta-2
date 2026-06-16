import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';

// ==============================|| API - APPLICATIONS ||============================== //

const endpoints = {
  key: 'api/app-full/list',
  list: 'api/app-full/list',
  create: 'api/app-full/save',
  read: (id) => `api/app-full/details/${id}`,
  update: () => `api/app-full/save`,
  delete: (id) => `api/app-full/delete/${id}`,
  search: (keyword) => `api/app-full/search?keyword=${keyword || ''}`
};

// Get all applications
export function useGetApplications(params = {}) {
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
      applications: Array.isArray(data) ? data : data?.Data || data?.data || [],
      applicationsLoading: isLoading,
      applicationsError: error,
      applicationsMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Get single application
export function useGetApplication(id) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR(id ? [endpoints.read(id)] : null, () => fetcher(endpoints.read(id)), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      application: data?.application || null,
      category: data?.category || null,
      applicationLoading: isLoading,
      applicationError: error,
      applicationMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create application
export async function createApplication(applicationData) {
  try {
    const config = {};
    if (applicationData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await axiosServices.post(endpoints.create, applicationData, config);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating application');
  }
}

// Update application
export async function updateApplication(id, applicationData) {
  try {
    const config = {};
    if (applicationData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const response = await axiosServices.post(endpoints.update(id), applicationData, config);
    mutate(endpoints.key);
    mutate(endpoints.read(id));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating application');
  }
}

// Delete application
export async function deleteApplication(id) {
  try {
    const response = await axiosServices.delete(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting application');
  }
}

// Search applications
export async function searchApplications(keyword) {
  try {
    const response = await axiosServices.get(endpoints.search(keyword));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error searching applications');
  }
}
