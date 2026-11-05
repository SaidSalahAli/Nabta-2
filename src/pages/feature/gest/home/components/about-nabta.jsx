import React, { useEffect, useState } from 'react';
import { Box, Fade } from '@mui/material';
import mobileImg from 'assets/Home/storyMop.svg';
import bcImg from 'assets/Home/storyComp.svg';
import { KidSection, SectionHeading, Sun, Cloud, Sprout, kidColors } from 'components/kids';

export default function AboutNabta({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection
      id="about-nabta"
      bg="#fff"
      wave
      waveVariant="gentle"
      decorations={
        <>
          <Sun size={96} sx={{ top: 30, insetInlineEnd: '5%' }} />
          <Cloud size={130} color={kidColors.skySoft} sx={{ top: 60, insetInlineStart: '4%' }} />
          <Sprout size={58} sx={{ bottom: 40, insetInlineEnd: '8%' }} />
        </>
      }
    >
      <SectionHeading
        title="نبتة"
        subtitle={
          <>
            منصة صناعة محتوى تربوي تعليمي للأطفال، ودعم الأمهات والآباء.
            <Box component="span" sx={{ display: 'block', fontWeight: 800, color: kidColors.berry, mt: 1 }}>
              تربية تعلّم... وتعليم يربّي
            </Box>
          </>
        }
      />

      <Fade in={checked} timeout={700}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            sx={{
              width: '100%',
              maxWidth: { xs: 440, md: 960 },
              p: { xs: 2, md: 3 },
              borderRadius: '36px',
              backgroundColor: kidColors.cloud,
              border: `3px dashed ${kidColors.sky}55`
            }}
          >
            <Box component="picture" sx={{ display: 'block', width: '100%', textAlign: 'center' }}>
              <source media="(min-width: 900px)" srcSet={bcImg} />
              <Box
                component="img"
                src={mobileImg}
                alt="قصة نبتة"
                loading="lazy"
                decoding="async"
                sx={{ width: '100%', height: 'auto', objectFit: 'contain', display: 'inline-block' }}
              />
            </Box>
          </Box>
        </Box>
      </Fade>
    </KidSection>
  );
}
