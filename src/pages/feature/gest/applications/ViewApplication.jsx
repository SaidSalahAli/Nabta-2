import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Link,
  Button,
  Paper,
  Fade
} from '@mui/material';
import { ArrowLeft2, Play } from 'iconsax-react';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Pagination, Navigation, Autoplay } from 'swiper/modules';

import mockImage1 from 'assets/images/test.jpeg';

const mockScreenshots = [
  { id: 1, image: mockImage1, caption: 'واجهة التطبيق التفاعلية' },
  { id: 2, image: mockImage1, caption: 'ألعاب تعليمية ممتعة' },
  { id: 3, image: mockImage1, caption: 'تتبع الحروف ونطقها' },
  { id: 4, image: mockImage1, caption: 'مراحل متعددة تناسب الأعمار' }
];

export default function ViewApplication() {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const application = {
    id,
    title: 'تطبيق لغتي العربية',
    description: `هل تبحث عن تطبيق تعليمي ممتع وسهل الاستخدام لمساعدة طفلك الصغير على تعلم الحروف العربية؟ إليك ما تبحث عنه: تطبيق لغتي العربية.
"لغتي العربية" هو تطبيق يناسب الأطفال في سن ما قبل المدرسة وحتى مرحلة الروضة. يحتوي التطبيق على سلسلة من الألعاب والأنشطة التفاعلية المختلفة مثل تتبع الحروف والضغط عليها مع تمييز أصواتها، وكل ذلك صُمم بأسلوب الطريقة الصوتية لتعلم الحروف العربية لأنها هي الطريقة الأصح في تعلم اللغة العربية.`,
    videoUrl: 'https://www.youtube.com/watch?v=lYs7UOXoXjY',
    downloadUrl: '#'
  };

  return (
    <Fade in={checked} timeout={800}>
      <Box
        sx={{
          py: { xs: 3, sm: 4, md: 6 },
          backgroundColor: '#fcfcfc',
          minHeight: '100vh'
        }}
      >
        <Container maxWidth="lg">

          {/* Breadcrumbs */}
          <Breadcrumbs
            separator={
              <ArrowLeft2
                size="14"
                color="#2E2A39"
                style={{ transform: 'rotate(180deg)' }}
              />
            }
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
              {application.title}
            </Typography>
          </Breadcrumbs>

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: { xs: 4, md: 6 },
              color: '#2E2A39',
              fontSize: {
                xs: '1.9rem',
                sm: '2.4rem',
                md: '3rem'
              },
              lineHeight: 1.4,
              textAlign: 'center'
            }}
          >
            {application.title}
          </Typography>

          {/* Screenshots */}
          <Box
            sx={{
              mb: { xs: 5, md: 6 },
              px: { xs: 0, sm: 1, md: 4 }
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
                640: { slidesPerView: 2 },
                960: { slidesPerView: 3 }
              }}
              style={{
                paddingBottom: '50px'
              }}
            >
              {mockScreenshots.map((shot) => (
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
                          xs: '220px',
                          sm: '240px',
                          md: '250px'
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
                        background:
                          'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
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

          {/* Download Button */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: { xs: 6, md: 8 }
            }}
          >
            <Button
              variant="contained"
              href={application.downloadUrl}
              target="_blank"
              fullWidth={false}
              startIcon={
                <Play
                  size="22"
                  color="#2E2A39"
                  variant="Bold"
                />
              }
              sx={{
                width: {
                  xs: '100%',
                  sm: 'auto'
                },
                maxWidth: {
                  xs: '100%',
                  sm: 'fit-content'
                },
                px: { xs: 3, sm: 5 },
                py: 1.5,
                borderRadius: '16px',
                backgroundColor: '#FFD666',
                color: '#2E2A39',
                fontWeight: 800,
                fontSize: {
                  xs: '16px',
                  md: '18px'
                },
                boxShadow:
                  '0 10px 25px rgba(255, 214, 102, 0.4)',
                '&:hover': {
                  backgroundColor: '#ffcf4d',
                  transform: 'translateY(-2px)',
                  boxShadow:
                    '0 15px 35px rgba(255, 214, 102, 0.5)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              حمّله الآن
            </Button>
          </Box>

          {/* About */}
          <Box sx={{ mb: { xs: 6, md: 8 } }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#2E2A39',
                mb: 3,
                fontSize: {
                  xs: '1.8rem',
                  sm: '2.2rem',
                  md: '3rem'
                },
                display: 'inline-block',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  right: 0,
                  width: '50%',
                  height: '4px',
                  backgroundColor: '#0088CC',
                  borderRadius: '2px'
                }
              }}
            >
              نبذة
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
                boxShadow:
                  '0 10px 40px rgba(0,0,0,0.03)'
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: 'text.secondary',
                  fontSize: {
                    xs: '15px',
                    sm: '16px',
                    md: '18px'
                  },
                  lineHeight: 2,
                  whiteSpace: 'pre-line'
                }}
              >
                {application.description}
              </Typography>
            </Paper>
          </Box>

          {/* Video */}
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
                boxShadow:
                  '0 20px 50px rgba(0,0,0,0.1)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: {
                    md: 'translateY(-5px)'
                  },
                  boxShadow:
                    '0 30px 60px rgba(0,0,0,0.15)'
                }
              }}
            >
              <iframe
                width="100%"
                height="100%"
                src={application.videoUrl.replace(
                  'watch?v=',
                  'embed/'
                )}
                title={application.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </Paper>
          </Box>

        </Container>
      </Box>
    </Fade>
  );
}
