import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Pagination, Stack, Fade } from '@mui/material';
import EpisodeCard from 'components/EpisodeCard';
import img from 'assets/images/test.jpeg';

export default function AllApplications() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const applications = [
    { id: 1, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 2, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 3, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 4, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 5, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 6, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 7, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 8, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 9, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 10, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 11, title: 'عنوان التطبيق', image: img, watch: 'تحميل' },
    { id: 12, title: 'عنوان التطبيق', image: img, watch: 'تحميل' }
  ];

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
              <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Apps Cover" />
            </Box>
          </Box>

          {/* Applications Grid */}
          <Grid container spacing={4}>
            {applications.map((app, index) => (
              <Grid item xs={12} sm={6} md={4} key={app.id}>
                <EpisodeCard
                  episode={app}
                  isAnimating={checked}
                  index={index}
                  onClick={() => navigate(`/applications/${app.id}`)}
                />
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
            <Pagination
              count={4}
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
        </Container>
      </Box>
    </Fade>
  );
}
