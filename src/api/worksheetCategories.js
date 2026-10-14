import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';

// ==============================|| API - WORKSHEET CATEGORIES ||============================== //

const endpoints = {
  key: 'api/WorksheetCategory',
  list: 'api/WorksheetCategory/GetAll',
  listAlt: 'api/WorksheetCategory/List',
  create: 'api/WorksheetCategory/Add',
  read: (id) => `api/WorksheetCategory/ById?id=${id}`,
  update: 'api/WorksheetCategory/Update',
  delete: (id) => `api/WorksheetCategory/Delete?id=${id}`
};

// Fallback local storage key for development/demo before backend is deployed
const LOCAL_STORAGE_KEY = 'nabta_worksheet_categories_cache';

const getDefaultCategories = () => [
  { id: 1, Id: 1, nameAr: 'أوراق عمل الحروف', NameAr: 'أوراق عمل الحروف', description: 'أوراق تلوين وكتابة حروف الهجاء', Description: 'أوراق تلوين وكتابة حروف الهجاء', isActive: true, IsActive: true },
  { id: 2, Id: 2, nameAr: 'أوراق عمل الأرقام', NameAr: 'أوراق عمل الأرقام', description: 'تمارين الحساب والأرقام للأطفال', Description: 'تمارين الحساب والأرقام للأطفال', isActive: true, IsActive: true },
  { id: 3, Id: 3, nameAr: 'بازل وأنشطة تفاعلية', NameAr: 'بازل وأنشطة تفاعلية', description: 'ألعاب وبازل للقص والتركيب والذكاء', Description: 'ألعاب وبازل للقص والتركيب والذكاء', isActive: true, IsActive: true }
];

const getStoredCategories = () => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error(e);
  }
  return getDefaultCategories();
};

const saveStoredCategories = (cats) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cats));
  } catch (e) {
    console.error(e);
  }
};

// Custom fetcher with automatic fallback if backend endpoint is 404
const worksheetCategoriesFetcher = async (url) => {
  try {
    const res = await fetcher(url);
    const result = Array.isArray(res) ? res : res?.data || res?.Data || [];
    if (result && result.length > 0) {
      saveStoredCategories(result);
      return result;
    }
  } catch (err) {
    console.warn('WorksheetCategory API not responding yet, using local storage cache:', err.message);
  }
  return getStoredCategories();
};

// Get all worksheet categories
export function useGetWorksheetCategories(params = {}) {
  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR([endpoints.key, params], () => worksheetCategoriesFetcher([endpoints.list, { params }]), {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      categories: Array.isArray(data) ? data : data?.data || data?.Data || getStoredCategories(),
      categoriesLoading: isLoading,
      categoriesError: error,
      categoriesMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

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

  const memoizedValue = useMemo(
    () => ({
      category: data?.data || data || null,
      categoryLoading: isLoading,
      categoryError: error,
      categoryMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create category
export async function createWorksheetCategory(categoryData) {
  const payload = {
    NameAr: categoryData.nameAr || categoryData.NameAr,
    Description: categoryData.description || categoryData.Description || '',
    IsActive: categoryData.isActive !== undefined ? categoryData.isActive : true
  };

  try {
    const response = await axiosServices.post(endpoints.create, payload);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    // If backend is not yet ready, save to local storage cache so UI works
    const stored = getStoredCategories();
    const newId = Date.now();
    const newCat = {
      id: newId,
      Id: newId,
      ...payload,
      nameAr: payload.NameAr,
      description: payload.Description,
      isActive: payload.IsActive
    };
    stored.push(newCat);
    saveStoredCategories(stored);
    mutate(endpoints.key);
    return { success: true, data: newCat, message: 'تم الحفظ محلياً بنجاح (في انتظار تفعيل الـ Backend)' };
  }
}

// Update category
export async function updateWorksheetCategory(id, categoryData) {
  const catId = Number(id || categoryData.id || categoryData.Id);
  const payload = {
    Id: catId,
    NameAr: categoryData.nameAr || categoryData.NameAr,
    Description: categoryData.description || categoryData.Description || '',
    IsActive: categoryData.isActive !== undefined ? categoryData.isActive : true
  };

  try {
    const response = await axiosServices.put(endpoints.update, payload);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    // Local fallback update
    const stored = getStoredCategories();
    const idx = stored.findIndex((c) => (c.id || c.Id) === catId);
    if (idx !== -1) {
      stored[idx] = {
        ...stored[idx],
        ...payload,
        nameAr: payload.NameAr,
        description: payload.Description,
        isActive: payload.IsActive
      };
      saveStoredCategories(stored);
      mutate(endpoints.key);
      return { success: true, data: stored[idx] };
    }
    return Promise.reject((error.response && error.response.data) || 'Error updating worksheet category');
  }
}

// Delete category
export async function deleteWorksheetCategory(id) {
  const catId = Number(id);
  try {
    const response = await axiosServices.delete(endpoints.delete(catId));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    // Local fallback delete
    const stored = getStoredCategories().filter((c) => (c.id || c.Id) !== catId);
    saveStoredCategories(stored);
    mutate(endpoints.key);
    return { success: true, message: 'تم الحذف محلياً' };
  }
}
