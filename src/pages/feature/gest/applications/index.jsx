import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Pagination, Stack, Fade, IconButton } from '@mui/material';
import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import EpisodeCard from 'components/EpisodeCard';
import img2 from 'assets/images/test.jpeg';
import img from 'assets/images/App1.png';

export default function AllApplications() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [useArrowPagination, setUseArrowPagination] = useState(window.innerWidth < 600);

  useEffect(() => {
    setChecked(true);

    const handleResize = () => {
      setUseArrowPagination(window.innerWidth < 600);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const ITEMS_PER_PAGE = 6; // 3 per row × 2 rows

  const handleChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const applications = [
    { id: 1, title: 'تطبيق لغتي', image: img, watch: 'تحميل' },
    { id: 2, title: 'عنوان التطبيق', image: img2, watch: 'تحميل' },
    { id: 3, title: 'عنوان التطبيق', image: img2, watch: 'تحميل' },

  ];

  const totalPages = Math.ceil(applications.length / ITEMS_PER_PAGE);
  const paginatedApplications = applications.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (page < totalPages) {
      setPage(page + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              التطبيقات
            </Typography>
            <Box sx={{ width: '80px', height: '4px', backgroundColor: '#FFD666', mx: 'auto', borderRadius: '2px' }} />
          </Box>

          {/* Apps Info Section */}
          <Box
            sx={{
              mb: 6,
              p: 4,
              borderRadius: '24px',
              backgroundColor: '#fff',
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              display: 'flex',
              flexDirection: { xs: 'column-reverse', md: 'row' },
              alignItems: 'center',
              gap: 4
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 2, color: '#2E2A39' }}>
                نبذة عن التطبيقات
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '18px', lineHeight: 1.8 }}>
                هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة، لقد تم توليد هذا النص من مولد النص العربى، حيث يمكنك أن توليد مثل هذا
                النص أو العديد من النصوص الأخرى إضافة إلى زيادة عدد الحروف التى يولدها التطبيق.
              </Typography>
            </Box>
            <Box
              sx={{
                width: { xs: '100%', md: '300px' },
                height: '200px',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
              }}
            >
              <Box component="img" src={img2} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Apps Cover" />
            </Box>
          </Box>

          {/* Applications Grid */}
          <Grid container spacing={4}>
            {paginatedApplications.map((app, index) => (
              <Grid item xs={12} sm={6} md={4} key={app.id}>
                <EpisodeCard episode={app} isAnimating={checked} index={index} onClick={() => navigate(`/applications/${app.id}`)} />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
              {useArrowPagination ? (
                // Arrow Pagination for Mobile
                <Stack direction="row" spacing={2} alignItems="center">
                  <IconButton
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                    sx={{
                      backgroundColor: page === 1 ? '#f0f0f0' : '#FFD666',
                      color: page === 1 ? '#ccc' : '#2E2A39',
                      borderRadius: '10px',
                      padding: '12px',
                      '&:hover': {
                        backgroundColor: page === 1 ? '#f0f0f0' : '#ffcf4d'
                      }
                    }}
                  >
                    <ArrowRight2 size={24} />
                  </IconButton>

                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      minWidth: '60px',
                      textAlign: 'center',
                      color: '#2E2A39'
                    }}
                  >
                    {page} / {totalPages}
                  </Typography>

                  <IconButton
                    onClick={handleNextPage}
                    disabled={page === totalPages}
                    sx={{
                      backgroundColor: page === totalPages ? '#f0f0f0' : '#FFD666',
                      color: page === totalPages ? '#ccc' : '#2E2A39',
                      borderRadius: '10px',
                      padding: '12px',
                      '&:hover': {
                        backgroundColor: page === totalPages ? '#f0f0f0' : '#ffcf4d'
                      }
                    }}
                  >
                    <ArrowLeft2 size={24} />
                  </IconButton>
                </Stack>
              ) : (
                // Number Pagination for Desktop
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handleChange}
                  variant="outlined"
                  shape="rounded"
                  size="large"
                  sx={{
                    '& .MuiPaginationItem-root': {
                      fontSize: '1rem',
                      fontWeight: 600,
                      borderRadius: '8px',
                      border: '1px solid #E0E0E0',
                      backgroundColor: '#fff',
                      '&.Mui-selected': {
                        backgroundColor: '#FFD666',
                        borderColor: '#FFD666',
                        color: '#2E2A39',
                        '&:hover': { backgroundColor: '#ffcf4d' }
                      },
                      '&:hover': { backgroundColor: '#f5f5f5' }
                    }
                  }}
                />
              )}
            </Stack>
          )}
        </Container>
      </Box>
    </Fade>
  );
}
