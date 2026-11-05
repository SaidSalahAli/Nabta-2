import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import stateImg from 'assets/Home/state.png';
import papersImg from 'assets/Home/papers.png';
import activityImg from 'assets/Home/activity.png';
import beneficiaryImg from 'assets/Home/beneficiary.png';
import { KidSection, SectionHeading, Sprout, Sun, crayon, kidColors, kidFont } from 'components/kids';

const stats = [
  {
    id: 1,
    prefix: 'أكثر من',
    value: '1,180,000',
    subtitle: 'طفل مُتعلم حول العالم استفاد من تطبيق لغتي العربية، ومحتوانا.',
    icon: beneficiaryImg
  },
  { id: 2, value: '420', subtitle: 'نشاط تفاعلي', icon: activityImg },
  { id: 3, value: '420', subtitle: 'ورقة مذاكرة وتلوين', icon: papersImg },
  { id: 4, value: '197', subtitle: 'دولة', icon: stateImg }
];

export default function NabtaNumbers({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection
      bg={kidColors.leafSoft}
      wave
      decorations={
        <>
          <Sun size={84} sx={{ top: 40, insetInlineStart: '5%' }} />
          <Sprout size={58} sx={{ bottom: 30, insetInlineEnd: '4%' }} />
        </>
      }
    >
      <SectionHeading title="أثر منصة نبتة بالأرقام" lineColor={kidColors.leaf} />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 3, md: 3 } }}>
        {stats.map((item, index) => {
          const c = crayon(index);
          return (
            <Fade key={item.id} in={checked} timeout={700} style={{ transitionDelay: checked ? `${index * 120}ms` : '0ms' }}>
              <Box
                sx={{
                  backgroundColor: '#fff',
                  borderRadius: '30px',
                  borderBottom: `8px solid ${c.main}`,
                  px: 2.5,
                  py: 3.5,
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: `rotate(${index % 2 ? 1 : -1}deg)`
                }}
              >
                <Box sx={{ width: { xs: 84, md: 96 }, height: { xs: 84, md: 96 }, mb: 1.5 }}>
                  <img src={item.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </Box>
                {item.prefix && (
                  <Typography sx={{ fontFamily: kidFont, fontWeight: 700, fontSize: '1.05rem', color: kidColors.inkSoft, lineHeight: 1 }}>
                    {item.prefix}
                  </Typography>
                )}
                <Typography
                  sx={{
                    fontFamily: kidFont,
                    fontWeight: 800,
                    fontSize: { xs: '2.4rem', md: '2.6rem' },
                    lineHeight: 1.2,
                    color: c.main === kidColors.sun ? kidColors.sunDeep : c.main,
                    direction: 'ltr'
                  }}
                >
                  {item.value}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: kidFont,
                    color: kidColors.ink,
                    fontSize: '1.08rem',
                    fontWeight: 600,
                    lineHeight: 1.7,
                    maxWidth: 240,
                    mt: 0.5
                  }}
                >
                  {item.subtitle}
                </Typography>
              </Box>
            </Fade>
          );
        })}
      </Box>
    </KidSection>
  );
}
