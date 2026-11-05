import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Wave from './Wave';
import { Cloud, Star, Sprout, SproutLine } from './Doodles';
import { kidColors, kidType } from './tokens';

const tones = {
  sky: { bg: kidColors.skyDeep, line: kidColors.sun },
  berry: { bg: kidColors.berry, line: kidColors.sun },
  leaf: { bg: '#2F7D36', line: kidColors.sun }
};

/**
 * Inner-page header: a sky band with clouds, a big title and an optional picture in a tilted sticker frame.
 * Ends with a hill that melts into the page background.
 */
export default function PageHero({ title, description, image, imageAlt, crumbs, tone = 'sky', bottomColor = kidColors.cloud, children }) {
  const t = tones[tone] || tones.sky;

  return (
    <Box component="header" sx={{ position: 'relative', backgroundColor: t.bg, overflow: 'hidden', color: '#fff' }}>
      <Cloud size={170} color="rgba(255,255,255,.16)" sx={{ top: 28, insetInlineStart: '4%' }} />
      <Cloud size={110} color="rgba(255,255,255,.12)" sx={{ top: 120, insetInlineEnd: '6%' }} />
      <Star size={30} sx={{ top: 40, insetInlineEnd: '38%' }} />
      <Star size={18} sx={{ bottom: 90, insetInlineStart: '30%' }} />
      <Sprout size={64} sx={{ bottom: 36, insetInlineEnd: '3%', display: { xs: 'none', lg: 'block' } }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2, pt: { xs: 5, md: 7 }, pb: { xs: 5, md: 6 } }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: { xs: 4, md: 6 }
          }}
        >
          <Box sx={{ flex: 1, minWidth: 0, textAlign: { xs: 'center', md: 'start' } }}>
            {crumbs?.length > 0 && (
              <Box
                component="nav"
                aria-label="مسار الصفحة"
                sx={{
                  display: 'inline-flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 1,
                  mb: 2,
                  px: 2,
                  py: 0.5,
                  borderRadius: '999px',
                  backgroundColor: 'rgba(255,255,255,.18)',
                  fontWeight: 700,
                  fontSize: '0.98rem'
                }}
              >
                {crumbs.map((c, i) => (
                  <Box key={`${c.label}-${i}`} component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
                    {i > 0 && (
                      <Box component="span" aria-hidden="true" sx={{ opacity: 0.7 }}>
                        ‹
                      </Box>
                    )}
                    {c.to ? (
                      <Box
                        component={RouterLink}
                        to={c.to}
                        sx={{ color: '#fff', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                      >
                        {c.label}
                      </Box>
                    ) : (
                      <Box
                        component="span"
                        sx={{ opacity: 0.9, maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}
                      >
                        {c.label}
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>
            )}

            <Typography component="h1" sx={{ ...kidType.display, color: '#fff', m: 0 }}>
              {title}
            </Typography>
            <SproutLine color={t.line} width={{ xs: 130, md: 170 }} sx={{ mx: { xs: 'auto', md: 0 }, mt: 1.5 }} />

            {description && (
              <Typography sx={{ ...kidType.body, color: 'rgba(255,255,255,.94)', mt: 2.5, maxWidth: 640, mx: { xs: 'auto', md: 0 } }}>
                {description}
              </Typography>
            )}
            {children && <Box sx={{ mt: 3 }}>{children}</Box>}
          </Box>

          {image && (
            <Box
              sx={{
                width: { xs: '86%', sm: 360, md: 380 },
                flexShrink: 0,
                p: 1.25,
                backgroundColor: '#fff',
                borderRadius: '30px',
                transform: 'rotate(-2.5deg)',
                boxShadow: `0 12px 0 rgba(0,0,0,.14)`
              }}
            >
              <Box
                component="img"
                src={image}
                alt={imageAlt || ''}
                sx={{
                  display: 'block',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  objectFit: 'cover',
                  borderRadius: '22px',
                  backgroundColor: kidColors.skySoft
                }}
              />
            </Box>
          )}
        </Box>
      </Container>

      <Wave color={bottomColor} variant="hills" sx={{ position: 'relative', zIndex: 1, mb: '-1px' }} />
    </Box>
  );
}

PageHero.propTypes = {
  title: PropTypes.node,
  description: PropTypes.node,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  crumbs: PropTypes.array,
  tone: PropTypes.oneOf(['sky', 'berry', 'leaf']),
  bottomColor: PropTypes.string,
  children: PropTypes.node
};
