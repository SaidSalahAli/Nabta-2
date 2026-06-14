import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Fade, IconButton, Card, CardMedia } from '@mui/material';
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
import 'swiper/css/pagination';
import { Pagination, FreeMode, Autoplay } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'iconsax-react';

export default function PartnersReviews() {
  const [checked, setChecked] = useState(false);
  const swiperRef = useRef(null);
  const containerRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setChecked(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  const episodes = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 },
    { id: 6, image: img6 },
    { id: 7, image: img7 },
    { id: 8, image: img8 }
  ];

  // Card image height + half card total height ≈ centers arrow on image area
  const CARD_IMAGE_HEIGHT = 290;

  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setIsAtStart(swiperRef.current.isBeginning);
    setIsAtEnd(swiperRef.current.isEnd);
  };

  const handleNextSlide = () => {
    if (!isAtEnd) {
      swiperRef.current?.slideNext();
    }
  };

  const handlePrevSlide = () => {
    if (!isAtStart) {
      swiperRef.current?.slidePrev();
    }
  };

  return (
    <Fade in={checked} timeout={800}>
      <Box
        ref={containerRef}
        sx={{
          py: { xs: 6, md: 8 },
          width: '100%',
          backgroundColor: '#a4257b'
        }}
      >
        <Container maxWidth="lg">
          {/* Title Section */}
          <Box sx={{ mb: 5, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, color: '#fff', mb: 2 }}>
              ماذا قالوا عنا؟
            </Typography>
            <Typography variant="body2" sx={{ color: '#fff', fontSize: '18px', mb: 1, lineHeight: 1.6 }}>
              أراء بعض من شركاؤنا الاستراتيجيين من عملائنا الكرام في أعمالنا ومنتجاتنا الإبداعية والتي نفخر بها.
            </Typography>
          </Box>

          {/* Reviews Swiper */}
          <Box
            sx={{
              position: 'relative',
              px: '48px', // make room for arrows on both sides
              '& .swiper-pagination-bullet': {
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                width: 8,
                height: 8,
                opacity: 0.5,
                borderRadius: '50%'
              },
              '& .swiper-pagination-bullet-active': {
                backgroundColor: '#FFD666',
                opacity: 1
              },
              '& .swiper-pagination': {
                bottom: '-35px !important',
                position: 'relative'
              }
            }}
          >
            {/* LEFT arrow — goes to next (in RTL this is "forward") */}
            <IconButton
              onClick={handleNextSlide}
              disabled={isAtEnd}
              sx={{
                position: 'absolute',
                right: 0,
                top: `${CARD_IMAGE_HEIGHT / 2}px`,
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 40,
                height: 40,
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                borderRadius: '50%',
                border: 'none',
                cursor: isAtEnd ? 'not-allowed' : 'pointer',
                '&:hover': {
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                '&.Mui-disabled': {
                  bgcolor: '#fff !important',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12) !important',
                  opacity: '1 !important',
                  '& svg': {
                    opacity: 0.4
                  }
                },
                '& svg path': {
                  strokeWidth: '3.5px !important'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={30} color="#0088CC" />
            </IconButton>

            {/* RIGHT arrow — goes to prev */}
            <IconButton
              onClick={handlePrevSlide}
              disabled={isAtStart}
              sx={{
                position: 'absolute',
                left: 0,
                top: `${CARD_IMAGE_HEIGHT / 2}px`,
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: 40,
                height: 40,
                borderRadius: '50%',
                bgcolor: '#fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.12)',
                border: 'none',
                cursor: isAtStart ? 'not-allowed' : 'pointer',
                '&:hover': {
                  backgroundColor: '#fff',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
                },
                '&.Mui-disabled': {
                  bgcolor: '#fff !important',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.12) !important',
                  opacity: '1 !important',
                  '& svg': {
                    opacity: 0.4
                  }
                },
                '& svg path': {
                  strokeWidth: '3.5px !important'
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowRight size={30} color="#0088CC" />
            </IconButton>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange();
              }}
              autoplay={{ delay: 5000, disableOnInteraction: false }}
              onSlideChange={handleSlideChange}
              slidesPerView={1}
              spaceBetween={24}
              freeMode={true}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 24 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 3, spaceBetween: 24 }
              }}
              modules={[Pagination, FreeMode, Autoplay]}
              style={{ padding: '10px 0 20px 0' }}
            >
              {episodes.map((episode, index) => (
                <SwiperSlide key={episode.id}>
                  <Fade in={checked} timeout={800} style={{ transitionDelay: checked ? `${index * 100}ms` : '0ms' }}>
                    <Card
                      sx={{
                        borderRadius: '16px',
                        overflow: 'hidden',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          boxShadow: '0 12px 32px rgba(0,0,0,0.12)',
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          position: 'relative',
                          overflow: 'hidden',
                          backgroundColor: '#fff',
                          p: 1,
                          display: 'flex',
                          justifyContent: 'center'
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={episode.image}
                          alt={`رأي وتجربة شريك النجاح ${episode.id}`}
                          sx={{
                            width: '100%',
                            height: 'auto',
                            maxHeight: '280px',
                            objectFit: 'contain',
                            borderRadius: '12px'
                          }}
                        />
                      </Box>
                    </Card>
                  </Fade>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}
