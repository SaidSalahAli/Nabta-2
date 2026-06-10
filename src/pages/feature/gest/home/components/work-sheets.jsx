import React, { useEffect, useState } from 'react';
import { Box, Button, Container, Fade, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img from 'assets/Home/worksheets.png';
export default function Worksheets({ shouldAnimate = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <Fade in={checked} timeout={800}>
      <Box
        sx={{
          py: { xs: 1, md: 1 },
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#fcfcfc'
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1.1fr 0.9fr' },
              alignItems: 'center',
              gap: { xs: 5, md: 6 }
            }}
          >
            {/* LEFT CONTENT */}
            <Box sx={{ textAlign: { xs: 'center', md: 'start' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'start' }}>
                <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
                  أوراق عمل
                </Typography>
              </Box>
              <Typography
                sx={{
                  fontSize: { xs: '18px', md: '18px' },
                  color: '#000',
                  lineHeight: 2,
                  maxWidth: { xs: '100%', md: '700px' },
                  mx: { xs: 'auto', md: 0 },
                  mb: 4
                }}
              >
                اطبع أوراق مذاكرة وتلوين، واجعل طفلك يتفاعل بنفسه مع الورقة والقلم والألوان، لتنمّي قدراته الحركية ومهاراته الإبداعية.
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', md: 'flex-start' },
                  mb: 3
                }}
              >
                <Button
                  variant="contained"
                  onClick={() => navigate('/worksheets')}
                  sx={{
                    px: 10,
                    py: 1.6,
                    borderRadius: '10px',
                    fontSize: { xs: '18px', md: '18px' },
                    fontWeight: 700,
                    backgroundColor: '#FFD666',
                    color: '#2E2A39',
                    boxShadow: '0 10px 25px rgba(255, 214, 102, 0.35)',
                    '&:hover': {
                      backgroundColor: '#ffcf4d'
                    }
                  }}
                >
                  حمِّل الآن مجاني
                </Button>
              </Box>

            </Box>

            {/* RIGHT ILLUSTRATION */}
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  position: 'relative'
                }}
              >
                <img src={img} alt="Worksheets" style={{ width: '100%', height: '100%' }} />
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
