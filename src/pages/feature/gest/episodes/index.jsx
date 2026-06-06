import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Pagination, Stack, Fade, CircularProgress } from '@mui/material';
import EpisodeCard from 'components/EpisodeCard';
import img from 'assets/images/test.jpeg';
import { useGetEpisodes } from 'api/episodes';
import SEO from 'components/SEO';


export default function AllEpisodes() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { episodes, episodesLoading } = useGetEpisodes();

  if (episodesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO 
          title="الحلقات الكرتونية" 
          description="شاهد حلقات كرتون أستوديو نبتة التعليمية والتربوية الهادفة للأطفال. محتوى آمن، ممتع، ومبتكر يسهم في بناء وعي طفلك وتنمية مهاراته."
          keywords="أفلام كرتون أطفال, حلقات كرتون تعليمية, قصص كرتون هادفة, كرتون نبتة, مسلسلات أطفال تربوية"
          url="/episodes"
        />
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>

            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              الحلقات
            </Typography>
          </Box>

          {/* Series Info Section (Optional/Conditional) */}
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
                نبذة عن السلسلة
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
              <Box component="img" src={img} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Series Cover" />
            </Box>
          </Box>

          {/* Episodes Grid */}
          <Grid container spacing={4}>
            {episodes.map((episode, index) => (
              <Grid item xs={12} sm={6} md={4} key={episode.id}>
                <EpisodeCard
                  episode={{
                    id: episode.id,
                    title: episode.title_ar,
                    image: episode.thumbnail_image || episode.cover_image || img,
                    watch: 'شاهد'
                  }}
                  isAnimating={checked}
                  index={index}
                  onClick={() => navigate(`/episodes/${episode.id}`)}
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
