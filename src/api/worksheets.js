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

// Fallback cache key for category linking in case backend model binding is evolving
const WORKSHEET_CAT_LINKS_KEY = 'nabta_worksheet_category_links';

export const getStoredWorksheetCategoryLinks = () => {
  try {
    const raw = localStorage.getItem(WORKSHEET_CAT_LINKS_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {
    console.error('Error reading worksheet category links from localStorage:', e);
  }
  return {};
};

export const saveWorksheetCategoryLink = (worksheetId, categoryId) => {
  if (!worksheetId) return;
  try {
    const links = getStoredWorksheetCategoryLinks();
    if (categoryId !== null && categoryId !== undefined && categoryId !== '') {
      links[String(worksheetId)] = Number(categoryId);
    } else {
      delete links[String(worksheetId)];
    }
    localStorage.setItem(WORKSHEET_CAT_LINKS_KEY, JSON.stringify(links));
  } catch (e) {
    console.error('Error saving worksheet category link to localStorage:', e);
  }
};

const convertToApiFormat = (worksheetData) => {
  // احسب EpisodeId من كل المصادر الممكنة
  const rawEpisodeId = worksheetData.episode_id ?? worksheetData.EpisodeId ?? worksheetData.episodeId;
  const episodeId = rawEpisodeId !== '' && rawEpisodeId !== null && rawEpisodeId !== undefined
    ? Number(rawEpisodeId)
    : undefined;

  const rawCategoryId =
    worksheetData.category_id ??
    worksheetData.CategoryId ??
    worksheetData.categoryId ??
    worksheetData.worksheet_category_id ??
    worksheetData.WorksheetCategoryId;
  const categoryId = rawCategoryId !== '' && rawCategoryId !== null && rawCategoryId !== undefined
    ? Number(rawCategoryId)
    : undefined;

  const apiData = {
    Id: worksheetData.Id || worksheetData.id,
    EpisodeId: episodeId,
    CategoryId: categoryId,
    TitleAr: worksheetData.title_ar || worksheetData.TitleAr,
    DescriptionAr: worksheetData.description_ar || worksheetData.DescriptionAr,
    FileType: worksheetData.file_type || worksheetData.FileType || 'pdf',
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

  const memoizedValue = useMemo(() => {
    const rawList = Array.isArray(data) ? data : data?.Data || data?.data || [];
    const storedLinks = getStoredWorksheetCategoryLinks();

    const enrichedWorksheets = rawList.map((item) => {
      const id = item.Id || item.id;
      const directCatId =
        item.CategoryId ??
        item.category_id ??
        item.worksheet_category_id ??
        item.WorksheetCategoryId ??
        item.Category?.Id ??
        item.Category?.id ??
        item.WorksheetCategory?.Id ??
        item.WorksheetCategory?.id;

      const resolvedCatId =
        directCatId !== null && directCatId !== undefined && directCatId !== ''
          ? Number(directCatId)
          : (storedLinks[String(id)] ? Number(storedLinks[String(id)]) : undefined);

      return {
        ...item,
        CategoryId: resolvedCatId,
        category_id: resolvedCatId,
        worksheet_category_id: resolvedCatId
      };
    });

    return {
      worksheets: enrichedWorksheets,
      worksheetsLoading: isLoading,
      worksheetsError: error,
      worksheetsMutate: mutateData
    };
  }, [data, isLoading, error, mutateData]);

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

  const memoizedValue = useMemo(() => {
    const rawItem = data?.data || data || null;
    if (!rawItem) {
      return {
        worksheet: null,
        worksheetLoading: isLoading,
        worksheetError: error,
        worksheetMutate: mutateData
      };
    }

    const storedLinks = getStoredWorksheetCategoryLinks();
    const itemId = rawItem.Id || rawItem.id || id;
    const directCatId =
      rawItem.CategoryId ??
      rawItem.category_id ??
      rawItem.worksheet_category_id ??
      rawItem.WorksheetCategoryId;

    const resolvedCatId =
      directCatId !== null && directCatId !== undefined && directCatId !== ''
        ? Number(directCatId)
        : (storedLinks[String(itemId)] ? Number(storedLinks[String(itemId)]) : undefined);

    return {
      worksheet: {
        ...rawItem,
        CategoryId: resolvedCatId,
        category_id: resolvedCatId
      },
      worksheetLoading: isLoading,
      worksheetError: error,
      worksheetMutate: mutateData
    };
  }, [data, id, isLoading, error, mutateData]);

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

    const createdId = response?.data?.Id || response?.data?.id || response?.data?.Data?.Id || response?.data?.Data?.id;
    const catId = worksheetData.category_id ?? worksheetData.CategoryId;
    if (createdId && catId !== undefined && catId !== null && catId !== '') {
      saveWorksheetCategoryLink(createdId, catId);
    }

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

    const targetId = apiData.Id || worksheetData.id || worksheetData.Id;
    const catId = worksheetData.category_id ?? worksheetData.CategoryId;
    saveWorksheetCategoryLink(targetId, catId);

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
    saveWorksheetCategoryLink(id, null);
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting worksheet');
  }
}
