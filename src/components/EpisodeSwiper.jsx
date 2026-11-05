import React, { useRef } from 'react';
import { Box } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, FreeMode } from 'swiper/modules';
import EpisodeCard from './EpisodeCard';
import { NavArrow } from 'components/kids';

export default function EpisodeSwiper({ episodes, isAnimating, onCardClick }) {
  const swiperRef = useRef(null);
  const [isAtStart, setIsAtStart] = React.useState(true);
  const [isAtEnd, setIsAtEnd] = React.useState(false);

  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setIsAtStart(swiperRef.current.isBeginning);
    setIsAtEnd(swiperRef.current.isEnd);
  };

  return (
    <Box>
      <Swiper
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          handleSlideChange();
        }}
        onSlideChange={handleSlideChange}
        onReachEnd={handleSlideChange}
        onReachBeginning={handleSlideChange}
        slidesPerView={1.1}
        spaceBetween={20}
        freeMode={true}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 24 },
          1024: { slidesPerView: 3, spaceBetween: 28 }
        }}
        modules={[Pagination, FreeMode]}
        style={{ padding: '6px 6px 22px' }}
      >
        {episodes.map((episode, index) => (
          <SwiperSlide key={episode.id} style={{ height: 'auto' }}>
            <EpisodeCard episode={episode} isAnimating={isAnimating} index={index} onClick={() => onCardClick && onCardClick(episode)} />
          </SwiperSlide>
        ))}
      </Swiper>

      {episodes.length > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <NavArrow direction="prev" onClick={() => swiperRef.current?.slidePrev()} disabled={isAtStart} />
          <NavArrow direction="next" onClick={() => swiperRef.current?.slideNext()} disabled={isAtEnd} />
        </Box>
      )}
    </Box>
  );
}
