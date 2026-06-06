import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';
import { processFormDataImages } from 'utils/imageCompressor';

// ==============================|| API - CATEGORIES ||============================== //

const endpoints = {
  key: 'api/Categories/List',
  list: 'api/Categories/List',
  create: 'api/Categories/Add',
  read: (id) => `api/Categories/Get/${id}`,
  update: (id) => `api/Categories/Update/${id}`,
  delete: (id) => `api/Categories/Delete/${id}`,
  search: (keyword) => `api/Categories/Search?keyword=${encodeURIComponent(keyword)}`
};

// Get all categories
export function useGetCategories(params = {}) {
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
      categories: Array.isArray(data) ? data : data?.Data || data?.data || [],
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Get single category
export function useGetCategory(id) {
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
      category: data?.data || data?.Data || null,
      categoryLoading: isLoading,
      categoryError: error,
      categoryMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create category
export async function createCategory(categoryData) {
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
export async function updateCategory(id, categoryData) {
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
export async function deleteCategory(id) {
  try {
    const response = await axiosServices.delete(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting category');
  }
}

// Search categories
export async function searchCategories(keyword) {
  try {
    const response = await axiosServices.get(endpoints.search(keyword));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error searching categories');
  }
}
