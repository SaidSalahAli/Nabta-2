import React, { useState, useEffect, useRef } from 'react';
import { Box, Fade } from '@mui/material';
import img1 from 'assets/Home/Opinions_1.png';
import img2 from 'assets/Home/Opinions_2.png';
import img3 from 'assets/Home/Opinions_3.png';
import img4 from 'assets/Home/Opinions_4.png';
import img5 from 'assets/Home/Opinions_5.png';
import img6 from 'assets/Home/Opinions_6.png';
import img7 from 'assets/Home/Opinions_7.png';
import img8 from 'assets/Home/Opinions_8.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode, Autoplay } from 'swiper/modules';
import { KidSection, SectionHeading, NavArrow, Star, Flower, kidColors } from 'components/kids';

const reviews = [img1, img2, img3, img4, img5, img6, img7, img8].map((image, i) => ({ id: i + 1, image }));
const tilts = [-2, 1.5, -1, 2, -1.5, 1, -2, 1.5];

export default function PartnersReviews() {
  const [checked, setChecked] = useState(false);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node || typeof IntersectionObserver === 'undefined') {
      setChecked(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChecked(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setIsAtStart(swiperRef.current.isBeginning);
    setIsAtEnd(swiperRef.current.isEnd);
  };

  return (
    <KidSection
      bg={kidColors.berry}
      wave
      decorations={
        <>
          <Star size={30} sx={{ top: 60, insetInlineStart: '9%' }} />
          <Flower size={42} color={kidColors.sun} sx={{ bottom: 70, insetInlineEnd: '5%' }} />
        </>
      }
    >
      <Box ref={containerRef}>
        <SectionHeading
          tone="light"
          title="ماذا قالوا عنا؟"
          subtitle="آراء بعض شركائنا الاستراتيجيين من عملائنا الكرام في أعمالنا ومنتجاتنا الإبداعية التي نفخر بها."
        />

        <Fade in={checked} timeout={700}>
          <Box>
            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange();
              }}
              onSlideChange={handleSlideChange}
              autoplay={{ delay: 5000, disableOnInteraction: false, pauseOnMouseEnter: true }}
              slidesPerView={1.1}
              spaceBetween={24}
              freeMode
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 28 }
              }}
              modules={[FreeMode, Autoplay]}
              style={{ padding: '18px 8px 26px' }}
            >
              {reviews.map((review, index) => (
                <SwiperSlide key={review.id}>
                  <Box
                    sx={{
                      p: 1.25,
                      backgroundColor: '#fff',
                      borderRadius: '28px',
                      transform: `rotate(${tilts[index % tilts.length]}deg)`,
                      boxShadow: `0 10px 0 ${kidColors.berryDeep}`,
                      transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
                      '&:hover': { transform: 'rotate(0deg) scale(1.02)' }
                    }}
                  >
                    <Box
                      component="img"
                      src={review.image}
                      alt={`رأي شريك النجاح ${review.id}`}
                      loading="lazy"
                      sx={{ width: '100%', height: 'auto', maxHeight: 290, objectFit: 'contain', borderRadius: '20px', display: 'block' }}
                    />
                  </Box>
                </SwiperSlide>
              ))}
            </Swiper>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
              <NavArrow direction="prev" color={kidColors.berry} onClick={() => swiperRef.current?.slidePrev()} disabled={isAtStart} />
              <NavArrow direction="next" color={kidColors.berry} onClick={() => swiperRef.current?.slideNext()} disabled={isAtEnd} />
            </Box>
          </Box>
        </Fade>
      </Box>
    </KidSection>
  );
}
