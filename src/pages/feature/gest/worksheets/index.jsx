import React, { useState, useEffect, useMemo } from 'react';
import { Box, Typography, Container, Grid, Fade, Skeleton, Pagination, TextField, InputAdornment, IconButton } from '@mui/material';
import { DocumentDownload, Document, SearchNormal, CloseCircle } from 'iconsax-react';
import { useGetWorksheets } from 'api/worksheets';
import { useGetWorksheetCategories } from 'api/worksheetCategories';
import worksheetsImg from 'assets/Home/worksheets.png';
import SEO from 'components/SEO';
import {
  PageHero,
  CategoryPills,
  EmptyState,
  KidButton,
  crayon,
  kidColors,
  kidFont,
  kidFieldSx,
  kidPaginationSx,
  stickerCard
} from 'components/kids';

const getCatId = (w) =>
  w.CategoryId ??
  w.category_id ??
  w.worksheet_category_id ??
  w.WorksheetCategoryId ??
  w.Category?.Id ??
  w.Category?.id ??
  w.WorksheetCategory?.Id ??
  w.WorksheetCategory?.id;

// ==============================|| WORKSHEET CARD ||============================== //

function WorksheetCard({ worksheet, index, categoryName, onCategoryClick }) {
  const [imgError, setImgError] = useState(false);
  const c = crayon(index);
  const title = worksheet.TitleAr || worksheet.title_ar || worksheet.titleAr || '';
  const thumbnail = worksheet.ThumbnailImage || worksheet.thumbnailImage || worksheet.thumbnail || '';
  const fileUrl = worksheet.FileUrl || worksheet.fileUrl || worksheet.file || '';
  const fileType = (worksheet.FileType || worksheet.file_type || worksheet.fileType || 'pdf').toLowerCase();

  const handleDownload = (e) => {
    e.stopPropagation();
    if (!fileUrl) return;
    const link = document.createElement('a');
    link.href = fileUrl;
    link.target = '_blank';
    link.download = `${title || 'worksheet'}.${fileType}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Fade in timeout={400 + (index % 12) * 60}>
      <Box sx={{ ...stickerCard(c.main), height: '100%', display: 'flex', flexDirection: 'column', p: 1.25 }}>
        <Box sx={{ position: 'relative', paddingTop: '130%', backgroundColor: c.soft, borderRadius: '20px', overflow: 'hidden' }}>
          {thumbnail && !imgError ? (
            <Box
              component="img"
              src={thumbnail}
              alt={title}
              loading="lazy"
              onError={() => setImgError(true)}
              sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1
              }}
            >
              <Document size={56} color={c.main} variant="Bold" />
              <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, fontWeight: 700, fontSize: '0.9rem' }}>
                ورقة جاهزة للطباعة
              </Typography>
            </Box>
          )}

          <Box
            sx={{
              position: 'absolute',
              top: 10,
              insetInlineEnd: 10,
              fontFamily: kidFont,
              fontWeight: 800,
              fontSize: 11,
              letterSpacing: '0.04em',
              color: '#fff',
              backgroundColor: fileType === 'pdf' ? kidColors.coral : kidColors.sky,
              borderRadius: '10px',
              px: 1,
              py: 0.25,
              direction: 'ltr'
            }}
          >
            {fileType.toUpperCase()}
          </Box>

          {categoryName && (
            <Box
              component={onCategoryClick ? 'button' : 'span'}
              type={onCategoryClick ? 'button' : undefined}
              onClick={
                onCategoryClick
                  ? (e) => {
                      e.stopPropagation();
                      onCategoryClick();
                    }
                  : undefined
              }
              sx={{
                position: 'absolute',
                top: 10,
                insetInlineStart: 10,
                maxWidth: '70%',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                fontFamily: kidFont,
                fontWeight: 800,
                fontSize: 12,
                color: kidColors.ink,
                backgroundColor: '#fff',
                border: 0,
                borderRadius: '999px',
                px: 1.25,
                py: 0.4,
                boxShadow: `0 3px 0 ${kidColors.ink}1F`,
                cursor: onCategoryClick ? 'pointer' : 'default',
                '&:hover': onCategoryClick ? { backgroundColor: kidColors.sun } : {}
              }}
            >
              {categoryName}
            </Box>
          )}
        </Box>

        <Box sx={{ p: 1, pt: 1.75, display: 'flex', flexDirection: 'column', gap: 1.5, flexGrow: 1, justifyContent: 'space-between' }}>
          <Typography
            component="h3"
            title={title}
            sx={{
              fontFamily: kidFont,
              fontWeight: 800,
              color: kidColors.ink,
              fontSize: '1.05rem',
              lineHeight: 1.5,
              textAlign: 'center',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '3em',
              m: 0
            }}
          >
            {title}
          </Typography>

          <KidButton
            color="leaf"
            size="small"
            fullWidth
            onClick={handleDownload}
            disabled={!fileUrl}
            startIcon={<DocumentDownload size={18} color="#fff" />}
          >
            تحميل مجاني
          </KidButton>
        </Box>
      </Box>
    </Fade>
  );
}

function WorksheetSkeleton() {
  return (
    <Box sx={{ ...stickerCard(kidColors.sky, { lift: false }), p: 1.25 }}>
      <Skeleton variant="rounded" sx={{ paddingTop: '130%', height: 0, borderRadius: '20px' }} />
      <Box sx={{ p: 1 }}>
        <Skeleton variant="text" width="75%" height={28} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="rounded" height={40} sx={{ borderRadius: '14px' }} />
      </Box>
    </Box>
  );
}

// ==============================|| WORKSHEETS GUEST PAGE ||============================== //

const ITEMS_PER_PAGE = 12;

export default function WorksheetsPage() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  const { worksheets = [], worksheetsLoading } = useGetWorksheets(selectedCategory !== 'all' ? { categoryId: selectedCategory } : {});
  const { categories = [], categoriesLoading } = useGetWorksheetCategories();

  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const id = cat.id || cat.Id;
      const name = cat.nameAr || cat.NameAr || cat.name_ar;
      if (id && name) map[String(id)] = name;
    });
    return map;
  }, [categories]);

  const currentCategory = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return categories.find((cat) => String(cat.id || cat.Id) === String(selectedCategory)) || null;
  }, [categories, selectedCategory]);

  const categoryName = currentCategory ? currentCategory.nameAr || currentCategory.NameAr || currentCategory.name_ar : null;
  const infoTitle = categoryName || 'أوراق عمل';
  const infoDescription =
    currentCategory?.description ||
    currentCategory?.Description ||
    'اطبع أوراق مذاكرة وتلوين، واجعل طفلك يتفاعل بنفسه مع الورقة والقلم والألوان لتنمّي قدراته الحركية ومهاراته الإبداعية.';
  const infoImage = currentCategory?.image || currentCategory?.photo || worksheetsImg;

  const filteredWorksheets = useMemo(() => {
    let list = worksheets.filter((w) => w.IsActive !== false && w.is_active !== false);

    if (selectedCategory !== 'all') {
      list = list.filter((w) => String(getCatId(w)) === String(selectedCategory));
    }

    if (searchTerm.trim()) {
      const term = searchTerm.trim().toLowerCase();
      list = list.filter((w) => {
        const title = (w.TitleAr || w.title_ar || w.titleAr || '').toLowerCase();
        const desc = (w.DescriptionAr || w.description_ar || w.descriptionAr || '').toLowerCase();
        return title.includes(term) || desc.includes(term);
      });
    }

    return list;
  }, [worksheets, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredWorksheets.length / ITEMS_PER_PAGE) || 1;
  const paginatedWorksheets = filteredWorksheets.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);
  const isFiltering = selectedCategory !== 'all' || Boolean(searchTerm);

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPage(1);
  };

  const isLoading = worksheetsLoading || categoriesLoading;

  return (
    <Box sx={{ width: '100%', backgroundColor: kidColors.cloud }}>
      <SEO
        title="أوراق عمل تعليمية للأطفال"
        description="حمل أوراق عمل تلوين، كتابة، وأنشطة تعليمية وتفاعلية مجانية للأطفال من منصة نبتة لتنمية ذكاء طفلك ومهاراته الحركية."
        keywords="أوراق عمل تلوين للأطفال, شيتات تعليمية للأطفال, أوراق تلوين للطباعة, أنشطة تعليمية للأطفال pdf, شيتات منصة نبتة"
        url="/worksheets"
      />

      <PageHero
        tone="leaf"
        title={infoTitle}
        description={infoDescription}
        image={infoImage}
        imageAlt={infoTitle}
        crumbs={categoryName ? [{ label: 'أوراق عمل', to: '/worksheets' }, { label: categoryName }] : undefined}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <CategoryPills
          value={selectedCategory}
          onChange={setSelectedCategory}
          items={categories.map((cat) => ({ value: String(cat.id || cat.Id), label: cat.nameAr || cat.NameAr || cat.name_ar }))}
          ariaLabel="تصنيفات أوراق العمل"
          sx={{ mb: 3 }}
        />

        <Box sx={{ mb: 4, maxWidth: 560, mx: 'auto' }}>
          <TextField
            fullWidth
            placeholder="ابحث عن ورقة عمل..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            inputProps={{ 'aria-label': 'ابحث عن ورقة عمل' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchNormal size={22} color={kidColors.sky} />
                </InputAdornment>
              ),
              endAdornment: searchTerm ? (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')} aria-label="مسح البحث">
                    <CloseCircle size={20} color={kidColors.inkSoft} />
                  </IconButton>
                </InputAdornment>
              ) : null
            }}
            sx={{
              ...kidFieldSx,
              '& .MuiOutlinedInput-root': {
                ...kidFieldSx['& .MuiOutlinedInput-root'],
                backgroundColor: '#fff',
                borderRadius: '999px',
                boxShadow: `0 5px 0 ${kidColors.ink}12`,
                '& fieldset': { borderWidth: 3, borderColor: `${kidColors.ink}14` }
              }
            }}
          />
        </Box>

        {isFiltering && !isLoading && (
          <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
            <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, fontWeight: 700 }}>
              وجدنا {filteredWorksheets.length} ورقة عمل
            </Typography>
            <KidButton color="white" size="small" onClick={handleClearFilters}>
              عرض الكل
            </KidButton>
          </Box>
        )}

        {isLoading ? (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, i) => (
              <Grid item xs={6} sm={4} md={3} key={i}>
                <WorksheetSkeleton />
              </Grid>
            ))}
          </Grid>
        ) : filteredWorksheets.length === 0 ? (
          <EmptyState
            title="لم نجد أوراق عمل مطابقة"
            description={isFiltering ? 'جرّب كلمة بحث أخرى أو اختر تصنيفًا مختلفًا.' : 'لا توجد أوراق عمل متاحة حاليًا.'}
            action={
              isFiltering ? (
                <KidButton color="sky" onClick={handleClearFilters}>
                  عرض جميع أوراق العمل
                </KidButton>
              ) : null
            }
          />
        ) : (
          <>
            <Grid container spacing={{ xs: 2, sm: 3 }}>
              {paginatedWorksheets.map((worksheet, index) => {
                const catId = getCatId(worksheet);
                const name =
                  worksheet.Category?.NameAr ||
                  worksheet.Category?.nameAr ||
                  worksheet.WorksheetCategory?.NameAr ||
                  worksheet.WorksheetCategory?.nameAr ||
                  (catId ? categoryMap[String(catId)] : null);

                return (
                  <Grid item xs={6} sm={4} md={3} key={worksheet.Id || worksheet.id || index}>
                    <WorksheetCard
                      worksheet={worksheet}
                      index={index}
                      categoryName={selectedCategory === 'all' ? name : null}
                      onCategoryClick={catId ? () => setSelectedCategory(String(catId)) : undefined}
                    />
                  </Grid>
                );
              })}
            </Grid>

            {totalPages > 1 && (
              <Box sx={{ mt: { xs: 6, md: 8 }, display: 'flex', justifyContent: 'center' }}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => {
                    setPage(value);
                    window.scrollTo({ top: 380, behavior: 'smooth' });
                  }}
                  size="large"
                  sx={kidPaginationSx}
                />
              </Box>
            )}
          </>
        )}
      </Container>
    </Box>
  );
}
