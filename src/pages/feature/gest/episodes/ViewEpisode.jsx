import React, { useState, useEffect } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Typography,
  Container,
  Breadcrumbs,
  Link,
  Button,
  Stack,
  Divider,
  Paper,
  Fade,
  IconButton,
  Collapse,
  CircularProgress
} from '@mui/material';

import { useGetEpisode } from 'api/episodes';

import {
  ArrowLeft2,
  Share,
  Facebook,
  Whatsapp,
  Calendar,
  Profile,
  DocumentText
} from 'iconsax-react';

export default function ViewEpisode() {
  const { id } = useParams();
  const [checked, setChecked] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const { episode, episodeLoading } = useGetEpisode(id);

  if (episodeLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (!episode) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h4">الحلقة غير موجودة</Typography>
      </Box>
    );
  }

  const dateObject = new Date(episode.created_at || new Date());
  const formattedDate = dateObject.toLocaleDateString('ar-EG');
  const formattedTime = dateObject.toLocaleTimeString('ar-EG');

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
              mb: { xs: 2, md: 4 },
              flexWrap: 'wrap'
            }}
          >
            <Link
              component={RouterLink}
              to="/episodes"
              underline="hover"
              color="inherit"
              sx={{
                display: 'flex',
                alignItems: 'center',
                fontWeight: 600,
                fontSize: { xs: '14px', sm: '16px' }
              }}
            >
              الحلقات
            </Link>

            <Typography
              color="text.primary"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '14px', sm: '16px' }
              }}
            >
              {episode.title_ar}
            </Typography>
          </Breadcrumbs>

          {/* Title */}
          <Typography
            variant="h1"
            sx={{
              fontWeight: 800,
              mb: { xs: 2, md: 4 },
              color: '#2E2A39',
              fontSize: {
                xs: '1.8rem',
                sm: '2.3rem',
                md: '3rem'
              },
              lineHeight: 1.4,
              textAlign: { xs: 'center', md: 'left' }
            }}
          >
            {episode.title_ar}
          </Typography>

          {/* Description */}
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
              mb: { xs: 4, md: 6 },
            }}
          >
            {episode.description_ar}
          </Typography>

          {/* Video */}
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
              mb: { xs: 3, md: 4 },
              boxShadow: '0 20px 50px rgba(0,0,0,0.1)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: { md: 'translateY(-5px)' },
                boxShadow: '0 30px 60px rgba(0,0,0,0.15)'
              }
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={episode.video_url?.replace('watch?v=', 'embed/')}
              title={episode.title_ar}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </Paper>

          {/* Transcript */}
          <Box
            sx={{
              mb: { xs: 4, md: 6 },
              textAlign: 'center'
            }}
          >
            <Button
              variant="contained"
              startIcon={
                <DocumentText
                  size="20"
                  color="#2E2A39"
                  variant="Bold"
                />
              }
              onClick={() => setShowTranscript(!showTranscript)}
              fullWidth={{ xs: true, sm: false }}
              sx={{
                px: { xs: 2, sm: 4 },
                py: 1.5,
                width: { xs: '100%', sm: 'auto' },
                maxWidth: { xs: '100%', sm: 'fit-content' },
                borderRadius: '12px',
                backgroundColor: '#FFD666',
                color: '#2E2A39',
                fontWeight: 700,
                fontSize: {
                  xs: '14px',
                  sm: '16px'
                },
                '&:hover': {
                  backgroundColor: '#ffcf4d'
                },
                boxShadow: '0 8px 24px rgba(255, 214, 102, 0.3)'
              }}
            >
              جميع النص داخل الفيديو
            </Button>

            <Collapse in={showTranscript}>
              <Paper
                variant="outlined"
                sx={{
                  mt: 3,
                  p: {
                    xs: 2,
                    sm: 3,
                    md: 4
                  },
                  borderRadius: '16px',
                  backgroundColor: '#fff',
                  borderColor: '#FFD666'
                }}
              >
                <Typography
                  variant="body1"
                  sx={{
                    color: 'text.primary',
                    whiteSpace: 'pre-line',
                    lineHeight: 2,
                    fontSize: {
                      xs: '14px',
                      sm: '15px',
                      md: '16px'
                    }
                  }}
                >
                  {episode.transcript_ar || 'لا يوجد نص لهذه الحلقة.'}
                </Typography>
              </Paper>
            </Collapse>
          </Box>

          <Divider sx={{ mb: { xs: 3, md: 4 } }} />

          {/* Footer */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: {
                xs: 'column',
                md: 'row'
              },
              justifyContent: 'space-between',
              alignItems: {
                xs: 'center',
                md: 'center'
              },
              gap: { xs: 3, md: 4 }
            }}
          >

            {/* Metadata */}
            <Stack
              spacing={2}
              sx={{
                width: '100%',
                textAlign: {
                  xs: 'center',
                  md: 'left'
                }
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: {
                    xs: 'center',
                    md: 'flex-start'
                  },
                  gap: 1
                }}
              >
                <Profile
                  size="20"
                  color="#0088CC"
                  variant="Bold"
                />
                <Typography
                  variant="body2"
                  sx={{
                    fontWeight: 600,
                    fontSize: {
                      xs: '14px',
                      sm: '15px'
                    }
                  }}
                >
                  بقلم: {episode.author || 'غير محدد'}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: {
                    xs: 'center',
                    md: 'flex-start'
                  },
                  gap: 1,
                  flexWrap: 'wrap'
                }}
              >
                <Calendar
                  size="20"
                  color="#0088CC"
                  variant="Bold"
                />
                <Typography
                  variant="body2"
                  sx={{
                    color: 'text.secondary',
                    fontSize: {
                      xs: '13px',
                      sm: '14px'
                    }
                  }}
                >
                  التاريخ: {formattedDate} ({formattedTime})
                </Typography>
              </Box>
            </Stack>

            {/* Share */}
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems="center"
              spacing={2}
              sx={{ width: '100%', justifyContent: 'center' }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: {
                    xs: '15px',
                    sm: '16px'
                  }
                }}
              >
                <Share
                  size="20"
                  color="#2E2A39"
                  variant="Bold"
                />
                انشر الحلقة
              </Typography>

              <Stack direction="row" spacing={1.5}>
                <IconButton
                  sx={{
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Facebook
                    size="24"
                    color="#1877F2"
                    variant="Bold"
                  />
                </IconButton>

                <IconButton
                  sx={{
                    backgroundColor: '#fff',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                    '&:hover': {
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  <Whatsapp
                    size="24"
                    color="#25D366"
                    variant="Bold"
                  />
                </IconButton>
              </Stack>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}