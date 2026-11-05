import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Grid, Pagination, CircularProgress } from '@mui/material';
import EpisodeCard from 'components/EpisodeCard';
import img from 'assets/images/Video1.png';
import { useGetEpisodes } from 'api/episodes';
import { useGetEpisodeCategories } from 'api/episodeCategories';
import SEO from 'components/SEO';
import { PageHero, CategoryPills, EmptyState, PageLoader, kidColors, kidPaginationSx } from 'components/kids';

export default function AllEpisodes() {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    setPage(1);
  }, [selectedCategory]);

  const {
    episodes = [],
    pagination,
    episodesLoading
  } = useGetEpisodes({
    page,
    pageSize: 10,
    ...(selectedCategory !== 'all' && { categoryId: selectedCategory })
  });
  const { categories = [], categoriesLoading } = useGetEpisodeCategories();

  if (categoriesLoading) return <PageLoader />;

  const currentCategory = selectedCategory === 'all' ? null : categories.find((cat) => String(cat.id) === String(selectedCategory));

  const infoTitle = currentCategory ? currentCategory.name_ar : 'الحلقات';
  const infoDescription =
    currentCategory?.description_ar || 'حلقات توعوية لأولياء الأمور الأمهات والآباء والمعلمين، وحلقات تربوية تعليمية للأطفال.';
  const infoImage = currentCategory?.image || currentCategory?.photo || currentCategory?.PhotoUrl || currentCategory?.photoUrl || img;

  return (
    <Box sx={{ width: '100%', backgroundColor: kidColors.cloud }}>
      <SEO
        title="الحلقات الكرتونية"
        description="حلقات توعوية لأولياء الأمور الأمهات والآباء والمعلمين، وحلقات تربوية تعليمية للأطفال"
        keywords="أفلام أطفال, حلقات تعليمية, قصص هادفة, منصة نبتة, مسلسلات أطفال تربوية"
        url="/episodes"
      />

      <PageHero
        title={infoTitle}
        description={infoDescription}
        image={infoImage}
        imageAlt={infoTitle}
        crumbs={currentCategory ? [{ label: 'الحلقات', to: '/episodes' }, { label: currentCategory.name_ar }] : undefined}
      />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <CategoryPills
          value={selectedCategory}
          onChange={setSelectedCategory}
          items={categories.map((cat) => ({ value: String(cat.id), label: cat.name_ar }))}
          ariaLabel="تصنيفات الحلقات"
        />

        {episodesLoading ? (
          <Box sx={{ py: 10, display: 'flex', justifyContent: 'center' }}>
            <CircularProgress sx={{ color: kidColors.sky }} />
          </Box>
        ) : episodes.length > 0 ? (
          <Grid container spacing={{ xs: 3, md: 4 }}>
            {episodes.map((episode, index) => (
              <Grid item xs={12} sm={6} key={episode.id}>
                <EpisodeCard
                  episode={{
                    id: episode.id,
                    title: episode.title_ar,
                    image: episode.thumbnail_image || episode.cover_image || img,
                    watch: 'شاهد'
                  }}
                  isAnimating
                  index={index}
                  onClick={() => navigate(`/episodes/${episode.id}`)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <EmptyState title="لا توجد حلقات هنا بعد" description="جرّب تصنيفًا آخر، فنحن نزرع حلقات جديدة باستمرار." />
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
