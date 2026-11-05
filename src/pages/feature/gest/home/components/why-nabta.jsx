import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import workImg from 'assets/Home/Work.png';
import KnowledgeImg from 'assets/Home/Knowledge.png';
import ExperienceImg from 'assets/Home/Experience.png';
import { KidSection, SectionHeading, Star, crayon, kidColors, kidFont, kidType, stickerCard } from 'components/kids';

const reasons = [
  { id: 1, title: 'العلم', description: 'الاستناد إلى أحدث الأبحاث والدراسات في التربية والتعليم.', img: KnowledgeImg },
  { id: 2, title: 'العمل', description: 'تجارب عملية واقعية، ونتائج ملموسة ومؤثرة.', img: workImg },
  { id: 3, title: 'الخبرة', description: 'فهم احتياجات الأطفال، وأولياء الأمور والمعلمين.', img: ExperienceImg }
];

export default function WhyNabta({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection bg="#fff" wave waveVariant="gentle" decorations={<Star size={30} sx={{ top: 70, insetInlineStart: '12%' }} />}>
      <SectionHeading title="لماذا تختار منصة نبتة؟" />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: { xs: 3, md: 4 } }}>
        {reasons.map((reason, index) => {
          const c = crayon(index);
          return (
            <Fade key={reason.id} in={checked} timeout={700} style={{ transitionDelay: checked ? `${index * 140}ms` : '0ms' }}>
              <Box
                sx={{
                  ...stickerCard(c.main, { lift: false }),
                  backgroundColor: c.soft,
                  borderColor: 'transparent',
                  textAlign: 'center',
                  p: { xs: 3, md: 4 },
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                <Box
                  sx={{
                    width: { xs: 110, md: 128 },
                    height: { xs: 110, md: 128 },
                    borderRadius: '50%',
                    backgroundColor: '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 2.5,
                    boxShadow: `0 6px 0 ${c.main}`
                  }}
                >
                  <Box component="img" src={reason.img} alt="" sx={{ width: '70%', height: '70%', objectFit: 'contain' }} />
                </Box>
                <Typography
                  component="h3"
                  sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '1.8rem', md: '2rem' }, color: kidColors.ink, mb: 1 }}
                >
                  {reason.title}
                </Typography>
                <Typography sx={{ ...kidType.body, color: kidColors.inkSoft, maxWidth: 290 }}>{reason.description}</Typography>
              </Box>
            </Fade>
          );
        })}
      </Box>
    </KidSection>
  );
}
