import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Fade,
  CircularProgress,
  Button,
  Skeleton,
  Chip,
  Pagination,
  Stack,
  TextField,
  InputAdornment,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import { DocumentDownload, Document, SearchNormal, CloseCircle } from 'iconsax-react';
import { useGetWorksheets } from 'api/worksheets';
import { useGetWorksheetCategories } from 'api/worksheetCategories';
import worksheetsImg from 'assets/Home/worksheets.png';
import SEO from 'components/SEO';
import AnimatedSection from 'components/AnimatedSection';

// ==============================|| WORKSHEET CARD ||============================== //

function WorksheetCard({ worksheet, index, isAnimating, categoryName, onCategoryClick }) {
  const [imgError, setImgError] = useState(false);
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
    <Fade in={isAnimating} timeout={400 + index * 80}>
      <Box
        sx={{
          borderRadius: '18px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)',
          position: 'relative',
          '&:hover': {
            boxShadow: '0 16px 36px rgba(212,165,116,0.18)',
            transform: 'translateY(-6px)',
            borderColor: '#FFD666'
          }
        }}
      >
        {/* Thumbnail Container */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '135%', // Standard Worksheet / A4 preview aspect ratio
            backgroundColor: '#f8f9fa',
            overflow: 'hidden'
          }}
        >
          {thumbnail && !imgError ? (
            <Box
              component="img"
              src={thumbnail}
              alt={title}
              onError={() => setImgError(true)}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.4s ease',
                '&:hover': {
                  transform: 'scale(1.03)'
                }
              }}
            />
          ) : (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef9ec',
                gap: 1
              }}
            >
              <Document size={52} color="#FFD666" variant="Bold" />
              <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                ورقة عمل جاهزة للطباعة
              </Typography>
            </Box>
          )}

          {/* File type badge - Top Left */}
          <Chip
            label={fileType.toUpperCase()}
            size="small"
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: fileType === 'pdf' ? '#e74c3c' : '#3498db',
              color: '#fff',
              fontWeight: 800,
              fontSize: 10,
              height: 22,
              borderRadius: '6px',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
              zIndex: 2
            }}
          />

          {/* Category Badge - Top Right */}
          {categoryName && (
            <Chip
              label={categoryName}
              size="small"
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
                right: 10,
                backgroundColor: 'rgba(255, 255, 255, 0.94)',
                backdropFilter: 'blur(6px)',
                color: '#2E2A39',
                fontWeight: 700,
                fontSize: 11,
                height: 24,
                borderRadius: '8px',
                border: '1px solid rgba(255, 214, 102, 0.6)',
                boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                zIndex: 2,
                cursor: onCategoryClick ? 'pointer' : 'default',
                '&:hover': onCategoryClick
                  ? {
                      backgroundColor: '#FFD666',
                      borderColor: '#FFD666'
                    }
                  : {}
              }}
            />
          )}
        </Box>

        {/* Card Content & Action */}
        <Box
          sx={{
            p: 2,
            display: 'flex',
            flexDirection: 'column',
            gap: 1.5,
            flexGrow: 1,
            justifyContent: 'space-between'
          }}
        >
          <Typography
            variant="subtitle1"
            title={title}
            sx={{
              fontWeight: 700,
              color: '#2E2A39',
              fontSize: '0.95rem',
              lineHeight: 1.5,
              textAlign: 'center',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              minHeight: '2.8em'
            }}
          >
            {title}
          </Typography>

          <Button
            variant="contained"
            fullWidth
            size="medium"
            onClick={handleDownload}
            startIcon={<DocumentDownload size={18} />}
            sx={{
              borderRadius: '12px',
              fontWeight: 700,
              fontSize: '0.95rem',
              py: 1,
              backgroundColor: '#FFD666',
              color: '#2E2A39',
              boxShadow: '0 4px 14px rgba(255, 214, 102, 0.35)',
              transition: 'all 0.3s ease',
              '&:hover': {
                backgroundColor: '#ffcf4d',
                boxShadow: '0 6px 20px rgba(255, 214, 102, 0.5)',
                transform: 'translateY(-1px)'
              }
            }}
          >
            تحميل مجاني
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

// ==============================|| LOADING SKELETON GRID ||============================== //

function WorksheetSkeleton() {
  return (
    <Box sx={{ borderRadius: '18px', overflow: 'hidden', border: '1px solid', borderColor: 'divider', bgcolor: '#fff' }}>
      <Skeleton variant="rectangular" sx={{ paddingTop: '135%', height: 0 }} />
      <Box sx={{ p: 2 }}>
        <Skeleton variant="text" width="75%" height={24} sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="rounded" height={38} sx={{ borderRadius: '12px' }} />
      </Box>
    </Box>
  );
}

// ==============================|| WORKSHEETS GUEST PAGE ||============================== //

const ITEMS_PER_PAGE = 12; // 4 columns × 3 rows

export default function WorksheetsPage() {
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setChecked(true);
  }, []);

  // Reset to first page when filtering
  useEffect(() => {
    setPage(1);
  }, [selectedCategory, searchTerm]);

  const { worksheets = [], worksheetsLoading } = useGetWorksheets(
    selectedCategory !== 'all' ? { categoryId: selectedCategory } : {}
  );
  const { categories = [], categoriesLoading } = useGetWorksheetCategories();

  // Helper map to quickly find category name
  const categoryMap = useMemo(() => {
    const map = {};
    categories.forEach((cat) => {
      const id = cat.id || cat.Id;
      const name = cat.nameAr || cat.NameAr || cat.name_ar;
      if (id && name) {
        map[String(id)] = name;
      }
    });
    return map;
  }, [categories]);

  // Current category data for info banner
  const currentCategory = useMemo(() => {
    if (selectedCategory === 'all') return null;
    return categories.find((cat) => String(cat.id || cat.Id) === String(selectedCategory)) || null;
  }, [categories, selectedCategory]);

  const infoTitle = currentCategory ? currentCategory.nameAr || currentCategory.NameAr || currentCategory.name_ar : 'أوراق عمل تعليمية';

  const infoDescription =
    currentCategory?.description ||
    currentCategory?.Description ||
    'اطبع أوراق مذاكرة وتلوين، واجعل طفلك يتفاعل بنفسه مع الورقة والقلم والألوان لتنمّي قدراته الحركية ومهاراته الإبداعية.';

  const infoImage = currentCategory?.image || currentCategory?.photo || worksheetsImg;

  // Filter worksheets
  const filteredWorksheets = useMemo(() => {
    let list = worksheets.filter((w) => w.IsActive !== false && w.is_active !== false);

    // Filter by Category
    if (selectedCategory !== 'all') {
      list = list.filter((w) => {
        const catId =
          w.CategoryId ??
          w.category_id ??
          w.worksheet_category_id ??
          w.WorksheetCategoryId ??
          w.Category?.Id ??
          w.Category?.id ??
          w.WorksheetCategory?.Id ??
          w.WorksheetCategory?.id;
        return String(catId) === String(selectedCategory);
      });
    }

    // Filter by Search term
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

  // Pagination calculation
  const totalPages = Math.ceil(filteredWorksheets.length / ITEMS_PER_PAGE) || 1;
  const paginatedWorksheets = filteredWorksheets.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 380, behavior: 'smooth' });
  };

  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setPage(1);
  };

  const isLoading = worksheetsLoading || categoriesLoading;

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO
          title="أوراق عمل تعليمية للأطفال"
          description="حمل أوراق عمل تلوين، كتابة، وأنشطة تعليمية وتفاعلية مجانية للأطفال من منصة نبتة لتنمية ذكاء طفلك ومهاراته الحركية."
          keywords="أوراق عمل تلوين للأطفال, شيتات تعليمية للأطفال, أوراق تلوين للطباعة, أنشطة تعليمية للأطفال pdf, شيتات منصة نبتة"
          url="/worksheets"
        />

        <Container maxWidth="lg">
          {/* Main Title Section */}
          <AnimatedSection fade={true}>
            <Box sx={{ mb: 5, textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{
                  fontWeight: 800,
                  color: 'primary.main',
                  mb: 2,
                  fontSize: { xs: '2.4rem', md: '3.4rem' }
                }}
              >
                أوراق عمل
              </Typography>
            </Box>
          </AnimatedSection>

          {/* Category Info Banner Section - Matching Episodes & Applications */}
          <AnimatedSection fade={true}>
            <Box
              sx={{
                mb: 6,
                p: { xs: 3, md: 4.5 },
                borderRadius: '24px',
                backgroundColor: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: { xs: 'column-reverse', md: 'row' },
                alignItems: 'center',
                gap: 4
              }}
            >
              <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'right' } }}>
                <Typography variant="h3" sx={{ fontWeight: 800, mb: 2, color: '#2E2A39', fontSize: { xs: '1.6rem', md: '2.1rem' } }}>
                  {infoTitle}
                </Typography>
                <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: { xs: '16px', md: '18px' }, lineHeight: 1.9 }}>
                  {infoDescription}
                </Typography>
              </Box>
              <Box
                sx={{
                  width: { xs: '100%', md: '280px' },
                  height: '190px',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#fef9ec',
                  p: 2,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.06)'
                }}
              >
                <Box
                  component="img"
                  src={infoImage}
                  alt={infoTitle}
                  sx={{
                    maxWidth: '100%',
                    maxHeight: '100%',
                    objectFit: 'contain'
                  }}
                />
              </Box>
            </Box>
          </AnimatedSection>

          {/* Category Tabs Filter - Matching Other Components */}
          <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center' }}>
            <Tabs
              value={selectedCategory}
              onChange={(e, newValue) => setSelectedCategory(newValue)}
              variant="scrollable"
              scrollButtons="auto"
              allowScrollButtonsMobile
              sx={{
                '& .MuiTabs-indicator': {
                  display: 'none'
                },
                '& .MuiTabs-flexContainer': {
                  gap: 1.5,
                  pb: 1,
                  justifyContent: { xs: 'flex-start', sm: 'center' }
                }
              }}
            >
              {/* All / الكل Tab */}
              <Tab
                value="all"
                label="الكل"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 700,
                  borderRadius: '12px',
                  border: '2px solid',
                  borderColor: selectedCategory === 'all' ? 'primary.main' : '#E0E0E0',
                  backgroundColor: selectedCategory === 'all' ? 'primary.main' : '#fff',
                  color: selectedCategory === 'all' ? '#fff' : '#637381',
                  px: 3.5,
                  py: 1,
                  minHeight: 'auto',
                  minWidth: 'auto',
                  textTransform: 'none',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    backgroundColor: selectedCategory === 'all' ? 'primary.light' : '#f5f5f5',
                    borderColor: selectedCategory === 'all' ? 'primary.light' : '#ccc'
                  },
                  '&.Mui-selected': {
                    color: '#fff'
                  }
                }}
              />

              {/* Dynamic Category Tabs */}
              {categories.map((cat) => {
                const id = String(cat.id || cat.Id);
                const isSelected = selectedCategory === id;
                const name = cat.nameAr || cat.NameAr || cat.name_ar;
                return (
                  <Tab
                    key={id}
                    value={id}
                    label={name}
                    sx={{
                      fontSize: '1rem',
                      fontWeight: 700,
                      borderRadius: '12px',
                      border: '2px solid',
                      borderColor: isSelected ? 'primary.main' : '#E0E0E0',
                      backgroundColor: isSelected ? 'primary.main' : '#fff',
                      color: isSelected ? '#fff' : '#637381',
                      px: 3,
                      py: 1,
                      minHeight: 'auto',
                      minWidth: 'auto',
                      textTransform: 'none',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        backgroundColor: isSelected ? 'primary.light' : '#f5f5f5',
                        borderColor: isSelected ? 'primary.light' : '#ccc'
                      },
                      '&.Mui-selected': {
                        color: '#fff'
                      }
                    }}
                  />
                );
              })}
            </Tabs>
          </Box>

          {/* Search Bar */}
          <Box sx={{ mb: 5, maxWidth: 520, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="ابحث عن ورقة عمل بالعنوان أو الوصف..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchNormal size={20} color="#999" />
                  </InputAdornment>
                ),
                endAdornment: searchTerm ? (
                  <InputAdornment position="end">
                    <IconButton size="small" onClick={() => setSearchTerm('')}>
                      <CloseCircle size={18} color="#999" />
                    </IconButton>
                  </InputAdornment>
                ) : null
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '14px',
                  backgroundColor: '#fff',
                  fontSize: '0.98rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  '& fieldset': {
                    borderColor: '#E0E0E0'
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFD666'
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFD666',
                    borderWidth: 2
                  }
                },
                '& .MuiOutlinedInput-input::placeholder': {
                  opacity: 0.75,
                  color: '#888'
                }
              }}
            />
          </Box>

          {/* Active Filter Indicator */}
          {(selectedCategory !== 'all' || searchTerm) && (
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1.5, flexWrap: 'wrap' }}>
              <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                تم العثور على {filteredWorksheets.length} ورقة عمل:
              </Typography>
              {selectedCategory !== 'all' && (
                <Chip
                  label={`التصنيف: ${infoTitle}`}
                  onDelete={() => setSelectedCategory('all')}
                  color="primary"
                  variant="outlined"
                  sx={{ borderRadius: '8px', fontWeight: 600 }}
                />
              )}
              {searchTerm && (
                <Chip
                  label={`بحث: "${searchTerm}"`}
                  onDelete={() => setSearchTerm('')}
                  color="secondary"
                  variant="outlined"
                  sx={{ borderRadius: '8px', fontWeight: 600 }}
                />
              )}
              <Button size="small" onClick={handleClearFilters} sx={{ color: 'text.secondary', textDecoration: 'underline' }}>
                إعادة ضبط الكل
              </Button>
            </Box>
          )}

          {/* Grid of Worksheets */}
          {isLoading ? (
            <Grid container spacing={3}>
              {Array.from({ length: 12 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <WorksheetSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : filteredWorksheets.length === 0 ? (
            <Box
              sx={{
                textAlign: 'center',
                py: 10,
                px: 2,
                borderRadius: '20px',
                backgroundColor: '#fff',
                border: '1px dashed #e0e0e0',
                maxWidth: 600,
                mx: 'auto'
              }}
            >
              <Document size={64} color="#FFD666" variant="Bulk" />
              <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2A39', mt: 2, mb: 1 }}>
                لا توجد أوراق عمل متطابقة
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                {searchTerm || selectedCategory !== 'all'
                  ? 'لم يتم العثور على أوراق عمل تطابق اختياراتك الحالية. جرب تغيير التصنيف أو البحث.'
                  : 'لا توجد أوراق عمل متاحة حالياً.'}
              </Typography>
              {(selectedCategory !== 'all' || searchTerm) && (
                <Button variant="outlined" color="primary" onClick={handleClearFilters} sx={{ borderRadius: '10px', px: 3, py: 1 }}>
                  عرض جميع أوراق العمل
                </Button>
              )}
            </Box>
          ) : (
            <>
              <Grid container spacing={3}>
                {paginatedWorksheets.map((worksheet, index) => {
                  const catId =
                    worksheet.CategoryId ??
                    worksheet.category_id ??
                    worksheet.worksheet_category_id ??
                    worksheet.WorksheetCategoryId ??
                    worksheet.Category?.Id ??
                    worksheet.Category?.id ??
                    worksheet.WorksheetCategory?.Id ??
                    worksheet.WorksheetCategory?.id;

                  const categoryName =
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
                        isAnimating={checked}
                        categoryName={categoryName}
                        onCategoryClick={catId ? () => setSelectedCategory(String(catId)) : undefined}
                      />
                    </Grid>
                  );
                })}
              </Grid>

              {/* Pagination Section */}
              {totalPages > 1 && (
                <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
                  <Pagination
                    count={totalPages}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded"
                    color="primary"
                    size="large"
                    sx={{
                      '& .MuiPaginationItem-root': {
                        fontSize: '1.05rem',
                        fontWeight: 600,
                        borderRadius: '10px',
                        border: '1px solid #E0E0E0',
                        backgroundColor: '#fff',
                        '&.Mui-selected': {
                          backgroundColor: '#FFD666',
                          borderColor: '#FFD666',
                          color: '#2E2A39',
                          fontWeight: 700,
                          '&:hover': {
                            backgroundColor: '#ffcf4d',
                            borderColor: '#ffcf4d'
                          }
                        },
                        '&:hover': {
                          backgroundColor: '#f5f5f5'
                        }
                      }
                    }}
                  />
                </Stack>
              )}
            </>
          )}
        </Container>
      </Box>
    </Fade>
  );
}
