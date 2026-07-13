import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Grid, Pagination, Stack, Fade, Tabs, Tab, CircularProgress } from '@mui/material';
import EpisodeCard from 'components/EpisodeCard';
import img from 'assets/images/Video1.png';
import { useGetApplications } from 'api/applications';
import { useGetCategories } from 'api/categories';
import { IMAGES_URL } from 'config';
import SEO from 'components/SEO';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${IMAGES_URL}/${url}`;
};

export default function AllApplications() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setChecked(true);
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  const { applications = [], pagination, applicationsLoading } = useGetApplications({
    page,
    pageSize: 10,
    ...(selectedCategory !== 'all' && { categoryId: selectedCategory })
  });
  const { categories = [], categoriesLoading } = useGetCategories();

  if (applicationsLoading || categoriesLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  // Filter applications: server handles it if categoryId is passed, but fallback just in case
  const filteredApplications = applications;

  // Get current category info for the banner
  const currentCategory = selectedCategory === 'all'
    ? null
    : categories.find(cat => String(cat.id || cat.Id) === String(selectedCategory));

  const infoTitle = currentCategory ? (currentCategory.name || currentCategory.Name) : 'جميع التطبيقات';
  const infoDescription = currentCategory?.description || currentCategory?.Description || 'تطبيقات تعليمية تفاعلية لتأسيس الأطفال في مرحلة الطفولة المبكرة';
  const infoImage = currentCategory?.photoUrl || currentCategory?.PhotoUrl || currentCategory?.photo || currentCategory?.Photo || img;

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO
          title="التطبيقات التعليمية"
          description="تطبيقات تعليمية تفاعلية لتأسيس الأطفال في مرحلة الطفولة المبكرة"
          keywords="تطبيقات أطفال تعليمية, ألعاب أطفال مفيدة, تطبيقات منصة نبتة للأندرويد, تطبيقات أطفال بدون إعلانات"
          url="/applications"
        />
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              التطبيقات
            </Typography>
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
                  key={cat.id || cat.Id}
                  value={String(cat.id || cat.Id)}
                  label={cat.name || cat.Name}
                  sx={{
                    fontSize: '1rem',
                    fontWeight: 600,
                    borderRadius: '10px',
                    border: '2px solid',
                    borderColor: selectedCategory === String(cat.id || cat.Id) ? 'primary.main' : '#E0E0E0',
                    backgroundColor: selectedCategory === String(cat.id || cat.Id) ? 'primary.main' : '#fff',
                    color: selectedCategory === String(cat.id || cat.Id) ? '#fff' : '#637381',
                    px: 3,
                    py: 1,
                    minHeight: 'auto',
                    minWidth: 'auto',
                    textTransform: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      backgroundColor: selectedCategory === String(cat.id || cat.Id) ? 'primary.light' : '#f5f5f5',
                      borderColor: selectedCategory === String(cat.id || cat.Id) ? 'primary.light' : '#ccc'
                    },
                    '&.Mui-selected': {
                      color: '#fff'
                    }
                  }}
                />
              ))}
            </Tabs>
          </Box>

          {/* Applications Grid */}
          {filteredApplications.length > 0 ? (
            <Grid container spacing={4}>
              {filteredApplications.map((app, index) => (
                <Grid item xs={12} sm={6} md={6} key={app.id || app.Id}>
                  <EpisodeCard
                    episode={{
                      id: app.id || app.Id,
                      title: app.name || app.Name,
                      image: getImageUrl(app.thumbnail || app.Thumbnail) || img,
                      watch: 'تحميل'
                    }}
                    isAnimating={checked}
                    index={index}
                    onClick={() => navigate(`/applications/${app.id || app.Id}`)}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Box sx={{ py: 8, textAlign: 'center' }}>
              <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 500 }}>
                لا توجد تطبيقات في هذا التصنيف حالياً.
              </Typography>
            </Box>
          )}

          <Stack spacing={2} sx={{ mt: 8, alignItems: 'center' }}>
            <Pagination
              count={pagination?.totalPages || 1}
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
