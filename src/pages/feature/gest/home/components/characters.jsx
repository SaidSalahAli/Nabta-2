import React, { useState, useEffect } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import character_1 from 'assets/Home/moslem.svg';
import character_2 from 'assets/Home/moslema.svg';
import { KidSection, SectionHeading, Star, Cloud, kidColors, kidFont, kidType } from 'components/kids';

const characters = [
  {
    id: 1,
    name: 'مسلم',
    image: character_1,
    accent: kidColors.sun,
    accentDeep: kidColors.sunDeep,
    description:
      'الطفل مُسلم هو طفل ذكي ومُحب للاستكشاف والتعلم لكل جديد ومفيد، ويحافظ على الصلاة في أوقاتها، ويعتني بصحته ويمارس الرياضة وله مواقف ملهمة أثناء تعلمه الحروف العربية.'
  },
  {
    id: 2,
    name: 'مسلمة',
    image: character_2,
    accent: kidColors.coral,
    accentDeep: kidColors.coralDeep,
    description:
      'الطفلة مُسلمة هي طفلة جميلة ومهذبة وتحب الجلوس بالبيت والاعتناء به، تتعلم من أمها أشياء كثيرة مثل ترتيب المنزل وتحضير الطعام ومع ذلك هي مجتهدة في دراستها ومذاكرتها، ولها مواقف رائعة مع أخوها مُسلم أثناء تعلمها معه الحروف العربية.'
  }
];

export default function Characters({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection
      bg={kidColors.sky}
      wave
      decorations={
        <>
          <Cloud size={160} color="rgba(255,255,255,.14)" sx={{ top: 40, insetInlineStart: '3%' }} />
          <Cloud size={110} color="rgba(255,255,255,.12)" sx={{ bottom: 60, insetInlineEnd: '4%' }} />
          <Star size={26} sx={{ top: 70, insetInlineEnd: '20%' }} />
        </>
      }
    >
      <SectionHeading tone="light" title="شخصيات منصة نبتة" subtitle="تعرّف على أصدقاء طفلك في رحلة تعلّم الحروف العربية." />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 8, md: 5 }, pt: { xs: 6, md: 8 } }}>
        {characters.map((character, index) => (
          <Fade key={character.id} in={checked} timeout={700} style={{ transitionDelay: checked ? `${index * 180}ms` : '0ms' }}>
            <Box
              sx={{
                position: 'relative',
                backgroundColor: '#fff',
                borderRadius: '36px',
                boxShadow: `0 10px 0 ${kidColors.skyDeep}`,
                pt: { xs: 15, md: 16 },
                px: { xs: 3, md: 4 },
                pb: 4,
                textAlign: 'center',
                '&:hover .char-img': { transform: 'translateY(-8px) rotate(-3deg)' }
              }}
            >
              {/* colourful blob + character, centred with insets so RTL flipping can't skew it */}
              <Box
                aria-hidden="true"
                sx={{
                  position: 'absolute',
                  top: { xs: -56, md: -64 },
                  left: 0,
                  right: 0,
                  mx: 'auto',
                  width: { xs: 180, md: 200 },
                  height: { xs: 180, md: 200 },
                  borderRadius: '46% 54% 50% 50% / 55% 45% 55% 45%',
                  backgroundColor: character.accent
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: { xs: -70, md: -80 },
                  left: 0,
                  right: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  pointerEvents: 'none'
                }}
              >
                <Box
                  className="char-img"
                  component="img"
                  src={character.image}
                  alt={`شخصية ${character.name}`}
                  loading="lazy"
                  sx={{
                    height: { xs: 210, md: 230 },
                    width: 'auto',
                    maxWidth: '80%',
                    objectFit: 'contain',
                    transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)'
                  }}
                />
              </Box>

              <Box
                sx={{
                  display: 'inline-block',
                  fontFamily: kidFont,
                  fontWeight: 800,
                  fontSize: '1.6rem',
                  color: kidColors.ink,
                  backgroundColor: character.accent,
                  px: 3,
                  py: 0.25,
                  borderRadius: '999px',
                  boxShadow: `0 5px 0 ${character.accentDeep}`,
                  mb: 2.5,
                  transform: index % 2 ? 'rotate(2deg)' : 'rotate(-2deg)'
                }}
              >
                {character.name}
              </Box>

              <Typography sx={{ ...kidType.body, color: kidColors.inkSoft, m: 0 }}>{character.description}</Typography>
            </Box>
          </Fade>
        ))}
      </Box>
    </KidSection>
  );
}
