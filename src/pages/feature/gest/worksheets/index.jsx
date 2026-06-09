import React, { useState, useEffect } from 'react';
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
  IconButton
} from '@mui/material';
import { DocumentDownload, Document, SearchNormal, ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import { useGetWorksheets } from 'api/worksheets';
import SEO from 'components/SEO';


// ==============================|| WORKSHEET CARD ||============================== //

function WorksheetCard({ worksheet, index, isAnimating }) {
  const [imgError, setImgError] = useState(false);
  const title = worksheet.TitleAr || worksheet.titleAr || '';
  const thumbnail = worksheet.ThumbnailImage || worksheet.thumbnailImage || '';
  const fileUrl = worksheet.FileUrl || worksheet.fileUrl || '';
  const fileType = (worksheet.FileType || worksheet.fileType || 'pdf').toLowerCase();

  const handleDownload = () => {
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
          borderRadius: '16px',
          overflow: 'hidden',
          border: '1px solid',
          borderColor: 'divider',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          transition: 'all 0.3s ease',
          cursor: 'pointer',
          '&:hover': {
            boxShadow: '0 16px 40px rgba(0,0,0,0.1)',
            transform: 'translateY(-4px)',
            borderColor: '#FFD666'
          }
        }}
      >
        {/* Thumbnail */}
        <Box
          sx={{
            position: 'relative',
            paddingTop: '141.4%', // A4 ratio (210 × 297 mm)
            backgroundColor: '#f5f5f5',
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
                objectFit: 'cover'
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
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fef9ec'
              }}
            >
              <Document size={48} color="#FFD666" variant="Bold" />
            </Box>
          )}

          {/* File type badge */}
          <Chip
            label={fileType.toUpperCase()}
            size="small"
            sx={{
              position: 'absolute',
              top: 8,
              left: 8,
              backgroundColor: fileType === 'pdf' ? '#e74c3c' : '#3498db',
              color: '#fff',
              fontWeight: 700,
              fontSize: 10,
              height: 22,
              borderRadius: '6px'
            }}
          />
        </Box>

        {/* Card Footer */}
        <Box
          sx={{
            p: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            flexGrow: 1
          }}
        >
          <Typography
            variant="body2"
            sx={{
              fontWeight: 700,
              color: '#2E2A39',
              fontSize: '0.8rem',
              lineHeight: 1.4,
              textAlign: 'center',
              overflow: 'hidden',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical'
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
              borderRadius: '10px',
              fontWeight: 700,
              fontSize: '1rem',
              py: 1,
              backgroundColor: 'primary.main',
              color: '#fff',
              boxShadow: '0 4px 12px rgba(212,165,116,0.3)',
              '&:hover': {
                backgroundColor: '#c49464',
                boxShadow: '0 6px 18px rgba(212,165,116,0.45)'
              }
            }}
          >
            تحميل
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}

// ==============================|| LOADING SKELETON GRID ||============================== //

function WorksheetSkeleton() {
  return (
    <Box sx={{ borderRadius: '16px', overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
      <Skeleton variant="rectangular" sx={{ paddingTop: '130%', height: 0 }} />
      <Box sx={{ p: 1.5 }}>
        <Skeleton variant="text" width="80%" sx={{ mx: 'auto', mb: 1 }} />
        <Skeleton variant="rounded" height={32} sx={{ borderRadius: '10px' }} />
      </Box>
    </Box>
  );
}

// ==============================|| WORKSHEETS GUEST PAGE ||============================== //

const ITEMS_PER_PAGE = 8; // 4 per row × 2 rows

export default function WorksheetsPage() {
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event, value) => {
    setPage(1);
  };

  const { worksheets = [], worksheetsLoading } = useGetWorksheets();

  // Filter only active worksheets
  let activeWorksheets = worksheets.filter((w) => w.IsActive !== false);

  // Apply search filter
  if (searchTerm.trim()) {
    activeWorksheets = activeWorksheets.filter((w) => (w.TitleAr || w.titleAr || '').toLowerCase().includes(searchTerm.toLowerCase()));
  }

  const paginatedWorksheets = activeWorksheets.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 8, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO
          title="أوراق عمل تعليمية للأطفال"
          description="حمل أوراق عمل تلوين، كتابة، وأنشطة تعليمية وتفاعلية مجانية للأطفال من منصة أستوديو نبتة لتنمية ذكاء طفلك ومهاراته الحركية."
          keywords="أوراق عمل تلوين للأطفال, شيتات تعليمية للأطفال, أوراق تلوين للطباعة, أنشطة تعليمية للأطفال pdf, شيتات نبتة"
          url="/worksheets"
        />
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>

            <Typography variant="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontSize: { xs: '2.2rem', md: '3rem' } }}>
              أوراق عمل
            </Typography>
            <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 600, mx: 'auto', lineHeight: 1.8 }}>
              اطبع أوراق مذاكرة وتلوين، واجعل طفلك يتفاعل بنفسه مع الورقة والقلم والألوان لتنمّي قدراته الحركية ومهاراته الإبداعية
            </Typography>
          </Box>

          {/* Search Bar */}
          <Box sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            <TextField
              fullWidth
              placeholder="ابحث عن أوراق عمل..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page when searching
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchNormal size={20} color="#999" />
                  </InputAdornment>
                )
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '12px',
                  backgroundColor: '#fff',
                  fontSize: '1rem',
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
                  opacity: 0.7,
                  color: '#999'
                }
              }}
            />
          </Box>

          {/* Grid */}
          {worksheetsLoading ? (
            <Grid container spacing={2.5}>
              {Array.from({ length: 8 }).map((_, i) => (
                <Grid item xs={6} sm={4} md={3} key={i}>
                  <WorksheetSkeleton />
                </Grid>
              ))}
            </Grid>
          ) : activeWorksheets.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 10 }}>
              <Document size={64} color="#ccc" />
              <Typography variant="h6" sx={{ color: 'text.secondary', mt: 2 }}>
                {searchTerm ? 'لم يتم العثور على نتائج' : 'لا توجد أوراق عمل متاحة حالياً'}
              </Typography>
            </Box>
          ) : (
            <>
              <Grid container spacing={2.5}>
                {paginatedWorksheets.map((worksheet, index) => (
                  <Grid item xs={6} sm={4} md={3} key={worksheet.Id || worksheet.id || index}>
                    <WorksheetCard worksheet={worksheet} index={index} isAnimating={checked} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination */}
              <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
                <Pagination
                  count={1}
                  page={page}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                  color="primary"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1.1rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: '1px solid #E0E0E0',
                      backgroundColor: '#fff',
                      '&.Mui-selected': {
                        backgroundColor: '#FFD666',
                        borderColor: '#FFD666',
                        color: '#2E2A39',
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
            </>
          )}
        </Container>
      </Box>
    </Fade>
  );
}
