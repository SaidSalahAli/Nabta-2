import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';
import { processImageFields } from 'utils/imageCompressor';

// ==============================|| API - WORKSHEETS ||============================== //

const endpoints = {
  key: 'api/EpisodeWorksheet',
  list: 'api/EpisodeWorksheet/List',
  create: 'api/EpisodeWorksheet/Add',
  read: (id) => `api/EpisodeWorksheet/GetById?id=${id}`,
  update: 'api/EpisodeWorksheet/Update',
  delete: (id) => `api/EpisodeWorksheet/Delete?id=${id}`
};

// Convert local field names to API field names
const convertToApiFormat = (worksheetData) => {
  const apiData = {
    Id: worksheetData.Id || worksheetData.id,
    EpisodeId: worksheetData.episode_id || worksheetData.EpisodeId,
    TitleAr: worksheetData.title_ar || worksheetData.TitleAr,
    DescriptionAr: worksheetData.description_ar || worksheetData.DescriptionAr,
    FileType: worksheetData.file_type || worksheetData.FileType,
    IsActive:
      worksheetData.is_active !== undefined
        ? worksheetData.is_active
        : worksheetData.IsActive !== undefined
          ? worksheetData.IsActive
          : true
  };

  if (worksheetData.title_en || worksheetData.TitleEn) {
    apiData.TitleEn = worksheetData.title_en || worksheetData.TitleEn;
  }
  if (worksheetData.description_en || worksheetData.DescriptionEn) {
    apiData.DescriptionEn = worksheetData.description_en || worksheetData.DescriptionEn;
  }
  if (worksheetData.file || worksheetData.File) {
    apiData.File = worksheetData.file || worksheetData.File;
  }
  if (worksheetData.thumbnail || worksheetData.Thumbnail) {
    apiData.Thumbnail = worksheetData.thumbnail || worksheetData.Thumbnail;
  }

  return apiData;
};

// Get all worksheets
export function useGetWorksheets(params = {}) {
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
      worksheets: Array.isArray(data) ? data : data?.Data || data?.data || [],
      worksheetsLoading: isLoading,
      worksheetsError: error,
      worksheetsMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Get single worksheet
export function useGetWorksheet(id) {
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
      worksheet: data?.data || data || null,
      worksheetLoading: isLoading,
      worksheetError: error,
      worksheetMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create worksheet
export async function createWorksheet(worksheetData) {
  try {
    const apiData = await processImageFields(convertToApiFormat(worksheetData));
    const formData = new FormData();
    Object.keys(apiData).forEach((key) => {
      if (apiData[key] !== null && apiData[key] !== undefined) {
        formData.append(key, apiData[key]);
      }
    });

    const response = await axiosServices.post(endpoints.create, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating worksheet');
  }
}

// Update worksheet
export async function updateWorksheet(worksheetData) {
  try {
    const apiData = await processImageFields(convertToApiFormat(worksheetData));
    const formData = new FormData();
    Object.keys(apiData).forEach((key) => {
      if (apiData[key] !== null && apiData[key] !== undefined) {
        // Skip appending string URLs for File/Thumbnail because the backend expects a multipart file upload
        if (typeof apiData[key] === 'string' && (key === 'File' || key === 'Thumbnail')) {
          return;
        }
        formData.append(key, apiData[key]);
      }
    });

    // Update endpoint doesn't usually take ID in the path if it's consistent with Episodes
    const response = await axiosServices.put(endpoints.update, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    mutate(endpoints.key);
    mutate(endpoints.read(apiData.Id));
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating worksheet');
  }
}

// Delete worksheet
export async function deleteWorksheet(id) {
  try {
    const response = await axiosServices.delete(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting worksheet');
  }
}
