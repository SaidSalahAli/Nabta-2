import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import img1 from 'assets/Home/dar heraa.png';
import img2 from 'assets/Home/dar rttel.png';
import { KidSection, SectionHeading, crayon, kidColors, kidFont } from 'components/kids';

const partners = [
  { id: 1, name: 'دار حراء', logo: img1 },
  { id: 2, name: 'دار رتل', logo: img2 }
];

export default function Partners({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection bg="#fff" wave waveVariant="gentle">
      <SectionHeading title="شركاء منصة نبتة" subtitle="نسير معًا جنبًا إلى جنب مع شركائنا في النجاح." />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: { xs: 3, md: 5 } }}>
        {partners.map((partner, index) => {
          const c = crayon(index + 1);
          return (
            <Fade key={partner.id} in={checked} timeout={700} style={{ transitionDelay: checked ? `${index * 120}ms` : '0ms' }}>
              <Box sx={{ width: { xs: '100%', sm: 280 }, maxWidth: 320, textAlign: 'center' }}>
                <Box
                  sx={{
                    p: 1.5,
                    backgroundColor: '#fff',
                    borderRadius: '28px',
                    border: `3px solid ${c.main}`,
                    boxShadow: `0 8px 0 ${c.main}40`,
                    transform: `rotate(${index % 2 ? 2 : -2}deg)`,
                    transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
                    '&:hover': { transform: 'rotate(0deg) translateY(-4px)' }
                  }}
                >
                  <Box
                    component="img"
                    src={partner.logo}
                    alt={partner.name}
                    loading="lazy"
                    sx={{ width: '100%', display: 'block', borderRadius: '18px', objectFit: 'contain' }}
                  />
                </Box>
                <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.25rem', color: kidColors.ink, mt: 2.5 }}>
                  {partner.name}
                </Typography>
              </Box>
            </Fade>
          );
        })}
      </Box>
    </KidSection>
  );
}
