import PropTypes from 'prop-types';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Logo from 'components/logo';
import { Youtube, Facebook, Instagram, ArrowUp } from 'iconsax-react';
import { Wave, Sprout, Flower, Star, crayon, kidColors, kidFont } from 'components/kids';

const TelegramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.636-1.291-1.294z" />
  </svg>
);

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

const linkSx = {
  fontFamily: kidFont,
  color: 'rgba(255,255,255,.82)',
  fontSize: 17,
  fontWeight: 600,
  textDecoration: 'none',
  cursor: 'pointer',
  background: 'none',
  border: 0,
  p: 0,
  textAlign: 'start',
  width: 'fit-content',
  transition: 'color .2s ease',
  '&:hover': { color: kidColors.sun },
  '&:focus-visible': { outline: `3px solid ${kidColors.sun}`, outlineOffset: 3, borderRadius: 4 }
};

const headSx = { fontFamily: kidFont, fontWeight: 800, fontSize: 19, color: '#fff', mb: 2 };

export default function FooterBlock({ isFull }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollLink = (sectionId) => {
    const scroll = () => {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      setTimeout(scroll, 300);
    } else {
      scroll();
    }
  };

  const socialLinks = [
    { icon: <Youtube variant="Bold" size={20} />, label: 'YouTube', href: 'https://www.youtube.com/@NabtaStudio' },
    { icon: <Instagram variant="Bold" size={20} />, label: 'Instagram', href: 'https://www.instagram.com/NabtaStudio' },
    { icon: <Facebook variant="Bold" size={20} />, label: 'Facebook', href: 'https://www.facebook.com/NabtaStudio' },
    { icon: <TelegramIcon />, label: 'Telegram', href: 'https://t.me/+201007560466' }
  ];

  const col1 = [
    { label: 'الرئيسية', to: '/' },
    { label: 'قصتنا', scrollTo: 'about-nabta' },
    { label: 'الأسئلة الشائعة', to: '/faq' },
    { label: 'تواصل معنا', to: '/contact' }
  ];

  const col2 = [
    { label: 'الحلقات', to: '/episodes' },
    { label: 'التطبيقات', to: '/applications' },
    { label: 'أوراق العمل', to: '/worksheets' }
  ];

  const col3 = [
    { label: 'المتجر', href: 'https://checkouts.kashier.io/ar/prepaymenpages?ppLink=PP-4195682401,live' },
    { label: 'كيف تدعمنا؟', to: '/support' }
  ];

  const renderLink = (item) => {
    if (item.scrollTo) {
      return (
        <Box key={item.label} component="button" type="button" onClick={() => handleScrollLink(item.scrollTo)} sx={linkSx}>
          {item.label}
        </Box>
      );
    }
    if (item.href) {
      return (
        <Box key={item.label} component="a" href={item.href} target="_blank" rel="noopener noreferrer" sx={linkSx}>
          {item.label}
        </Box>
      );
    }
    return (
      <Box key={item.label} component={RouterLink} to={item.to} sx={linkSx}>
        {item.label}
      </Box>
    );
  };

  return (
    <Box component="footer" sx={{ position: 'relative', mt: { xs: 4, md: 6 } }}>
      {/* the hill the garden grows on */}
      <Box sx={{ position: 'relative' }}>
        <Sprout size={54} sx={{ bottom: 18, insetInlineStart: '12%', display: { xs: 'none', sm: 'block' } }} />
        <Flower size={38} sx={{ bottom: 22, insetInlineStart: '19%', display: { xs: 'none', sm: 'block' } }} />
        <Sprout size={42} sx={{ bottom: 30, insetInlineEnd: '16%', display: { xs: 'none', sm: 'block' } }} />
        <Flower size={30} color={kidColors.sun} sx={{ bottom: 26, insetInlineEnd: '22%', display: { xs: 'none', sm: 'block' } }} />
        <Wave color={kidColors.ink} variant="hills" height={{ xs: 34, md: 70 }} sx={{ mb: '-1px' }} />
      </Box>

      <Box
        sx={{
          backgroundColor: kidColors.ink,
          pt: isFull ? 4 : { xs: 4, md: 6 },
          pb: { xs: 5, md: 6 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Star size={22} sx={{ top: 40, insetInlineEnd: '8%', opacity: 0.8 }} />
        <Star size={14} color={kidColors.coral} sx={{ top: 120, insetInlineEnd: '30%' }} />

        <Container maxWidth="lg">
          <Grid container spacing={{ xs: 4, md: 6 }}>
            <Grid size={{ xs: 12, md: 4 }}>
              <Stack gap={2.5} alignItems={{ xs: 'center', md: 'flex-start' }} textAlign={{ xs: 'center', md: 'start' }}>
                <Box
                  sx={{
                    backgroundColor: '#fff',
                    borderRadius: '24px',
                    px: 2,
                    py: 1.25,
                    transform: 'rotate(-2deg)',
                    boxShadow: `0 6px 0 ${kidColors.sun}`
                  }}
                >
                  <Logo to="/" width={120} />
                </Box>
                <Typography sx={{ fontFamily: kidFont, color: 'rgba(255,255,255,.78)', fontSize: 16, lineHeight: 1.9, maxWidth: 320 }}>
                  تربية تعلّم... وتعليم يربّي. محتوى تربوي تعليمي للأطفال، ودعم للأمهات والآباء.
                </Typography>
                <Stack direction="row" gap={1.25} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
                  {socialLinks.map(({ icon, label, href }, i) => {
                    const c = crayon(i);
                    return (
                      <Tooltip key={label} title={label}>
                        <IconButton
                          component="a"
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={label}
                          sx={{
                            width: 46,
                            height: 46,
                            borderRadius: '16px',
                            color: c.text,
                            backgroundColor: c.main,
                            boxShadow: `0 4px 0 ${c.deep}`,
                            transition: 'transform .2s cubic-bezier(.34,1.56,.64,1)',
                            '&:hover': { backgroundColor: c.main, transform: 'translateY(-3px) rotate(-6deg)' }
                          }}
                        >
                          {icon}
                        </IconButton>
                      </Tooltip>
                    );
                  })}
                </Stack>
              </Stack>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 'grow' }}>
              <Typography component="h2" sx={headSx}>
                روابط سريعة
              </Typography>
              <Stack gap={1.5}>{col1.map(renderLink)}</Stack>
            </Grid>

            <Grid size={{ xs: 6, sm: 4, md: 'grow' }}>
              <Typography component="h2" sx={headSx}>
                محتوى نبتة
              </Typography>
              <Stack gap={1.5}>{col2.map(renderLink)}</Stack>
            </Grid>

            <Grid size={{ xs: 12, sm: 4, md: 'grow' }}>
              <Typography component="h2" sx={headSx}>
                ساندنا
              </Typography>
              <Stack gap={1.5} direction={{ xs: 'row', sm: 'column' }} sx={{ columnGap: 3 }}>
                {col3.map(renderLink)}
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 2, backgroundColor: '#161E33' }}>
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 1.5
            }}
          >
            <Typography sx={{ fontFamily: kidFont, color: 'rgba(255,255,255,.65)', fontSize: 14 }}>
              جميع الحقوق محفوظة منصة نبتة 2026
            </Typography>

            <Stack direction="row" gap={3}>
              {[
                { label: 'الشروط والأحكام', to: '/terms' },
                { label: 'سياسة الخصوصية', to: '/privacy' }
              ].map((l) => (
                <Box key={l.label} component={RouterLink} to={l.to} sx={{ ...linkSx, fontSize: 14, color: 'rgba(255,255,255,.65)' }}>
                  {l.label}
                </Box>
              ))}
            </Stack>

            <Tooltip title="للأعلى">
              <IconButton
                onClick={scrollToTop}
                aria-label="العودة للأعلى"
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '14px',
                  backgroundColor: kidColors.sun,
                  color: kidColors.ink,
                  boxShadow: `0 4px 0 ${kidColors.sunDeep}`,
                  '&:hover': { backgroundColor: kidColors.sun, transform: 'translateY(-3px)' },
                  transition: 'transform .2s ease'
                }}
              >
                <ArrowUp size={20} color={kidColors.ink} />
              </IconButton>
            </Tooltip>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

FooterBlock.propTypes = { isFull: PropTypes.bool };
