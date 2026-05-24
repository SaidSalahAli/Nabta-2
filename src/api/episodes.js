import { useMemo } from 'react';

// third-party
import useSWR, { mutate } from 'swr';

// project-imports
import axiosServices, { fetcher } from 'utils/axios';
import { mapEpisodes, mapEpisode } from 'utils/dataMapper';
import { processImageFields } from 'utils/imageCompressor';

// ==============================|| API - EPISODES ||============================== //

const endpoints = {
  key: 'api/Episodes',
  list: 'api/Episodes/List',
  create: 'api/Episodes/Add',
  read: (id) => `api/Episodes/ById?id=${id}`,
  update: 'api/Episodes/Update',
  delete: (id) => `api/Episodes/Delete?id=${id}`,
  byCategory: (categoryId) => `api/Episodes/ByCategory?categoryId=${categoryId}`,
  search: 'api/Episodes/search'
};

// Convert local field names to API field names (snake_case to PascalCase)
const convertToApiFormat = (episodeData) => {
  const apiData = {
    ID: episodeData.ID || episodeData.id || episodeData.Id,
    CategoryId: (() => {
      const rawId = episodeData.category_id || episodeData.CategoryId;
      return (rawId === 'undefined' || rawId === undefined || rawId === null || rawId === '') ? 1 : rawId;
    })(),
    TitleAr: episodeData.title_ar || episodeData.TitleAr,
    ShortDescriptionAr: episodeData.short_description_ar || episodeData.ShortDescriptionAr,
    DescriptionAr: episodeData.description_ar || episodeData.DescriptionAr,
    VideoUrl: episodeData.video_url || episodeData.VideoUrl,
    VideoType: episodeData.video_type || episodeData.VideoType,
    EpisodeNumber: episodeData.episode_number || episodeData.EpisodeNumber,
    DurationSeconds: episodeData.duration_seconds || episodeData.DurationSeconds,
    IsFeatured:
      episodeData.is_featured !== undefined
        ? episodeData.is_featured
        : episodeData.IsFeatured !== undefined
          ? episodeData.IsFeatured
          : false,
    HasWorksheets:
      episodeData.has_worksheets !== undefined
        ? episodeData.has_worksheets
        : episodeData.HasWorksheets !== undefined
          ? episodeData.HasWorksheets
          : false,
    Author: episodeData.author || episodeData.Author || ''
  };

  // Add optional fields only if they have values
  if (episodeData.title_en || episodeData.TitleEn) {
    apiData.TitleEn = episodeData.title_en || episodeData.TitleEn;
  }

  if (episodeData.short_description_en || episodeData.ShortDescriptionEn) {
    apiData.ShortDescriptionEn = episodeData.short_description_en || episodeData.ShortDescriptionEn;
  }

  if (episodeData.description_en || episodeData.DescriptionEn) {
    apiData.DescriptionEn = episodeData.description_en || episodeData.DescriptionEn;
  }

  if (episodeData.thumbnail_image || episodeData.ThumbnailImage) {
    apiData.ThumbnailImage = episodeData.thumbnail_image || episodeData.ThumbnailImage;
  }

  if (episodeData.cover_image || episodeData.CoverImage) {
    apiData.CoverImage = episodeData.cover_image || episodeData.CoverImage;
  }

  if (episodeData.transcript_ar || episodeData.TranscriptAr) {
    apiData.TranscriptAr = episodeData.transcript_ar || episodeData.TranscriptAr;
  }

  if (episodeData.transcript_en || episodeData.TranscriptEn) {
    apiData.TranscriptEn = episodeData.transcript_en || episodeData.TranscriptEn;
  }

  if (episodeData.published_at || episodeData.PublishedAt) {
    apiData.PublishedAt = episodeData.published_at || episodeData.PublishedAt;
  }

  return apiData;
};

// Get all episodes with filters
export function useGetEpisodes(params = {}) {
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
      episodes: mapEpisodes(Array.isArray(data) ? data : data?.Data || data?.data || []),
      episodesLoading: isLoading,
      episodesError: error,
      episodesMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Get single episode
export function useGetEpisode(id) {
  const fetchEpisode = async (url) => {
    const response = await axiosServices.post(url);
    return response.data;
  };

  const {
    data,
    isLoading,
    error,
    mutate: mutateData
  } = useSWR(id ? endpoints.read(id) : null, fetchEpisode, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false
  });

  const memoizedValue = useMemo(
    () => ({
      episode: mapEpisode(data?.Data || data?.data || data || null),
      episodeLoading: isLoading,
      episodeError: error,
      episodeMutate: mutateData
    }),
    [data, isLoading, error, mutateData]
  );

  return memoizedValue;
}

// Create episode
export async function createEpisode(episodeData) {
  try {
    const apiData = await processImageFields(convertToApiFormat(episodeData));

    const formData = new FormData();
    Object.keys(apiData).forEach(key => {
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

    // Associate worksheet if selected
    const newEpisodeId = response.data?.Data?.Id || response.data?.Data?.id || response.data?.data?.id || response.data?.id;
    if (newEpisodeId && episodeData.worksheet_id) {
      await associateWorksheetWithEpisode(episodeData.worksheet_id, newEpisodeId);
    }

    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error creating episode');
  }
}

// Update episode
export async function updateEpisode(episodeData) {
  try {
    const apiData = await processImageFields(convertToApiFormat(episodeData));

    const formData = new FormData();
    Object.keys(apiData).forEach(key => {
      if (apiData[key] !== null && apiData[key] !== undefined) {
        // If it's a string url, and we are updating, we might not need to send it if the API expects a File.
        // Assuming the API ignores non-file string values for file fields or handles them properly.
        formData.append(key, apiData[key]);
      }
    });

    const response = await axiosServices.put(endpoints.update, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    mutate(endpoints.key);
    mutate(endpoints.read(apiData.ID));

    // Handle worksheet changes
    const episodeId = apiData.ID;
    if (episodeId && episodeData.worksheet_id !== episodeData.prev_worksheet_id) {
      if (episodeData.prev_worksheet_id) {
        await associateWorksheetWithEpisode(episodeData.prev_worksheet_id, null);
      }
      if (episodeData.worksheet_id) {
        await associateWorksheetWithEpisode(episodeData.worksheet_id, episodeId);
      }
    }

    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error updating episode');
  }
}

// Delete episode
export async function deleteEpisode(id) {
  try {
    const response = await axiosServices.delete(endpoints.delete(id));
    mutate(endpoints.key);
    return response.data;
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error deleting episode');
  }
}

// Get episodes by category
export async function getEpisodesByCategory(categoryId) {
  try {
    const response = await axiosServices.get(endpoints.byCategory(categoryId));
    return mapEpisodes(Array.isArray(response.data) ? response.data : response.data?.data || []);
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error fetching episodes');
  }
}

// Search episodes
export async function searchEpisodes(searchParams) {
  try {
    // Convert search params to API format
    const apiSearchParams = {
      Title: searchParams.title || searchParams.Title,
      CategoryId: searchParams.categoryId || searchParams.CategoryId,
      IsFeatured: searchParams.isFeatured !== undefined ? searchParams.isFeatured : searchParams.IsFeatured
    };

    const response = await axiosServices.post(endpoints.search, apiSearchParams);
    return mapEpisodes(Array.isArray(response.data) ? response.data : response.data?.data || []);
  } catch (error) {
    return Promise.reject((error.response && error.response.data) || 'Error searching episodes');
  }
}

// Helper to associate or dissociate a worksheet with an episode
export const associateWorksheetWithEpisode = async (worksheetId, episodeId) => {
  if (!worksheetId) return;
  try {
    const res = await axiosServices.get(`api/EpisodeWorksheet/GetById?id=${worksheetId}`);
    const wsData = res.data?.Data || res.data?.data || res.data;
    if (!wsData) return;

    const formData = new FormData();
    formData.append('Id', worksheetId);
    if (episodeId) {
      formData.append('EpisodeId', String(episodeId));
    } else {
      formData.append('EpisodeId', '0'); // Dissociate
    }
    formData.append('TitleAr', wsData.TitleAr || wsData.title_ar || '');
    formData.append('DescriptionAr', wsData.DescriptionAr || wsData.description_ar || '');
    formData.append('FileType', wsData.FileType || wsData.file_type || 'pdf');
    formData.append('IsActive', wsData.IsActive !== undefined ? String(wsData.IsActive) : 'true');

    await axiosServices.put('api/EpisodeWorksheet/Update', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  } catch (err) {
    console.error('Failed to associate/dissociate worksheet:', err);
  }
};
