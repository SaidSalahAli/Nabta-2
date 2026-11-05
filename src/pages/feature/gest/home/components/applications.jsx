import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Fade } from '@mui/material';
import img from 'assets/images/test.jpeg';
import { useGetApplications } from 'api/applications';
import { IMAGES_URL } from 'config';
import EpisodeSwiper from 'components/EpisodeSwiper';
import { KidSection, SectionHeading, KidButton, Star, Flower, kidColors } from 'components/kids';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${IMAGES_URL}/${url}`;
};

export default function Applications({ shouldAnimate = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const { applications = [] } = useGetApplications();

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  const items = applications.map((app) => ({
    id: app.id || app.Id,
    title: app.name || app.Name,
    image: getImageUrl(app.thumbnail || app.Thumbnail) || img,
    watch: 'حمّله الآن'
  }));

  return (
    <KidSection
      bg={kidColors.berry}
      wave
      decorations={
        <>
          <Star size={30} sx={{ top: 60, insetInlineEnd: '10%' }} />
          <Star size={18} color="#fff" sx={{ top: 140, insetInlineEnd: '16%', opacity: 0.6 }} />
          <Flower size={46} color={kidColors.coral} sx={{ bottom: 60, insetInlineStart: '5%' }} />
        </>
      }
    >
      <SectionHeading tone="light" title="التطبيقات" subtitle="تطبيقات تعليمية تفاعلية لتأسيس الأطفال في مرحلة الطفولة المبكرة." />

      <Fade in={checked} timeout={700}>
        <Box>
          <EpisodeSwiper episodes={items} isAnimating={checked} onCardClick={(app) => navigate(`/applications/${app.id}`)} />
        </Box>
      </Fade>

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <KidButton color="sun" size="large" onClick={() => navigate('/applications')}>
          كل التطبيقات
        </KidButton>
      </Box>
    </KidSection>
  );
}
