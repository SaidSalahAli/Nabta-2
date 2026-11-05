import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Pagination, CircularProgress } from '@mui/material';
import EpisodeCard from 'components/EpisodeCard';
import img from 'assets/images/Video1.png';
import { useGetApplications } from 'api/applications';
import { useGetCategories } from 'api/categories';
import { IMAGES_URL } from 'config';
import SEO from 'components/SEO';
import { PageHero, CategoryPills, EmptyState, PageLoader, kidColors, kidPaginationSx } from 'components/kids';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${IMAGES_URL}/${url}`;
};

export default function AllApplications() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const {
    applications = [],
    pagination,
    applicationsLoading
  } = useGetApplications({
    page,
    pageSize: 10,
    ...(selectedCategory !== 'all' && { categoryId: selectedCategory })
  });
  const { categories = [], categoriesLoading } = useGetCategories();

  if (categoriesLoading) return <PageLoader />;

  const currentCategory =
    selectedCategory === 'all' ? null : categories.find((cat) => String(cat.id || cat.Id) === String(selectedCategory));

  const categoryName = currentCategory ? currentCategory.name || currentCategory.Name : null;
  const infoTitle = categoryName || 'التطبيقات';
  const infoDescription =
    currentCategory?.description || currentCategory?.Description || 'تطبيقات تعليمية تفاعلية لتأسيس الأطفال في مرحلة الطفولة المبكرة.';
  const infoImage = currentCategory?.photoUrl || currentCategory?.PhotoUrl || currentCategory?.photo || currentCategory?.Photo || img;

  return (
    <Box sx={{ width: '100%', backgroundColor: kidColors.cloud }}>
      <SEO
        title="التطبيقات التعليمية"
        description="تطبيقات تعليمية تفاعلية لتأسيس الأطفال في مرحلة الطفولة المبكرة."
        keywords="تطبيقات أطفال تعليمية, ألعاب أطفال مفيدة, تطبيقات منصة نبتة للأندرويد, تطبيقات أطفال بدون إعلانات"
        url="/applications"
      />

      <PageHero
        tone="berry"
        title={infoTitle}
        description={infoDescription}
        image={infoImage}
        imageAlt={infoTitle}
        crumbs={categoryName ? [{ label: 'التطبيقات', to: '/applications' }, { label: categoryName }] : undefined}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <CategoryPills
          value={selectedCategory}
          onChange={setSelectedCategory}
          items={categories.map((cat) => ({ value: String(cat.id || cat.Id), label: cat.name || cat.Name }))}
          ariaLabel="تصنيفات التطبيقات"
        />

        {applicationsLoading ? (
          <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress sx={{ color: kidColors.berry }} />
          </Box>
        ) : applications.length > 0 ? (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {applications.map((app, index) => (
              <Grid item xs={12} sm={6} key={app.id || app.Id}>
                <EpisodeCard
                  episode={{
                    id: app.id || app.Id,
                    title: app.name || app.Name,
                    image: getImageUrl(app.thumbnail || app.Thumbnail) || img,
                    watch: 'حمّله'
                  }}
                  isAnimating
                  index={index}
                  onClick={() => navigate(`/applications/${app.id || app.Id}`)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState title="لا توجد تطبيقات هنا بعد" description="جرّب تصنيفًا آخر، فتطبيقات جديدة في الطريق." />
        )}

        {(pagination?.totalPages || 1) > 1 && (
          <Box sx={{ mt: { xs: 6, md: 8 }, display: 'flex', justifyContent: 'center' }}>
            <Pagination
              count={pagination?.totalPages || 1}
              page={page}
              onChange={(_, value) => {
                setPage(value);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              size="large"
              sx={kidPaginationSx}
            />
          </Box>
        )}
      </Container>
    </Box>
  );
}
