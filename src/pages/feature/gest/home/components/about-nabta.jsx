import React, { useEffect, useState } from 'react';
import { Box, Container, Fade, Typography } from '@mui/material';
import mobileImg from 'assets/Home/storyMop.svg';
import bcImg from 'assets/Home/storyComp.svg';

export default function AboutNabta({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <Fade in={checked} timeout={800}>
      <Box
        id="about-nabta"
        sx={{
          py: { xs: 8, md: 6 },
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#ffff'
        }}
      >
        <Container maxWidth="lg">
          {/* Heading */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              نبته
            </Typography>
            <Typography variant="body2" sx={{ color: '#000', fontSize: '18px' }}>
              منصة صناعة محتوى تربوي تعليمي للأطفال، ودعم الأمهات والآباء
              <br />
              تربية تتعلّم... وتعليم يربّي
            </Typography>
          </Box>

          {/* Desktop Image */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={bcImg}
              alt="نبته - نسخة الكمبيوتر"
              sx={{
                width: '100%',
                // maxWidth: '900px',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>

          {/* Mobile Image */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box
              component="img"
              src={mobileImg}
              alt="نبته - نسخة الموبايل"
              sx={{
                width: '100%',
                maxWidth: '420px',
                height: 'auto',
                objectFit: 'contain'
              }}
            />
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
