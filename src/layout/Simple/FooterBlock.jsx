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

const PinterestIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z" />
  </svg>
);

const SnapchatIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.166.004c.006 0 .012-.004.019-.004h.032c1.354.007 5.694.445 7.438 5.065.47 1.249.355 3.359.268 5.022-.013.23-.025.451-.034.659.223.112.522.212.876.16a1.76 1.76 0 00.606-.204.746.746 0 01.34-.092.802.802 0 01.278.049.73.73 0 01.489.671c0 .44-.374.773-.718.944-.072.036-.151.072-.236.108-.344.151-.816.359-1.067.793-.066.113-.066.211-.012.336.18.422.713 1.699 1.977 2.164.257.093.415.338.383.607-.018.155-.097.289-.224.38a6.085 6.085 0 01-1.013.534c-.23.097-.437.182-.539.269-.171.14-.204.289-.257.52-.054.231-.121.521-.33.783a1.624 1.624 0 01-1.202.563c-.208 0-.42-.039-.637-.077a5.48 5.48 0 00-.923-.115c-.26 0-.497.037-.752.079-.427.07-.91.147-1.589.147-.648 0-1.161-.095-1.584-.175-.251-.048-.483-.09-.724-.09-.307 0-.613.062-.906.115-.216.041-.428.081-.64.081-.501 0-.909-.196-1.163-.569-.211-.305-.279-.623-.333-.889-.05-.237-.081-.385-.249-.523-.1-.083-.3-.164-.525-.26a6.1 6.1 0 01-1.036-.547.565.565 0 01-.214-.378.553.553 0 01.364-.609c1.265-.465 1.798-1.742 1.978-2.164.054-.125.054-.223-.012-.335-.251-.435-.723-.643-1.067-.794-.085-.036-.164-.072-.236-.108-.441-.224-.826-.623-.718-1.063a.73.73 0 01.489-.671.789.789 0 01.266-.048c.136 0 .27.038.38.092.253.129.529.207.814.207.098 0 .193-.01.284-.03-.009-.207-.02-.426-.034-.657-.087-1.663-.202-3.773.268-5.022C6.472.449 10.812.011 12.166.004z" />
  </svg>
);

const VimeoIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.977 6.416c-.105 2.338-1.739 5.543-4.894 9.609-3.268 4.247-6.026 6.37-8.29 6.37-1.409 0-2.578-1.294-3.553-3.881L5.322 11.4C4.603 8.816 3.834 7.522 3.01 7.522c-.179 0-.806.378-1.881 1.132L0 7.197c1.185-1.044 2.351-2.084 3.501-3.128C5.08 2.701 6.266 1.984 7.055 1.91c1.867-.18 3.016 1.1 3.447 3.838.465 2.953.789 4.789.971 5.507.539 2.45 1.131 3.674 1.776 3.674.502 0 1.256-.796 2.265-2.385 1.004-1.589 1.54-2.797 1.612-3.628.144-1.371-.395-2.061-1.612-2.061-.574 0-1.167.121-1.777.391 1.186-3.868 3.434-5.757 6.762-5.637 2.473.06 3.628 1.664 3.478 4.807z" />
  </svg>
);

const SoundCloudIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M1.175 12.225c-.015 0-.024.006-.034.017l-.021.06c0 .017.017.027.034.027.018 0 .027-.011.027-.027v-.06c0-.011-.009-.017-.006-.017zm-.197.557c-.012 0-.02.007-.02.02v.081c0 .013.008.02.02.02.013 0 .02-.007.02-.02v-.081c0-.013-.007-.02-.02-.02zm.397-.19c-.009 0-.013.005-.013.017v.039c0 .013.004.017.013.017.009 0 .013-.004.013-.017v-.039c0-.012-.004-.017-.013-.017zm.263.193c-.006 0-.011.004-.011.014v.057c0 .011.005.014.011.014.007 0 .011-.003.011-.014v-.057c0-.01-.004-.014-.011-.014zm.396-.217c-.007 0-.014.006-.014.019v.086c0 .013.007.019.014.019.008 0 .014-.006.014-.019v-.086c0-.013-.006-.019-.014-.019zm.525.234c-.008 0-.015.005-.015.018v.078c0 .013.007.018.015.018.009 0 .015-.005.015-.018v-.078c0-.013-.006-.018-.015-.018zm.528-.12c-.009 0-.017.006-.017.019v.101c0 .014.008.019.017.019.01 0 .017-.005.017-.019v-.101c0-.013-.007-.019-.017-.019zm.263-.038c-.01 0-.017.007-.017.02v.138c0 .013.007.02.017.02.011 0 .017-.007.017-.02v-.138c0-.013-.006-.02-.017-.02zm.266.08c-.01 0-.019.006-.019.019v.068c0 .013.009.019.019.019.011 0 .019-.006.019-.019v-.068c0-.013-.008-.019-.019-.019zM24 11.337c0-2.331-1.892-4.223-4.223-4.223-.508 0-.994.091-1.445.257-.492-1.697-1.898-2.85-3.523-2.85-1.001 0-1.914.367-2.617.973l-.002.001c-.185.16-.356.344-.508.545-.09.12-.171.247-.246.38a3.38 3.38 0 00-.309.874l.004.019a4.253 4.253 0 00-.048.566v7.97c0 .047.038.086.086.086h12.826c.048 0 .086-.039.086-.086v-.005a4.222 4.222 0 00-.081-8.507z" />
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
    { icon: <Send2 variant="Bold" size={18} />, label: 'Telegram', href: 'https://t.me/+201007560466' },
    { icon: <WhatsAppIcon />, label: 'WhatsApp', href: 'https://wa.me/201007560466' },
    { icon: <Youtube variant="Bold" size={18} />, label: 'YouTube', href: 'https://www.youtube.com/@NabtaStudio' },
    { icon: <Instagram variant="Bold" size={18} />, label: 'Instagram', href: 'https://www.instagram.com/NabtaStudio' },
    { icon: <Facebook variant="Bold" size={18} />, label: 'Facebook', href: 'https://www.facebook.com/NabtaStudio' },
    { icon: <TwitterXIcon />, label: 'Twitter / X', href: 'https://twitter.com/NabtaStudio' },
    { icon: <TikTokIcon />, label: 'TikTok', href: 'https://www.tiktok.com/@nabta_studio' },
    { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/NabtaStudio' },
    { icon: <PinterestIcon />, label: 'Pinterest', href: 'https://www.pinterest.com/NabtaStudio' },
    { icon: <SnapchatIcon />, label: 'Snapchat', href: 'https://web.snapchat.com/NabtaStudio' },
    { icon: <VimeoIcon />, label: 'Vimeo', href: 'https://vimeo.com/NabtaStudio' },
    { icon: <SoundCloudIcon />, label: 'SoundCloud', href: 'https://soundcloud.com/NabtaStudio' }
  ];

  const col1 = [
    { label: 'الرئيسية', to: '/' },
    { label: 'قصتنا', scrollTo: 'about-nabta' },
    { label: 'الأسئلة الشائعة', to: '/faq' },
    { label: 'تواصل معنا', to: '/contact' }
  ];

  const col2 = [
    { label: 'المتجر', href: 'https://play.google.com/store/apps/developer?id=Nabta+Studio', external: true },
    { label: 'كيف تدعمنا؟', href: '/support', external: false },
    { label: 'لغتي العربية', href: 'https://play.google.com/store/apps/details?id=air.ARABICMYLANGUAGE', external: true }
  ];

  return (
    <>
      {/* ===== MAIN FOOTER ===== */}
      <Box
        sx={{
          pt: isFull ? 5 : 8,
          pb: 6,
          bgcolor: 'secondary',
          borderTop: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Container>
          <Grid container spacing={4} direction="row-reverse">
            {/* RIGHT: Nav columns */}
            <Grid size={{ xs: 12, md: 8 }}>
              <Grid container spacing={4} direction="row-reverse">
                {/* Column 1 — روابط */}
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack gap={2.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      روابط سريعة
                    </Typography>
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
                        <FooterLink
                          key={label}
                          component={RouterLink}
                          to={to}
                          underline="none"
                        >
                          {label}
                        </FooterLink>
                      )
                    )}
                  </Stack>
                </Grid>

                {/* Column 2 — خدمات */}
                <Grid size={{ xs: 6, sm: 4 }}>
                  <Stack gap={2.5}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700, color: 'text.primary', mb: 0.5 }}>
                      خدماتنا
                    </Typography>
                    {col2.map(({ label, href, external }) => (
                      <FooterLink
                        key={label}
                        href={href}
                        target={external ? '_blank' : undefined}
                        rel={external ? 'noopener noreferrer' : undefined}
                        underline="none"
                      >
                        {label}
                      </FooterLink>
                    ))}
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
                <Stack gap={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
                  <Logo to="/" />

                  <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: 13, textAlign: { xs: 'center', md: 'right' }, lineHeight: 1.8 }}>
                    منصة نبتة — صناعة محتوى تربوي تعليمي للأطفال
                  </Typography>

                  {/* Social Icons — Row 1 */}
                  <Box>
                    <Stack direction="row" gap={1} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }}>
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
          <Grid container spacing={2} alignItems="center" direction="row-reverse" sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' } }}>
            {/* Right: Copyright */}
            <Grid size={{ xs: 12, sm: 'auto' }} sx={{ flexGrow: 1 }}>
              <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.7, fontSize: 13 }}>
                جميع الحقوق محفوظة © منصة Nabta {new Date().getFullYear()}
              </Typography>
            </Grid>

            {/* Center: Legal Links */}
            <Grid size={{ xs: 12, sm: 'auto' }}>
              <Stack direction="row" gap={3} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
                {[
                  { label: 'الشروط والأحكام', href: '/terms' },
                  { label: 'سياسة الخصوصية', href: '/privacy' }
                ].map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
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
            <Grid size={{ xs: 12, sm: 'auto' }} sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' } }}>
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
