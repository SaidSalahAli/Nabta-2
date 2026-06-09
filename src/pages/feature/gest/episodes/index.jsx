import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Pagination, Stack, Fade, CircularProgress, Tabs, Tab } from '@mui/material';
import EpisodeCard from 'components/EpisodeCard';
import img from 'assets/images/test.jpeg';
import { useGetEpisodes } from 'api/episodes';
import { useGetEpisodeCategories } from 'api/episodeCategories';
import SEO from 'components/SEO';

export default function AllEpisodes() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (event, value) => {
    // Keep page locked to 1 as requested until backend pagination is ready
    setPage(1);
  };

  const { episodes = [], episodesLoading } = useGetEpisodes();
  const { categories = [], categoriesLoading } = useGetEpisodeCategories();

  if (episodesLoading || categoriesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Filter episodes by selected category
  const filteredEpisodes = selectedCategory === 'all'
    ? episodes
    : episodes.filter(episode => String(episode.category_id) === String(selectedCategory));

  const currentCategory = selectedCategory === 'all'
    ? null
    : categories.find(cat => String(cat.id) === String(selectedCategory));

  const infoTitle = currentCategory ? currentCategory.name_ar : 'جميع الحلقات';
  const infoDescription = currentCategory?.description_ar || 'شاهد حلقات منصة نبتة التعليمية والتربوية الهادفة للأطفال. محتوى آمن، ممتع، ومبتكر يسهم في بناء وعي طفلك وتنمية مهاراته .';
  const infoImage = currentCategory?.image || currentCategory?.photo || currentCategory?.PhotoUrl || currentCategory?.photoUrl || img;

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO
          title="الحلقات الكرتونية"
          description="شاهد حلقات منصة نبتة التعليمية والتربوية الهادفة للأطفال. محتوى آمن، ممتع، ومبتكر يسهم في بناء وعي طفلك وتنمية مهاراته."
          keywords="أفلام أطفال, حلقات تعليمية, قصص هادفة, نبتة, مسلسلات أطفال تربوية"
          url="/episodes"
        />
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
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
                {infoTitle}
              </Typography>
              <Typography variant="body1" sx={{ color: 'text.secondary', fontSize: '18px', lineHeight: 1.8 }}>
                {infoDescription}
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
              <Box component="img" src={infoImage} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={infoTitle} />
            </Box>
          </Box>

          {/* Category Tabs */}
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'center' }}>
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
                  pb: 1
                }
              }}
            >
              <Tab
                value="all"
                label="الكل"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 600,
                  borderRadius: '10px',
                  border: '2px solid',
                  borderColor: selectedCategory === 'all' ? 'primary.main' : '#E0E0E0',
                  backgroundColor: selectedCategory === 'all' ? 'primary.main' : '#fff',
                  color: selectedCategory === 'all' ? '#fff' : '#637381',
                  px: 3,
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
              {categories.map((cat) => (
                <Tab
                  key={cat.id}
                  value={String(cat.id)}
                  label={cat.name_ar}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    border: '2px solid',
                    borderColor: selectedCategory === String(cat.id) ? 'primary.main' : '#E0E0E0',
                    backgroundColor: selectedCategory === String(cat.id) ? 'primary.main' : '#fff',
                    color: selectedCategory === String(cat.id) ? '#fff' : '#637381',
                    px: 3,
                    py: 1,
                    minHeight: 'auto',
                    minWidth: 'auto',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: selectedCategory === String(cat.id) ? 'primary.light' : '#f5f5f5',
                      borderColor: selectedCategory === String(cat.id) ? 'primary.light' : '#ccc'
                    },
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Episodes Grid */}
          {filteredEpisodes.length > 0 ? (
            <Grid container spacing={4}>
              {filteredEpisodes.map((episode, index) => (
                <Grid item xs={12} sm={6} md={6} key={episode.id}>
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
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                لا توجد حلقات في هذا التصنيف حالياً.
              </Typography>
            </Box>
          )}

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
        </Container>
      </Box>
    </Fade>
  );
}
