import React, { useState, useEffect } from 'react';
import { Box, Fade } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import slider1 from 'assets/Home/slider_1.svg';
import slider2 from 'assets/Home/slider_2.svg';
import slider3 from 'assets/Home/slider_3.svg';
import slider4 from 'assets/Home/slider_4.svg';
import { Wave, kidColors } from 'components/kids';

const heroSlides = [slider1, slider2, slider3, slider4];

export default function Hero({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <Fade in={checked} timeout={700}>
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          backgroundColor: kidColors.sky,

          '& .swiper-pagination': {
            bottom: { xs: '16px !important', md: '30px !important' },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px'
          },
          '& .swiper-pagination-bullet': {
            backgroundColor: '#fff',
            width: 14,
            height: 14,
            borderRadius: '999px',
            opacity: 1,
            margin: '0 !important',
            border: `3px solid ${kidColors.ink}26`,
            transition: 'width .35s ease, background-color .35s ease'
          },
          '& .swiper-pagination-bullet-active': {
            backgroundColor: kidColors.sun,
            width: 40,
            borderColor: kidColors.sunDeep
          }
        }}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          loop
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
          modules={[Pagination, Autoplay]}
          style={{ width: '100%' }}
        >
          {heroSlides.map((slide, index) => (
            <SwiperSlide key={index}>
              <Box sx={{ width: '100%', height: { xs: 250, sm: 380, md: 680 }, overflow: 'hidden' }}>
                <Box
                  component="img"
                  src={slide}
                  alt={`منصة نبتة - شريحة ${index + 1}`}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  decoding="async"
                  fetchPriority={index === 0 ? 'high' : 'low'}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* hills melting into the page */}
        {/* pushed below the slide (into the same-colored next section) so it doesn't cover text in the images */}
        <Box sx={{ position: 'absolute', left: 0, right: 0, bottom: { xs: -16, md: -40 }, zIndex: 2, pointerEvents: 'none' }}>
          <Wave color={kidColors.cloud} variant="hills" height={{ xs: 28, md: 64 }} />
        </Box>
      </Box>
    </Fade>
  );
}
