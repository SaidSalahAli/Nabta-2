// ==============================|| DATA MAPPER UTILITY ||============================== //

/**
 * Maps category data from API to standardized format
 * Handles both field naming conventions (Id/id, NameAr/name_ar, etc.)
 */
export const mapCategory = (category) => {
  if (!category) return null;

  return {
    id: category.ID || category.Id || category.id,
    name_ar: category.NameAr || category.name_ar,
    name_en: category.NameEn || category.name_en,
    description_ar: category.DescriptionAr || category.description_ar,
    description_en: category.DescriptionEn || category.description_en,
    image: category.Image || category.image,
    // Keep original for reference
    ...category
  };
};

/**
 * Maps episode data from API to standardized format
 */
export const mapEpisode = (episode) => {
  if (!episode) return null;

  return {
    id: episode.ID || episode.Id || episode.id,
    category_id: episode.CategoryId || episode.category_id,
    title_ar: episode.TitleAr || episode.title_ar,
    title_en: episode.TitleEn || episode.title_en,
    short_description_ar: episode.ShortDescriptionAr || episode.short_description_ar,
    short_description_en: episode.ShortDescriptionEn || episode.short_description_en,
    description_ar: episode.DescriptionAr || episode.description_ar,
    description_en: episode.DescriptionEn || episode.description_en,
    video_url: episode.VideoUrl || episode.video_url,
    video_type: episode.VideoType || episode.video_type,
    thumbnail_image: episode.ThumbnailImage || episode.thumbnail_image,
    cover_image: episode.CoverImage || episode.cover_image,
    episode_number: episode.EpisodeNumber || episode.episode_number,
    duration_seconds: episode.DurationSeconds || episode.duration_seconds,
    transcript_ar: episode.TranscriptAr || episode.transcript_ar,
    transcript_en: episode.TranscriptEn || episode.transcript_en,
    is_published: episode.IsPublished || episode.is_published,
    is_featured: episode.IsFeatured || episode.is_featured,
    has_worksheets: episode.HasWorksheets || episode.has_worksheets,
    slug: episode.Slug || episode.slug,
    sort_order: episode.SortOrder || episode.sort_order,
    published_at: episode.PublishedAt || episode.published_at,
    created_at: episode.CreatedAt || episode.created_at,
    updated_at: episode.UpdatedAt || episode.updated_at,
    author: episode.Author || episode.author,
    episode_worksheets: episode.EpisodeWorksheets || episode.episode_worksheets || episode.EpisodeWorksheet || [],
    EpisodeWorksheets: episode.EpisodeWorksheets || episode.episode_worksheets || episode.EpisodeWorksheet || [],
    // Keep original for reference
    ...episode
  };
};

/**
 * Maps array of categories
 */
export const mapCategories = (categories) => {
  if (!Array.isArray(categories)) return [];
  return categories.map(mapCategory);
};

/**
 * Maps array of episodes
 */
export const mapEpisodes = (episodes) => {
  if (!Array.isArray(episodes)) return [];
  return episodes.map(mapEpisode);
};

/**
 * Maps worksheet data from API to standardized format
 */
export const mapWorksheet = (worksheet) => {
  if (!worksheet) return null;

  const categoryId =
    worksheet.CategoryId ??
    worksheet.category_id ??
    worksheet.worksheet_category_id ??
    worksheet.WorksheetCategoryId ??
    worksheet.Category?.Id ??
    worksheet.Category?.id ??
    worksheet.WorksheetCategory?.Id ??
    worksheet.WorksheetCategory?.id;

  const episodeId = worksheet.EpisodeId ?? worksheet.episode_id ?? worksheet.episodeId;

  return {
    id: worksheet.ID || worksheet.Id || worksheet.id,
    category_id: categoryId,
    CategoryId: categoryId,
    episode_id: episodeId,
    EpisodeId: episodeId,
    title_ar: worksheet.TitleAr || worksheet.title_ar || worksheet.titleAr,
    title_en: worksheet.TitleEn || worksheet.title_en || worksheet.titleEn,
    description_ar: worksheet.DescriptionAr || worksheet.description_ar || worksheet.descriptionAr,
    description_en: worksheet.DescriptionEn || worksheet.description_en || worksheet.descriptionEn,
    file_type: worksheet.FileType || worksheet.file_type || worksheet.fileType || 'pdf',
    file_url: worksheet.FileUrl || worksheet.file_url || worksheet.file || worksheet.File,
    thumbnail_image: worksheet.ThumbnailImage || worksheet.thumbnail_image || worksheet.thumbnail || worksheet.Thumbnail,
    is_active: worksheet.IsActive !== undefined ? worksheet.IsActive : worksheet.is_active !== undefined ? worksheet.is_active : true,
    ...worksheet
  };
};

/**
 * Maps array of worksheets
 */
export const mapWorksheets = (worksheets) => {
  if (!Array.isArray(worksheets)) return [];
  return worksheets.map(mapWorksheet);
};
