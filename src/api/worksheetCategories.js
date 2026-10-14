import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';

// ==============================|| API - WORKSHEET CATEGORIES ||============================== //

const endpoints = {
  key: 'api/WorksheetCategory',
  list: 'api/WorksheetCategory/GetAll',
  create: 'api/WorksheetCategory/Add',
  read: (id) => `api/WorksheetCategory/ById?id=${id}`,
  update: 'api/WorksheetCategory/Update',
  delete: (id) => `api/WorksheetCategory/Delete?id=${id}`
};

// Normalize category object to ensure both PascalCase and camelCase keys are available
export const normalizeWorksheetCategory = (cat) => {
  if (!cat) return null;
  const id = cat.Id ?? cat.id;
  const nameAr = cat.NameAr ?? cat.nameAr ?? '';
  const nameEn = cat.NameEn ?? cat.nameEn ?? '';
  const description = cat.Description ?? cat.description ?? '';
  const isActive = cat.IsActive ?? cat.isActive ?? true;

  return {
    ...cat,
    id,
    Id: id,
    nameAr,
    NameAr: nameAr,
    nameEn,
    NameEn: nameEn,
    description,
    Description: description,
    isActive,
    IsActive: isActive
  };
};

// Get all worksheet categories
export function useGetWorksheetCategories(params = {}) {
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

  const memoizedValue = useMemo(() => {
    const rawList = Array.isArray(data) ? data : data?.data || data?.Data || [];
    const normalized = rawList.map(normalizeWorksheetCategory);

    return {
      categories: normalized,
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesMutate: mutateData
    };
  }, [data, isLoading, error, mutateData]);

  return memoizedValue;
}

// Get single category
export function useGetWorksheetCategory(id) {
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

  const memoizedValue = useMemo(() => {
    const raw = data?.data || data?.Data || data || null;
    return {
      category: raw ? normalizeWorksheetCategory(raw) : null,
      categoryLoading: isLoading,
      categoryError: error,
      categoryMutate: mutateData
    };
  }, [data, id, isLoading, error, mutateData]);

  return memoizedValue;
}

// Create category
export async function createWorksheetCategory(categoryData) {
  const payload = {
    Id: 0,
    NameAr: categoryData.nameAr || categoryData.NameAr || '',
    Description: categoryData.description || categoryData.Description || ''
  };

  try {
    const response = await axiosServices.post(endpoints.create, payload);
    mutate(endpoints.key);
    mutate([endpoints.key, {}]);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating worksheet category');
  }
}

// Update category
export async function updateWorksheetCategory(id, categoryData) {
  const catId = Number(id || categoryData.id || categoryData.Id);
  const payload = {
    Id: catId,
    NameAr: categoryData.nameAr || categoryData.NameAr || '',
    Description: categoryData.description || categoryData.Description || ''
  };

  try {
    const response = await axiosServices.put(endpoints.update, payload);
    mutate(endpoints.key);
    mutate([endpoints.key, {}]);
    mutate(endpoints.read(catId));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating worksheet category');
  }
}

// Delete category
export async function deleteWorksheetCategory(id) {
  const catId = Number(id);
  try {
    const response = await axiosServices.delete(endpoints.delete(catId));
    mutate(endpoints.key);
    mutate([endpoints.key, {}]);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting worksheet category');
  }
}

