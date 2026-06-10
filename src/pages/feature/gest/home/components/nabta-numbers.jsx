import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Fade } from '@mui/material';

//iconsax-react
import { Global, DocumentText, Activity, Mobile } from 'iconsax-react';
import stateImg from 'assets/Home/state.png';
import papersImg from 'assets/Home/papers.png';
import activityImg from 'assets/Home/activity.png';
import beneficiaryImg from 'assets/Home/beneficiary.png';
export default function NabtaNumbers({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) {
      setChecked(true);
    }
  }, [shouldAnimate]);

  const stats = [
    {
      id: 1,
      title: 'أكثر من 1,180,000',
      subtitle: 'طفل مُتعلم حول العالم استفاد من تطبيق لغتي العربية، ومحتوانا.',
      icon: beneficiaryImg
    },
    {
      id: 2,
      title: '420',
      subtitle: 'نشاط تفاعلي',
      icon: activityImg
    },
    {
      id: 3,
      title: '420',
      subtitle: 'ورقة مذاكرة وتلوين',
      icon: papersImg
    },
    {
      id: 4,
      title: '197',
      subtitle: 'دولة',
      icon: stateImg
    }
  ];

  return (
    <Fade in={checked} timeout={800}>
      <Box
        sx={{
          width: '100%',
          py: { xs: 6, md: 9 },
          backgroundColor: '#fff'
        }}
      >
        <Container maxWidth="lg">
          {/* Title */}
          <Box sx={{ textAlign: 'center', mb: { xs: 5, md: 7 } }}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                fontSize: { xs: '28px', sm: '34px', md: '42px' }
              }}
            >
              أثر منصة نبتة بالأرقام
            </Typography>
          </Box>

          {/* Stats */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' },
              gap: { xs: 3, sm: 4, md: 0 }
            }}
          >
            {stats.map((item, index) => (
              <Fade key={item.id} in={checked} timeout={800} style={{ transitionDelay: checked ? `${index * 120}ms` : '0ms' }}>
                <Box
                  sx={{
                    position: 'relative',
                    px: { xs: 2, sm: 3, md: 4 },
                    py: { xs: 3, md: 2 },
                    minHeight: { xs: 'auto', md: 300 },
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    textAlign: 'center',

                    // 🔥 Vertical divider
                    ...(index !== stats.length - 1 && {
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        top: '20%',
                        right: 0,
                        transform: 'translateX(-50%)',
                        width: '1px',
                        height: '60%',
                        backgroundColor: '#e0e0e0',
                        display: { xs: 'none', md: 'block' }
                      }
                    })
                  }}
                >
                  {/* Icon */}
                  <Box
                    sx={{
                      width: { xs: 80, sm: 100, md: 120 },
                      height: { xs: 80, sm: 100, md: 120 },
                      mb: 2
                    }}
                  >
                    <img src={item.icon} alt={item.title} style={{ width: '100%', height: '100%' }} />
                  </Box>

                  {/* Number */}
                  <Typography
                    variant="h1"
                    sx={{
                      fontWeight: 700,
                      color: '#000',
                      mb: 1
                    }}
                  >
                    {item.title}
                  </Typography>

                  {/* Subtitle */}
                  <Typography
                    sx={{
                      color: '#000',
                      fontSize: '18px',
                      maxWidth: item.id === 4 ? '280px' : '200px'
                    }}
                  >
                    {item.subtitle}
                  </Typography>
                </Box>
              </Fade>
            ))}
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
