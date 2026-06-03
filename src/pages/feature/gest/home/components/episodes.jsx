import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Fade, Button, CircularProgress } from '@mui/material';
import img from 'assets/images/test.jpeg';
import EpisodeSwiper from '../../../../../components/EpisodeSwiper';
import { useGetEpisodes } from 'api/episodes';

export default function Episodes({ shouldAnimate = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      setChecked(true);
    }
  }, [shouldAnimate]);

  const { episodes: apiEpisodes, episodesLoading } = useGetEpisodes();

  const episodes =
    apiEpisodes?.slice(0, 5).map((ep) => ({
      id: ep.Id,
      title: ep.TitleAr,
      image: ep.CoverImage || ep.CoverImage || img,
      watch: 'شاهد'
    })) || [];

  if (episodesLoading) {
    return (
      <Box sx={{ py: 4, width: '100%', display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 4, width: '100%' }}>
        <Container maxWidth="lg">
          {/* Title Section */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              الحلقات
            </Typography>
            <Typography variant="body2" sx={{ color: '#000', fontSize: '18px' }}>
              حلقات متخصصة لأولياء الأمور والمعلمين والآباء والأمهات
            </Typography>
          </Box>
          {/* Episodes Swiper */}
          <EpisodeSwiper episodes={episodes} isAnimating={checked} onCardClick={(ep) => navigate(`/episodes/${ep.id}`)} />
          {/* View All Link */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { '& .view-all-text': { color: '#006699' } }
            }}
          >
            <Button
              variant="contained"
              onClick={() => navigate('/episodes')}
              sx={{
                px: 5,
                py: 1,
                borderRadius: '10px',
                fontSize: { xs: '18px', md: '15px' },
                fontWeight: 700,
                backgroundColor: '#FFD666',
                color: '#2E2A39',
                boxShadow: '0 10px 25px rgba(255, 214, 102, 0.35)',
                '&:hover': {
                  backgroundColor: '#ffcf4d'
                }
              }}
            >
              المزيد
            </Button>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
