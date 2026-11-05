import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import { crayon, kidColors, kidFont, stickerCard } from 'components/kids';

export default function EpisodeCard({ episode, isAnimating, index = 0, onClick }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const c = crayon(index);

  useEffect(() => {
    if (isAnimating) {
      setIsVisible(true);
      return;
    }

    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [isAnimating]);

  const handleKey = (e) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Box ref={ref} sx={{ height: '100%', pt: 1 }}>
      <Fade in={isVisible} timeout={600} style={{ transitionDelay: isVisible ? `${(index % 6) * 70}ms` : '0ms' }}>
        <Box
          role="button"
          tabIndex={0}
          aria-label={`${episode.watch || 'افتح'}: ${episode.title}`}
          onClick={onClick}
          onKeyDown={handleKey}
          sx={{
            ...stickerCard(c.main),
            cursor: 'pointer',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: 1.25,
            outline: 'none',
            '&:focus-visible': { boxShadow: `0 0 0 4px ${kidColors.sky}66, 0 8px 0 ${c.main}33` },
            '&:hover .ep-thumb img': { transform: 'scale(1.05)' },
            '&:hover .ep-action': { transform: 'scale(1.06) rotate(-3deg)' }
          }}
        >
          <Box
            className="ep-thumb"
            sx={{
              position: 'relative',
              overflow: 'hidden',
              width: '100%',
              aspectRatio: '16 / 9',
              borderRadius: '20px',
              backgroundColor: c.soft
            }}
          >
            <Box
              component="img"
              src={episode.image}
              alt=""
              loading="lazy"
              decoding="async"
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                display: 'block',
                transition: 'transform .4s ease'
              }}
            />
          </Box>

          <Box
            sx={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5,
              px: 1,
              pt: 1.75,
              pb: 0.75
            }}
          >
            <Typography
              component="h3"
              sx={{
                fontFamily: kidFont,
                fontWeight: 800,
                color: kidColors.ink,
                fontSize: { xs: '1.15rem', md: '1.25rem' },
                lineHeight: 1.45,
                m: 0,
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}
            >
              {episode.title}
            </Typography>

            {episode.watch && (
              <Box
                className="ep-action"
                aria-hidden="true"
                sx={{
                  flexShrink: 0,
                  fontFamily: kidFont,
                  fontWeight: 800,
                  fontSize: '1rem',
                  color: c.text,
                  backgroundColor: c.main,
                  borderRadius: '999px',
                  px: 2,
                  py: 0.5,
                  boxShadow: `0 4px 0 ${c.deep}`,
                  transition: 'transform .2s cubic-bezier(.34,1.56,.64,1)',
                  whiteSpace: 'nowrap'
                }}
              >
                {episode.watch}
              </Box>
            )}
          </Box>
        </Box>
      </Fade>
    </Box>
  );
}
