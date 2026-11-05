import React, { useEffect, useState } from 'react';
import { Box, Fade, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import img from 'assets/Home/worksheets.png';
import { KidSection, SectionHeading, KidButton, Star, Sprout, kidColors, kidType } from 'components/kids';

const perks = ['تلوين', 'كتابة الحروف', 'أنشطة حركية', 'مجانًا للطباعة'];

export default function Worksheets({ shouldAnimate = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection
      bg={kidColors.sunSoft}
      wave
      decorations={
        <>
          <Star size={28} color={kidColors.coral} sx={{ top: 50, insetInlineStart: '45%' }} />
          <Sprout size={60} sx={{ bottom: 30, insetInlineStart: '3%' }} />
        </>
      }
    >
      <Fade in={checked} timeout={700}>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1.05fr 0.95fr' },
            alignItems: 'center',
            gap: { xs: 5, md: 8 }
          }}
        >
          <Box sx={{ textAlign: { xs: 'center', md: 'start' } }}>
            <SectionHeading
              title="أوراق عمل"
              align="inherit"
              lineColor={kidColors.leaf}
              mb={3}
              sx={{ '& svg': { mx: { xs: 'auto', md: 0 } } }}
            />

            <Typography sx={{ ...kidType.body, color: kidColors.inkSoft, maxWidth: 560, mx: { xs: 'auto', md: 0 }, mb: 3 }}>
              اطبع أوراق مذاكرة وتلوين، واجعل طفلك يتفاعل بنفسه مع الورقة والقلم والألوان، لتنمّي قدراته الحركية ومهاراته الإبداعية.
            </Typography>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' }, mb: 4 }}>
              {perks.map((p, i) => (
                <Box
                  key={p}
                  sx={{
                    fontWeight: 800,
                    fontSize: '1rem',
                    px: 2,
                    py: 0.5,
                    borderRadius: '999px',
                    backgroundColor: '#fff',
                    border: `3px solid ${[kidColors.sky, kidColors.leaf, kidColors.coral, kidColors.berry][i]}`,
                    color: kidColors.ink
                  }}
                >
                  {p}
                </Box>
              ))}
            </Box>

            <KidButton color="leaf" size="large" onClick={() => navigate('/worksheets')}>
              حمِّل أوراق العمل مجانًا
            </KidButton>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: 480,
                p: 1.5,
                backgroundColor: '#fff',
                borderRadius: '32px',
                transform: 'rotate(2.5deg)',
                boxShadow: `0 12px 0 ${kidColors.sunDeep}55`
              }}
            >
              <Box
                component="img"
                src={img}
                alt="نماذج من أوراق العمل"
                loading="lazy"
                sx={{ width: '100%', display: 'block', borderRadius: '22px' }}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </KidSection>
  );
}
