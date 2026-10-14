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
          backgroundColor: '#ffff',
          scrollMarginTop: { xs: '80px', md: '110px' }
        }}
      >
        <Container maxWidth="lg">
          {/* Heading */}
          <Box sx={{ textAlign: 'center', mb: { xs: 6, md: 8 } }}>
            <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              نبته
            </Typography>
            <Typography variant="body2" sx={{ color: '#000', fontSize: '18px' }}>
              منصة صناعة محتوى تربوي تعليمي للأطفال، ودعم الأمهات والآباء.
              <br />
              تربية تعلّم... وتعليم يربّي
            </Typography>
          </Box>

          {/* Responsive Picture: loads only one image based on viewport width */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}
          >
            <Box
              component="picture"
              sx={{
                display: 'block',
                width: '100%',
                maxWidth: { xs: '420px', md: '900px' },
                textAlign: 'center'
              }}
            >
              <source media="(min-width: 900px)" srcSet={bcImg} />
              <Box
                component="img"
                src={mobileImg}
                alt="نبته - قصة نبته"
                loading="lazy"
                decoding="async"
                sx={{
                  width: '100%',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'inline-block'
                }}
              />
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
