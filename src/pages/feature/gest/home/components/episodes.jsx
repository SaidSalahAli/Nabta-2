import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Fade, CircularProgress } from '@mui/material';
import img from 'assets/images/test.jpeg';
import EpisodeSwiper from 'components/EpisodeSwiper';
import { useGetEpisodes } from 'api/episodes';
import { KidSection, SectionHeading, KidButton, Star, Cloud, kidColors } from 'components/kids';

export default function Episodes({ shouldAnimate = false }) {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  const { episodes: apiEpisodes, episodesLoading } = useGetEpisodes();

  const episodes =
    apiEpisodes?.slice(0, 5).map((ep) => ({
      id: ep.Id,
      title: ep.TitleAr,
      image: ep.CoverImage || img,
      watch: 'شاهد'
    })) || [];

  return (
    <KidSection
      bg={kidColors.cloud}
      py={{ xs: 5, md: 7 }}
      decorations={
        <>
          <Star size={34} sx={{ top: 50, insetInlineStart: '8%' }} />
          <Cloud size={150} color="#fff" sx={{ top: 30, insetInlineEnd: '4%' }} />
        </>
      }
    >
      <SectionHeading title="الحلقات" subtitle="حلقات توعوية لأولياء الأمور الأمهات والآباء والمعلمين، وحلقات تربوية تعليمية للأطفال." />

      {episodesLoading ? (
        <Box sx={{ py: 6, display: 'flex', justifyContent: 'center' }}>
          <CircularProgress sx={{ color: kidColors.sky }} />
        </Box>
      ) : (
        <Fade in={checked} timeout={700}>
          <Box>
            <EpisodeSwiper episodes={episodes} isAnimating={checked} onCardClick={(ep) => navigate(`/episodes/${ep.id}`)} />
          </Box>
        </Fade>
      )}

      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <KidButton color="sun" size="large" onClick={() => navigate('/episodes')}>
          كل الحلقات
        </KidButton>
      </Box>
    </KidSection>
  );
}
