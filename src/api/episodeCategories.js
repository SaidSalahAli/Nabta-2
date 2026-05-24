import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';
import { mapCategories, mapCategory } from 'utils/dataMapper';
import { processFormDataImages } from 'utils/imageCompressor';

// ==============================|| API - EPISODE CATEGORIES ||============================== //

const endpoints = {
  key: 'api/EpisodeCategory/List',
  list: 'api/EpisodeCategory/List',
  create: 'api/EpisodeCategory/Add',
  read: (id) => `api/EpisodeCategory/List?id=${id}`,
  update: (id) => `api/EpisodeCategory/Update/${id}`,
  delete: (id) => `api/EpisodeCategory/Delete/${id}`,
  search: (name) => `api/EpisodeCategory/Search?name=${name}`
};

// Get all categories
export function useGetEpisodeCategories(params = {}) {
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
      categories: mapCategories(Array.isArray(data) ? data : data?.Data || data?.data || []),
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Get single category
export function useGetEpisodeCategory(id) {
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
      category: mapCategory(data?.data || null),
      categoryLoading: isLoading,
      categoryError: error,
      categoryMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create category
export async function createEpisodeCategory(categoryData) {
  try {
    const config = {};
    if (categoryData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const processedData = await processFormDataImages(categoryData);
    const response = await axiosServices.post(endpoints.create, processedData, config);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating category');
  }
}

// Update category
export async function updateEpisodeCategory(id, categoryData) {
  try {
    const config = {};
    if (categoryData instanceof FormData) {
      config.headers = { 'Content-Type': 'multipart/form-data' };
    }
    const processedData = await processFormDataImages(categoryData);
    const response = await axiosServices.put(endpoints.update(id), processedData, config);
    mutate(endpoints.key);
    mutate(endpoints.read(id));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating category');
  }
}

// Delete category
export async function deleteEpisodeCategory(id) {
  try {
    const response = await axiosServices.delete(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting category');
  }
}

// Search categories by name
export async function searchEpisodeCategories(name) {
  try {
    const response = await axiosServices.get(endpoints.search(name));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error searching categories');
  }
}
