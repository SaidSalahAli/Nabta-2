import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, Container, Fade, Button } from '@mui/material';
import img from 'assets/images/test.jpeg';
import img2 from 'assets/images/App1.png';

import EpisodeSwiper from '../../../../../components/EpisodeSwiper';
// import imgbg from 'assets/images/test2.png';
export default function Applications({ shouldAnimate = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      setChecked(true);
    }
  }, [shouldAnimate]);

  const episodes = [
    { id: 1, title: 'تطبيق لغتي', image: img2, watch: 'حمّله الآن' },
    { id: 2, title: 'تطبيق الرياضيات', image: img, watch: 'حمّله الآن' },
    { id: 3, title: 'تطبيق العلوم', image: img, watch: 'حمّله الآن' },
    { id: 4, title: 'تطبيق التاريخ', image: img, watch: 'حمّله الآن' },
    { id: 5, title: 'تطبيق الجغرافيا', image: img, watch: 'حمّله الآن' }
  ];

  return (
    <Fade in={checked} timeout={800}>
      <Box
        sx={{
          py: 4,
          width: '100%'
          // backgroundColor: '#aeedd9'
          // backgroundImage: `url(${imgbg})`,
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="lg">
          {/* Title Section */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              التطبيقات
            </Typography>
            <Typography variant="body2" sx={{ color: '#000', fontSize: '18px' }}>
              حلقات متخصصة لأولياء الأمور والمعلمين والآباء والأمهات
            </Typography>
          </Box>

          {/* Episodes Swiper */}
          <EpisodeSwiper episodes={episodes} isAnimating={checked} onCardClick={(app) => navigate(`/applications/${app.id}`)} />

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
              onClick={() => navigate('/applications')}
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
