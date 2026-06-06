import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Container, Fade, IconButton, Card, CardMedia, CardContent } from '@mui/material';
import img1 from 'assets/Home/Opinions_1.png';
import img2 from 'assets/Home/Opinions_2.png';
import img3 from 'assets/Home/Opinions_3.png';
import img4 from 'assets/Home/Opinions_4.png';
import img5 from 'assets/Home/Opinions_5.png';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, FreeMode } from 'swiper/modules';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import EpisodeCard from '../../../../../components/EpisodeCard';
// import EpisodeCard from './EpisodeCard';
// import imgbg from 'assets/images/test2.png';
export default function PartnersReviews({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);
  const swiperRef = useRef(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);
  useEffect(() => {
    if (shouldAnimate) {
      setChecked(true);
    }
  }, [shouldAnimate]);

  const episodes = [
    { id: 1, image: img1 },
    { id: 2, image: img2 },
    { id: 3, image: img3 },
    { id: 4, image: img4 },
    { id: 5, image: img5 }
  ];

  // Card image height + half card total height ≈ centers arrow on image area
  const CARD_IMAGE_HEIGHT = 250;

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
        sx={{
          py: 4,
          width: '100%'
          // backgroundColor: '#aeedd9'
          // backgroundImage: `url(${imgbg})`,
          //   backgroundSize: 'cover',
          //   backgroundPosition: 'center'
        }}
      >
        <Container maxWidth="lg">
          {/* Title Section */}
          <Box sx={{ mb: 4, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 700, color: 'primary.main', mb: 1 }}>
              ماذا قالوا عنا؟
            </Typography>
            <Typography variant="body2" sx={{ color: '#000', fontSize: '18px' }}>
              أراء بعض من شركاؤنا الاستراتيجيين من عمًلئنا الكرام في أعمالنا ومنتجاتنا اإلبداعية والتي نفخر بها{' '}
            </Typography>
          </Box>

          {/* Episodes Swiper */}
          <Box
            sx={{
              position: 'relative',
              px: '48px', // make room for arrows on both sides
              '& .swiper-pagination-bullet': {
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                width: 8,
                height: 8,
                opacity: 0.5,
                borderRadius: '50%'
              },
              '& .swiper-pagination-bullet-active': {
                backgroundColor: '#0088CC',
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
                bgcolor: isAtEnd ? 'action.disabledBackground' : 'background.paper',
                boxShadow: isAtEnd ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
                borderRadius: '50%',
                border: '1px solid',
                borderColor: isAtEnd ? 'action.disabled' : 'divider',
                opacity: isAtEnd ? 0.5 : 1,
                cursor: isAtEnd ? 'not-allowed' : 'pointer',
                '&:hover': {
                  borderColor: isAtEnd ? 'action.disabled' : 'primary.main',
                  backgroundColor: isAtEnd ? 'action.disabledBackground' : 'background.paper',
                  '& svg': { color: isAtEnd ? '#999' : '#fff' }
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowLeft size={20} color={isAtEnd ? '#ccc' : '#0088CC'} />
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
                bgcolor: isAtStart ? 'action.disabledBackground' : 'background.paper',
                boxShadow: isAtStart ? 'none' : '0 2px 8px rgba(0,0,0,0.15)',
                border: '1px solid',
                borderColor: isAtStart ? 'action.disabled' : 'divider',
                opacity: isAtStart ? 0.5 : 1,
                cursor: isAtStart ? 'not-allowed' : 'pointer',
                '&:hover': {
                  borderColor: isAtStart ? 'action.disabled' : 'primary.main',
                  backgroundColor: isAtStart ? 'action.disabledBackground' : 'background.paper',
                  '& svg': { color: isAtStart ? '#999' : '#fff' }
                },
                transition: 'all 0.2s ease'
              }}
            >
              <ArrowRight size={20} color={isAtStart ? '#ccc' : '#0088CC'} />
            </IconButton>

            <Swiper
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
                handleSlideChange();
              }}
              onSlideChange={handleSlideChange}
              slidesPerView={1}
              spaceBetween={20}
              freeMode={true}
              breakpoints={{
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 20 },
                1280: { slidesPerView: 3, spaceBetween: 20 }
              }}
              modules={[Pagination, FreeMode]}
              style={{ padding: '10px 0 20px 0' }}
            >
              {episodes.map((episode, index) => (
                <SwiperSlide key={episode.id}>
                  <Fade in={checked} timeout={800} style={{ transitionDelay: checked ? `${index * 100}ms` : '0ms' }}>
                    <Card
                      // onClick={onClick}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      sx={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                        transition: 'all 0.3s ease',
                        cursor: 'pointer',
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        '&:hover': {
                          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                          transform: 'translateY(-4px)'
                        }
                      }}
                    >
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height="180"
                          image={episode.image}
                          alt={episode.title}
                          sx={{
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease',
                            '&:hover': { transform: 'scale(1.05)' }
                          }}
                        />
                      </Box>
                      {/* Content Section */}
                      {episode.title && (
                        <CardContent
                          sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            p: 2
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Typography
                              variant="subtitle2"
                              sx={{
                                fontWeight: 600,
                                color: 'primary.main',
                                lineHeight: 1.4,
                                minHeight: '40px',
                                fontSize: '18px',
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >
                              {episode.title}
                            </Typography>
                            {episode.watch && (
                              <Typography
                                variant="subtitle2"
                                sx={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'end',
                                  fontSize: '18px',
                                  fontWeight: 600,
                                  color: 'white',
                                  textAlign: 'center',
                                  width: 'fit-content',
                                  px: 2,
                                  backgroundColor: 'primary.main',
                                  borderRadius: '10px',
                                  cursor: 'pointer',
                                  transition: 'all 0.3s ease'
                                  // '&:hover': { color: '#006699' }
                                }}
                              >
                                {episode.watch}
                              </Typography>
                            )}
                          </Box>
                        </CardContent>
                      )}
                    </Card>
                  </Fade>{' '}
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
          {/* View All Link */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              cursor: 'pointer',
              '&:hover': { '& .view-all-text': { color: '#006699' } }
            }}
          ></Box>
        </Container>
      </Box>
    </Fade>
  );
}
