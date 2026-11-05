import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Container, Stack } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import SEO from 'components/SEO';
import { useGetApplication } from 'api/applications';
import { IMAGES_URL } from 'config';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import mockImage1 from 'assets/images/test.jpeg';
import AppDownload from 'assets/Home/App Download.png';
import { PageHero, KidButton, EmptyState, PageLoader, SectionHeading, kidColors, kidType } from 'components/kids';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${IMAGES_URL}/${url}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('embed/')) return url;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) return `https://www.youtube.com/embed/${match[2]}`;
  return url;
};

const tilts = [-1.5, 1.5, -1, 1];

export default function ViewApplication() {
  const { id } = useParams();
  const { application, applicationLoading } = useGetApplication(id);

  if (applicationLoading) return <PageLoader />;

  if (!application) {
    return (
      <Box sx={{ py: { xs: 8, md: 12 }, px: 2 }}>
        <EmptyState
          title="لم نجد هذا التطبيق"
          description="تصفّح باقي تطبيقاتنا التعليمية واختر ما يناسب طفلك."
          action={
            <KidButton component={RouterLink} to="/applications" color="berry">
              كل التطبيقات
            </KidButton>
          }
        />
      </Box>
    );
  }

  const title = application.name || '';
  const description = application.full_description || application.short_description || '';
  const shortDescription = application.short_description || '';

  const screenshots =
    application.banner_images && application.banner_images.length > 0
      ? application.banner_images.map((imgObj, idx) => ({ id: imgObj.id || idx, image: getImageUrl(imgObj.image_url) }))
      : [{ id: 1, image: getImageUrl(application.thumbnail) || mockImage1 }];

  const downloadButtons = (application.play_store_url || application.app_store_url) && (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={2}
      alignItems={{ xs: 'stretch', sm: 'center' }}
      justifyContent={{ xs: 'center', md: 'flex-start' }}
    >
      {application.play_store_url && (
        <KidButton
          color="sun"
          size="large"
          component="a"
          href={application.play_store_url}
          target="_blank"
          rel="noopener noreferrer"
          startIcon={<img src={AppDownload} alt="" style={{ width: 22, height: 22 }} />}
        >
          حمّله الآن
        </KidButton>
      )}
      {application.app_store_url && (
        <KidButton color="white" size="large" component="a" href={application.app_store_url} target="_blank" rel="noopener noreferrer">
          تحميل للآيفون (App Store)
        </KidButton>
      )}
    </Stack>
  );

  return (
    <Box sx={{ backgroundColor: kidColors.cloud }}>
      <SEO title={title} description={description?.slice(0, 160)} image={screenshots[0]?.image} url={`/applications/${id}`} />

      <PageHero
        tone="berry"
        title={title}
        description={shortDescription && shortDescription !== description ? shortDescription : undefined}
        image={getImageUrl(application.thumbnail) || undefined}
        imageAlt={title}
        crumbs={[{ label: 'التطبيقات', to: '/applications' }, { label: title }]}
      >
        {downloadButtons}
      </PageHero>

      {/* Screenshots */}
      <Box
        sx={{
          pt: { xs: 3, md: 4 },
          pb: { xs: 5, md: 7 },
          px: { xs: 2, sm: 3, md: 6 },
          '& .swiper-pagination-bullet': {
            width: 12,
            height: 12,
            backgroundColor: '#fff',
            border: `3px solid ${kidColors.ink}26`,
            opacity: 1
          },
          '& .swiper-pagination-bullet-active': {
            width: 32,
            borderRadius: '999px',
            backgroundColor: kidColors.berry,
            borderColor: kidColors.berryDeep
          }
        }}
      >
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={28}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          breakpoints={{ 640: { slidesPerView: 1.5 }, 960: { slidesPerView: 2 } }}
          style={{ padding: '14px 8px 56px' }}
        >
          {screenshots.map((shot, i) => (
            <SwiperSlide key={shot.id}>
              <Box
                sx={{
                  p: 1.25,
                  backgroundColor: '#fff',
                  borderRadius: '30px',
                  transform: `rotate(${tilts[i % tilts.length]}deg)`,
                  boxShadow: `0 10px 0 ${kidColors.berry}33`
                }}
              >
                <Box
                  component="img"
                  src={shot.image}
                  alt={`صورة من تطبيق ${title}`}
                  loading={i === 0 ? 'eager' : 'lazy'}
                  sx={{ width: '100%', height: { xs: 300, sm: 400, md: 500 }, objectFit: 'cover', display: 'block', borderRadius: '22px' }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      <Container maxWidth="lg" sx={{ pb: { xs: 6, md: 8 } }}>
        {/* About */}
        {description && (
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <SectionHeading title="نبذة عن التطبيق" lineColor={kidColors.berry} mb={3} />
            <Box
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '32px',
                backgroundColor: '#fff',
                border: `3px solid ${kidColors.berry}26`,
                boxShadow: `0 10px 0 ${kidColors.berry}1F`
              }}
            >
              <Typography sx={{ ...kidType.body, color: kidColors.ink, whiteSpace: 'pre-line', maxWidth: 820, mx: 'auto' }}>
                {description}
              </Typography>
            </Box>
          </Box>
        )}

        {/* Video */}
        {application.promo_video_url && (
          <Box sx={{ mb: 2 }}>
            <SectionHeading title="فيديو عن التطبيق" lineColor={kidColors.sun} mb={3} />
            <Box
              sx={{
                p: { xs: 1, sm: 1.5 },
                borderRadius: { xs: '24px', md: '36px' },
                backgroundColor: kidColors.sun,
                boxShadow: `0 12px 0 ${kidColors.sunDeep}`
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: { xs: '18px', md: '26px' },
                  overflow: 'hidden',
                  backgroundColor: '#000'
                }}
              >
                <iframe
                  width="100%"
                  height="100%"
                  src={getYouTubeEmbedUrl(application.promo_video_url)}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: 'block' }}
                />
              </Box>
            </Box>
          </Box>
        )}

        {downloadButtons && (
          <Box sx={{ mt: { xs: 6, md: 8 }, display: 'flex', justifyContent: 'center' }}>
            <Box sx={{ '& > div': { justifyContent: 'center' } }}>{downloadButtons}</Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}
