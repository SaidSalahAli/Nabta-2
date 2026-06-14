import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { motion } from 'framer-motion';
import Logo from 'components/logo';
import { Youtube, Facebook, Instagram, Send2, ArrowUp } from 'iconsax-react';

/* ── Custom SVG icons for platforms not in iconsax ── */
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.28a8.18 8.18 0 004.78 1.52V7.35a4.85 4.85 0 01-1.01-.66z" />
  </svg>
);

const TwitterXIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ─────────────────────────────────────── */

const FooterLink = styled(Link)(({ theme }) => ({
  color: theme.palette.text.secondary,
  fontSize: 15,
  fontWeight: 400,
  textDecoration: 'none',
  opacity: 0.75,
  transition: 'opacity 0.2s, color 0.2s',
  '&:hover': {
    opacity: 1,
    color: theme.palette.primary.main
  }
}));

const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

export default function FooterBlock({ isFull }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleScrollLink = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 300);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const socialLinks = [
    // { icon: <WhatsAppIcon />, label: 'WhatsApp', href: 'https://wa.me/201007560466' },
    { icon: <Youtube variant="Bold" size={18} />, label: 'YouTube', href: 'https://www.youtube.com/@NabtaStudio' },
    { icon: <Instagram variant="Bold" size={18} />, label: 'Instagram', href: 'https://www.instagram.com/NabtaStudio' },
    { icon: <Facebook variant="Bold" size={18} />, label: 'Facebook', href: 'https://www.facebook.com/NabtaStudio' },
    { icon: <TwitterXIcon />, label: 'Twitter / X', href: 'https://twitter.com/NabtaStudio' },
  ];

  const col1 = [
    { label: 'الرئيسية', to: '/' },
    { label: 'قصتنا', scrollTo: 'about-nabta' },
    { label: 'الأسئلة الشائعة', to: '/faq' },
    { label: 'تواصل معنا', to: '/contact' }
  ];

  const col2 = [
    { label: 'المتجر', href: 'https://checkouts.kashier.io/ar/prepaymenpages?ppLink=PP-4195682401,live', external: true },
    { label: 'كيف تدعمنا؟', href: '/support', external: false }
  ];

  return (
    <>
      {/* ===== MAIN FOOTER ===== */}
      <Box
        sx={{
          pt: isFull ? 5 : 8,
          pb: 6,
          bgcolor: 'background.paper',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container>
          <Grid container spacing={4} alignItems="center">
            {/* RIGHT: Nav columns */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={4}>
                {/* Column 1 — روابط */}
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack gap={2.5}>
                    {col1.map(({ label, to, scrollTo }) =>
                      scrollTo ? (
                        <FooterLink
                          key={label}
                          component="span"
                          onClick={() => handleScrollLink(scrollTo)}
                          underline="none"
                          sx={{ cursor: 'pointer' }}
                        >
                          {label}
                        </FooterLink>
                      ) : (
                        <FooterLink key={label} component={RouterLink} to={to} underline="none">
                          {label}
                        </FooterLink>
                      )
                    )}
                  </Stack>
                </Grid>

                {/* Column 2 — خدمات */}
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack gap={2.5}>
                    {col2.map(({ label, href, external }) =>
                      external ? (
                        <FooterLink
                          key={label}
                          href={href}
                          underline="none"
                        >
                          {label}
                        </FooterLink>
                      ) : (
                        <FooterLink
                          key={label}
                          component={RouterLink}
                          to={href}
                          underline="none"
                        >
                          {label}
                        </FooterLink>
                      )
                    )}
                  </Stack>
                </Grid>
              </Grid>
            </Grid>

            {/* LEFT: Logo + Social Icons */}
            <Grid size={{ xs: 12, md: 4 }}>
              <motion.div
                initial={{ opacity: 0, translateY: 30 }}
                animate={{ opacity: 1, translateY: 0 }}
                transition={{ type: 'spring', stiffness: 150, damping: 30 }}
              >
                <Stack gap={3} alignItems={{ xs: 'center', md: 'center' }}>
                  <Logo to="/" width={140} />

                  {/* Social Icons — Row 1 */}
                  <Box>
                    <Stack direction="row" gap={1} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-end' }}>
                      {socialLinks.map(({ icon, label, href }) => (
                        <Tooltip key={label} title={label}>
                          <IconButton
                            component={Link}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            size="small"
                            sx={{
                              border: '1px solid',
                              borderColor: 'divider',
                              borderRadius: '50%',
                              width: 36,
                              height: 36,
                              color: 'text.secondary',
                              transition: 'all 0.2s',
                              '&:hover': {
                                color: 'primary.main',
                                borderColor: 'primary.main',
                                bgcolor: 'action.hover'
                              }
                            }}
                          >
                            {icon}
                          </IconButton>
                        </Tooltip>
                      ))}
                    </Stack>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ===== BOTTOM BAR ===== */}
      <Box
        sx={{
          py: 2,
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'secondary.200'
        }}
      >
        <Container>
          <Grid
            container
            spacing={2}
            alignItems="center"
            sx={{
              flexDirection: { xs: 'column', sm: 'row' },
              textAlign: { xs: 'center', sm: 'inherit' }
            }}
          >
            {/* Right: Copyright */}
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-start' } }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.7, fontSize: 13 }}>
                جميع الحقوق محفوظة منصة نبتة 2026
              </Typography>
            </Grid>

            {/* Center: Legal Links */}
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: 'center' }}>
              <Stack direction="row" gap={3}>
                {[
                  { label: 'الشروط والأحكام', href: '/terms' },
                  { label: 'سياسة الخصوصية', href: '/privacy' }
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    component={RouterLink}
                    to={href}
                    underline="always"
                    sx={{
                      fontSize: 13,
                      color: 'text.secondary',
                      opacity: 0.7,
                      '&:hover': { opacity: 1, color: 'primary.main' }
                    }}
                  >
                    {label}
                  </Link>
                ))}
              </Stack>
            </Grid>

            {/* Left: Scroll to top */}
            <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
              <Tooltip title="للأعلى">
                <IconButton
                  onClick={scrollToTop}
                  size="small"
                  sx={{
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1.5,
                    width: 36,
                    height: 36,
                    color: 'text.secondary',
                    '&:hover': { color: 'primary.main', borderColor: 'primary.main', bgcolor: 'action.hover' }
                  }}
                >
                  <ArrowUp size={18} />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}

FooterBlock.propTypes = { isFull: PropTypes.bool };
