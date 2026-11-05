import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { FreeMode } from 'swiper/modules';
import img1 from 'assets/Home/ahmed.jpg';
import img2 from 'assets/Home/hamdy.jpg';
import img3 from 'assets/Home/magdy.jpg';
import img4 from 'assets/Home/team0004.png';
import { KidSection, SectionHeading, NavArrow, Star, crayon, kidColors, kidFont } from 'components/kids';

const members = [
  { id: 1, name: 'حمدي محمود', role: 'مؤسس منصة نبتة', image: img2 },
  { id: 2, name: 'أحمد سمير', role: 'مطور تطبيقات', image: img1 },
  { id: 3, name: 'مجدي غباشي', role: 'مطور باك اند', image: img3 },
  { id: 4, name: 'مروة خيري', role: 'محركة', image: img4 }
];

const blobs = [
  '58% 42% 48% 52% / 52% 48% 52% 48%',
  '45% 55% 60% 40% / 50% 45% 55% 50%',
  '50% 50% 42% 58% / 58% 50% 50% 42%',
  '42% 58% 52% 48% / 46% 54% 46% 54%'
];

export default function Team({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);
  const swiperRef = useRef(null);
  const [isAtStart, setIsAtStart] = useState(true);
  const [isAtEnd, setIsAtEnd] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  const handleSlideChange = () => {
    if (!swiperRef.current) return;
    setIsAtStart(swiperRef.current.isBeginning);
    setIsAtEnd(swiperRef.current.isEnd);
  };

  return (
    <KidSection bg={kidColors.cloud} wave decorations={<Star size={28} sx={{ top: 70, insetInlineEnd: '12%' }} />}>
      <SectionHeading
        title="فريق منصة نبتة"
        subtitle="فريق منصة نبتة يعمل بحُب لإيمانه بأنه أساس لنجاح نفخر به، وبينه تجانس وشعور بالمسؤولية تجاه أطفالنا الأحباء، لذلك يسعى بكل جهد ومثابرة لإخراج محتوى مفيد ونافع يحبه الأطفال."
      />

      <Fade in={checked} timeout={700}>
        <Box>
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
              handleSlideChange();
            }}
            onSlideChange={handleSlideChange}
            slidesPerView={1.2}
            spaceBetween={20}
            freeMode
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
              1280: { slidesPerView: 4, spaceBetween: 28 }
            }}
            modules={[FreeMode]}
            style={{ padding: '8px 6px 20px' }}
          >
            {members.map((member, index) => {
              const c = crayon(index);
              return (
                <SwiperSlide key={member.id} style={{ height: 'auto' }}>
                  <Box
                    sx={{
                      height: '100%',
                      backgroundColor: '#fff',
                      borderRadius: '30px',
                      boxShadow: `0 8px 0 ${c.main}40`,
                      border: `3px solid ${kidColors.ink}10`,
                      p: 2.5,
                      textAlign: 'center',
                      '&:hover .member-photo': { transform: 'rotate(-3deg) scale(1.03)' }
                    }}
                  >
                    <Box
                      sx={{
                        width: { xs: 170, md: 180 },
                        height: { xs: 170, md: 180 },
                        mx: 'auto',
                        mb: 2,
                        p: '6px',
                        backgroundColor: c.main,
                        borderRadius: blobs[index % blobs.length]
                      }}
                    >
                      <Box
                        className="member-photo"
                        component="img"
                        src={member.image}
                        alt={member.name}
                        loading="lazy"
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          borderRadius: blobs[index % blobs.length],
                          display: 'block',
                          transition: 'transform .35s cubic-bezier(.34,1.56,.64,1)'
                        }}
                      />
                    </Box>
                    <Typography
                      component="h3"
                      sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.35rem', color: kidColors.ink, mb: 0.75 }}
                    >
                      {member.name}
                    </Typography>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        fontFamily: kidFont,
                        fontWeight: 700,
                        fontSize: '0.98rem',
                        color: kidColors.ink,
                        backgroundColor: c.soft,
                        borderRadius: '999px',
                        px: 1.75,
                        py: 0.25
                      }}
                    >
                      {member.role}
                    </Box>
                  </Box>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <NavArrow direction="prev" onClick={() => swiperRef.current?.slidePrev()} disabled={isAtStart} />
            <NavArrow direction="next" onClick={() => swiperRef.current?.slideNext()} disabled={isAtEnd} />
          </Box>
        </Box>
      </Fade>
    </KidSection>
  );
}
