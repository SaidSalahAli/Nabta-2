import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import { Box, Typography, Container, Breadcrumbs, Link, Button, Paper, CircularProgress, Stack } from '@mui/material';
import { ArrowLeft2, Play } from 'iconsax-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import SEO from 'components/SEO';
import { useGetApplication } from 'api/applications';
import { IMAGES_URL } from 'config';
import AnimatedSection from 'components/AnimatedSection';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import mockImage1 from 'assets/images/test.jpeg';
import AppDownload from 'assets/Home/App Download.png';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${IMAGES_URL}/${url}`;
};

const getYouTubeEmbedUrl = (url) => {
  if (!url) return '';
  if (url.includes('embed/')) return url;

  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  if (match && match[2].length === 11) {
    return `https://www.youtube.com/embed/${match[2]}`;
  }
  return url;
};

export default function ViewApplication() {
  const { id } = useParams();

  const { application, applicationLoading } = useGetApplication(id);

  if (applicationLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!application) {
    return (
      <Box sx={{ py: 8, textAlign: 'center', minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Typography variant="h5" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          التطبيق غير موجود.
        </Typography>
      </Box>
    );
  }

  const title = application.name || '';
  const description = application.full_description || application.short_description || '';

  // Use banner_images if available, otherwise fallback to thumbnail
  const screenshots = application.banner_images && application.banner_images.length > 0
    ? application.banner_images.map((imgObj, idx) => ({
      id: imgObj.id || idx,
      image: getImageUrl(imgObj.image_url),
      caption: title
    }))
    : [
      {
        id: 1,
        image: getImageUrl(application.thumbnail) || mockImage1,
        caption: title
      }
    ];

  return (
    <Box
      sx={{
        py: { xs: 3, sm: 4, md: 6 },
        backgroundColor: '#fcfcfc',
        minHeight: '100vh'
      }}
    >
      <SEO
        title={title}
        description={description?.slice(0, 160)}
        image={screenshots[0]?.image}
        url={`/applications/${id}`}
      />
      <Container maxWidth="lg">

        {/* Breadcrumbs */}
        <AnimatedSection fade={true}>
          <Breadcrumbs
            separator={<ArrowLeft2 size="14" color="#2E2A39" style={{ transform: 'rotate(180deg)' }} />}
            aria-label="breadcrumb"
            sx={{
              mb: { xs: 3, md: 4 },
              flexWrap: 'wrap'
            }}
          >
            <Link
              component={RouterLink}
              to="/applications"
              underline="hover"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: { xs: '14px', sm: '16px' }
              }}
            >
              التطبيقات
            </Link>

            <Typography
              color="text.primary"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '14px', sm: '16px' }
              }}
            >
              {title}
            </Typography>
          </Breadcrumbs>
        </AnimatedSection>

        {/* Title */}
        <AnimatedSection fade={true}>
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              mb: { xs: 4, md: 6 },
              color: 'primary.main',
              lineHeight: 1.4,
              textAlign: 'center'
            }}
          >
            {title}
          </Typography>
        </AnimatedSection>

        {/* Screenshots */}
        <AnimatedSection fade={true}>
          <Box
            sx={{
              mb: { xs: 5, md: 6 },
              width: '100vw',
              position: 'relative',
              left: '50%',
              right: '50%',
              marginLeft: '-50vw',
              marginRight: '-50vw',
              px: { xs: 2, sm: 3, md: 6 }
            }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              spaceBetween={20}
              slidesPerView={1}
              navigation
              pagination={{ clickable: true }}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false
              }}
              breakpoints={{
                480: { slidesPerView: 1 },
                640: { slidesPerView: 1.5 },
                960: { slidesPerView: 2 }
              }}
              style={{
                paddingBottom: '50px'
              }}
            >
              {screenshots.map((shot) => (
                <SwiperSlide key={shot.id}>
                  <Box
                    sx={{
                      position: 'relative',
                      borderRadius: {
                        xs: '12px',
                        md: '16px'
                      },
                      overflow: 'hidden',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.1)'
                    }}
                  >
                    <Box
                      component="img"
                      src={shot.image}
                      alt={shot.caption}
                      sx={{
                        width: '100%',
                        height: {
                          xs: '320px',
                          sm: '420px',
                          md: '550px'
                        },
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />

                    <Box
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
                        p: { xs: 1.5, md: 2 },
                        pt: { xs: 3, md: 4 }
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        sx={{
                          color: '#fff',
                          fontWeight: 600,
                          textAlign: 'center',
                          fontSize: {
                            xs: '14px',
                            md: '16px'
                          }
                        }}
                      >
                        {shot.caption}
                      </Typography>
                    </Box>
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </AnimatedSection>

        {/* Download Buttons */}
        <AnimatedSection fade={true}>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            alignItems="center"
            sx={{ mb: { xs: 6, md: 8 } }}
          >
            {application.play_store_url && (


              <Button
                variant="contained"
                href={application.play_store_url}
                target="_blank"
                fullWidth={false}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  px: { xs: 3, sm: 5 },
                  py: 1.5,
                  borderRadius: '16px',
                  backgroundColor: '#FFD666',
                  color: '#2E2A39',
                  fontWeight: 800,
                  fontSize: { xs: '16px', md: '18px' },
                  boxShadow: '0 10px 25px rgba(255, 214, 102, 0.4)',
                  '&:hover': {
                    backgroundColor: '#ffcf4d',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(255, 214, 102, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                <img src={AppDownload} alt="App Download" style={{ width: '20px', height: '20px', marginLeft: '10px' }} />
                {/* <Play size="22" color="#2E2A39" variant="Bold" /> */}
                حمّله الآن
              </Button>
            )}

            {application.app_store_url && (
              <Button
                variant="contained"
                href={application.app_store_url}
                target="_blank"
                fullWidth={false}
                sx={{
                  width: { xs: '100%', sm: 'auto' },
                  px: { xs: 3, sm: 5 },
                  py: 1.5,
                  borderRadius: '16px',
                  backgroundColor: '#0088CC',
                  color: '#fff',
                  fontWeight: 800,
                  fontSize: { xs: '16px', md: '18px' },
                  boxShadow: '0 10px 25px rgba(0, 136, 204, 0.4)',
                  '&:hover': {
                    backgroundColor: '#006699',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 15px 35px rgba(0, 136, 204, 0.5)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                تحميل للآيفون (App Store)
              </Button>
            )}
          </Stack>
        </AnimatedSection>

        {/* About */}
        <AnimatedSection fade={true}>
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 800,
                color: '#000',
                mb: 3,
                display: 'inline-block',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  right: 0,
                  width: '100%',
                  height: '4px',
                  borderRadius: '2px'
                }
              }}
            >
              نبذة عن التطبيق
            </Typography>

            <Paper
              elevation={0}
              sx={{
                p: {
                  xs: 2.5,
                  sm: 3,
                  md: 4
                },
                borderRadius: {
                  xs: '18px',
                  md: '24px'
                },
                backgroundColor: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)'
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#000',
                  fontSize: {
                    xs: '15px',
                    sm: '16px',
                    md: '18px'
                  },
                  lineHeight: 2,
                  whiteSpace: 'pre-line'
                }}
              >
                {description}
              </Typography>
            </Paper>
          </Box>
        </AnimatedSection>

        {/* Video */}
        {application.promo_video_url && (
          <AnimatedSection fade={true}>
            <Box sx={{ mb: 4 }}>
              <Typography
                variant="h3"
                sx={{
                  fontWeight: 800,
                  color: '#2E2A39',
                  mb: 3,
                  textAlign: 'center',
                  fontSize: {
                    xs: '1.8rem',
                    sm: '2.2rem',
                    md: '3rem'
                  }
                }}
              >
                فيديو عن التطبيق
              </Typography>

              <Paper
                elevation={0}
                sx={{
                  width: '100%',
                  aspectRatio: '16/9',
                  borderRadius: {
                    xs: '14px',
                    sm: '18px',
                    md: '24px'
                  },
                  overflow: 'hidden',
                  backgroundColor: '#000',
                  position: 'relative',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: {
                      md: 'translateY(-5px)'
                    },
                    boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
                  }
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
                />
              </Paper>
            </Box>
          </AnimatedSection>
        )}
      </Container>
    </Box>
  );
}