import { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// material-ui
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// assets
import GooglePlay from 'assets/images/google-play-button.png';
import logo1 from 'assets/images/LogoNoon.png';
import Logo from 'components/logo';
import { HambergerMenu, CloseCircle } from 'iconsax-react';

// kids kit
import { KidButton, Wave, Star, kidColors, kidFont } from 'components/kids';

// auth
import useAuth from 'hooks/useAuth';

const STORE_URL = 'https://checkouts.kashier.io/ar/prepaymenpages?ppLink=PP-4195682401,live';
const LOGO_WIDTH = 116;

const navLinks = [
  { label: 'الصفحة الرئيسية', path: '/' },
  { label: 'حلقات', path: '/episodes' },
  { label: 'تطبيقات', path: '/applications' },
  { label: 'أوراق عمل', path: '/worksheets' },
  { label: 'قصتنا', path: '/', scrollTo: 'about-nabta' }
];

function useScrollNav() {
  const navigate = useNavigate();
  const location = useLocation();
  // Home mounts its deferred sections and scrolls when it sees state.scrollTo, so route through it even when already on '/'.
  return (sectionId) => navigate('/', { state: { scrollTo: sectionId }, replace: location.pathname === '/' });
}

// ==============================|| HEADER - ANNOUNCEMENT ||============================== //

function TopBar({ onClose, isVisible }) {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        position: 'relative',
        px: { xs: 1.5, md: 3 },
        py: { xs: 1, md: 0.75 },
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        backgroundColor: kidColors.sun
      }}
    >
      <IconButton
        size="small"
        onClick={onClose}
        aria-label="إغلاق الإعلان"
        sx={{ color: kidColors.ink, flexShrink: 0, '&:hover': { backgroundColor: 'rgba(31,42,68,.08)' } }}
      >
        <CloseCircle size={22} color={kidColors.ink} />
      </IconButton>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: { xs: 1, md: 1.5 },
          minWidth: 0,
          flexWrap: 'wrap'
        }}
      >
        <Star size={22} alwaysShow sx={{ position: 'static', display: { xs: 'none', sm: 'block' } }} color={kidColors.coral} />
        <Typography
          sx={{
            fontFamily: kidFont,
            fontWeight: 800,
            fontSize: { xs: 13, md: 18 },
            color: kidColors.ink,
            lineHeight: 1.4,
            textAlign: 'center'
          }}
        >
          تم إطلاق تطبيق لغتي العربية، ابدأ مع طفلك اليوم وحمّله الآن
        </Typography>
        <Box
          component="a"
          href="https://play.google.com/store/apps/details?id=air.ARABICMYLANGUAGE"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تحميل تطبيق لغتي العربية من Google Play"
          sx={{ display: 'flex', transition: 'transform .2s ease', '&:hover': { transform: 'scale(1.05) rotate(-2deg)' } }}
        >
          <img src={GooglePlay} alt="Google Play" style={{ height: 36, width: 'auto' }} />
        </Box>
      </Box>

      <Box sx={{ width: 34, flexShrink: 0 }} />
    </Box>
  );
}

// ==============================|| USER MENU ||============================== //

function UserMenu({ user, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }} aria-label="قائمة الحساب">
        <Avatar
          sx={{
            width: 42,
            height: 42,
            bgcolor: kidColors.sun,
            color: kidColors.ink,
            fontFamily: kidFont,
            fontSize: 15,
            fontWeight: 800,
            border: '3px solid #fff'
          }}
        >
          {initials}
        </Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              mt: 1.5,
              minWidth: 200,
              borderRadius: '20px',
              border: `3px solid ${kidColors.ink}14`,
              boxShadow: `0 8px 0 ${kidColors.ink}14`
            }
          }
        }}
      >
        <Box sx={{ px: 2, py: 1.5 }}>
          <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: 15, color: kidColors.ink }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: kidColors.inkSoft, mt: 0.25 }}>{user?.email}</Typography>
        </Box>
        <Divider />
        {user?.role === 'Admin' && (
          <MenuItem
            onClick={() => {
              setAnchorEl(null);
              navigate('/dashboard/episodes');
            }}
            sx={{ fontFamily: kidFont, fontWeight: 700, py: 1.25 }}
          >
            لوحة التحكم
          </MenuItem>
        )}
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onLogout();
          }}
          sx={{ fontFamily: kidFont, fontWeight: 700, py: 1.25, color: 'error.main' }}
        >
          تسجيل الخروج
        </MenuItem>
      </Menu>
    </>
  );
}

// ==============================|| DESKTOP BAR ||============================== //

const navPillSx = (active) => ({
  fontFamily: kidFont,
  fontSize: { md: 16, lg: 18 },
  fontWeight: 800,
  px: { md: 1.75, lg: 2.25 },
  py: 0.75,
  borderRadius: '999px',
  textTransform: 'none',
  whiteSpace: 'nowrap',
  minWidth: 0,
  color: active ? `${kidColors.ink} !important` : '#fff !important',
  backgroundColor: active ? kidColors.sun : 'transparent',
  boxShadow: active ? `0 4px 0 ${kidColors.sunDeep}` : 'none',
  transition: 'background-color .2s ease, transform .2s ease',
  '&:hover': {
    backgroundColor: active ? kidColors.sun : 'rgba(255,255,255,.18)',
    transform: 'translateY(-2px)'
  },
  '&.Mui-focusVisible': { outline: '3px solid #fff', outlineOffset: 2 }
});

const ghostBtnSx = {
  fontFamily: kidFont,
  fontSize: 15,
  fontWeight: 800,
  color: '#fff !important',
  borderRadius: '999px',
  border: '2.5px solid rgba(255,255,255,.75)',
  px: 2,
  py: 0.5,
  textTransform: 'none',
  whiteSpace: 'nowrap',
  '&:hover': { backgroundColor: 'rgba(255,255,255,.16)', borderColor: '#fff' }
};

function BottomBar() {
  const location = useLocation();
  const goToSection = useScrollNav();
  const { isLoggedIn, user, logout } = useAuth();
  const [scrollActive, setScrollActive] = useState(null);

  useEffect(() => {
    setScrollActive(null);
  }, [location.pathname]);

  const isActive = (link, i) => {
    if (link.scrollTo) return scrollActive === i;
    return scrollActive === null && location.pathname === link.path;
  };

  return (
    <Box sx={{ px: { md: 2, lg: 3 }, display: 'flex', height: 84, alignItems: 'center', gap: 2 }}>
      {/* space reserved for the floating logo */}
      <Box sx={{ width: LOGO_WIDTH, flexShrink: 0 }} />

      <Box
        component="nav"
        aria-label="القائمة الرئيسية"
        sx={{ flex: 1, display: 'flex', justifyContent: 'center', gap: { md: 0.5, lg: 1 } }}
      >
        {navLinks.map((link, i) =>
          link.scrollTo ? (
            <Button
              key={link.label}
              disableRipple
              onClick={() => {
                setScrollActive(i);
                goToSection(link.scrollTo);
              }}
              sx={navPillSx(isActive(link, i))}
            >
              {link.label}
            </Button>
          ) : (
            <Button
              key={link.label}
              component={Link}
              to={link.path}
              disableRipple
              onClick={() => setScrollActive(null)}
              aria-current={isActive(link, i) ? 'page' : undefined}
              sx={navPillSx(isActive(link, i))}
            >
              {link.label}
            </Button>
          )
        )}
      </Box>

      <Stack direction="row" alignItems="center" gap={1} sx={{ flexShrink: 0 }}>
        <Button component="a" href={STORE_URL} target="_blank" rel="noopener noreferrer" sx={ghostBtnSx}>
          المتجر
        </Button>
        <Button component={Link} to="/support" sx={ghostBtnSx}>
          ادعمنا
        </Button>

        <Box sx={{ width: '2px', height: 26, borderRadius: 2, bgcolor: 'rgba(255,255,255,.4)', mx: 0.5 }} />

        {isLoggedIn ? (
          <UserMenu user={user} onLogout={logout} />
        ) : (
          <>
            <KidButton component={Link} to="/auth/login" color="white" size="small">
              دخول
            </KidButton>
            <KidButton component={Link} to="/auth/register" color="sun" size="small">
              تسجيل
            </KidButton>
          </>
        )}
      </Stack>
    </Box>
  );
}

// ==============================|| MOBILE DRAWER ||============================== //

function MobileDrawer({ open, onClose }) {
  const { isLoggedIn, user, logout } = useAuth();
  const location = useLocation();
  const goToSection = useScrollNav();

  const drawerLinkSx = (active) => ({
    display: 'block',
    fontFamily: kidFont,
    fontWeight: 800,
    fontSize: 19,
    px: 2.5,
    py: 1.25,
    borderRadius: '18px',
    textDecoration: 'none',
    color: kidColors.ink,
    backgroundColor: active ? kidColors.sunSoft : 'transparent',
    border: `3px solid ${active ? kidColors.sun : 'transparent'}`,
    cursor: 'pointer',
    '&:hover': { backgroundColor: kidColors.skySoft }
  });

  return (
    <Drawer
      anchor="top"
      open={open}
      onClose={onClose}
      sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none', borderRadius: '0 0 32px 32px', backgroundColor: '#fff' } }}
    >
      <Box sx={{ p: 2.5 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Logo width={70} to="/" />
          <IconButton onClick={onClose} aria-label="إغلاق القائمة">
            <CloseCircle size={30} color={kidColors.ink} />
          </IconButton>
        </Box>

        {isLoggedIn && user && (
          <Box
            sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, p: 1.5, borderRadius: '20px', backgroundColor: kidColors.cloud }}
          >
            <Avatar sx={{ bgcolor: kidColors.sun, color: kidColors.ink, width: 44, height: 44, fontWeight: 800 }}>
              {`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase()}
            </Avatar>
            <Box>
              <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: 15 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography sx={{ fontSize: 12, color: kidColors.inkSoft }}>{user?.email}</Typography>
            </Box>
          </Box>
        )}

        <Box component="nav" aria-label="القائمة الرئيسية" sx={{ display: 'flex', flexDirection: 'column', gap: 0.75 }}>
          {navLinks.map((link) =>
            link.scrollTo ? (
              <Box
                key={link.label}
                component="button"
                type="button"
                onClick={() => {
                  onClose();
                  goToSection(link.scrollTo);
                }}
                sx={{ ...drawerLinkSx(false), background: 'none', textAlign: 'start', width: '100%' }}
              >
                {link.label}
              </Box>
            ) : (
              <Box key={link.label} component={Link} to={link.path} onClick={onClose} sx={drawerLinkSx(location.pathname === link.path)}>
                {link.label}
              </Box>
            )
          )}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1.5, mt: 3 }}>
          <KidButton component="a" href={STORE_URL} target="_blank" rel="noopener noreferrer" color="white" onClick={onClose}>
            المتجر
          </KidButton>
          <KidButton component={Link} to="/support" color="berry" onClick={onClose}>
            ادعمنا
          </KidButton>

          {isLoggedIn ? (
            <KidButton
              color="coral"
              onClick={() => {
                logout();
                onClose();
              }}
              sx={{ gridColumn: '1 / -1' }}
            >
              تسجيل الخروج
            </KidButton>
          ) : (
            <>
              <KidButton component={Link} to="/auth/login" color="sky" onClick={onClose}>
                دخول
              </KidButton>
              <KidButton component={Link} to="/auth/register" color="sun" onClick={onClose}>
                تسجيل
              </KidButton>
            </>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}

// ==============================|| MAIN HEADER ||============================== //

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);

  // measure the fixed header so the layout can pad the content below it
  useEffect(() => {
    const el = document.getElementById('main-header-bar');
    if (!el) return undefined;
    const observer = new ResizeObserver(() => setHeaderHeight(el.offsetHeight));
    observer.observe(el);
    setHeaderHeight(el.offsetHeight);
    return () => observer.disconnect();
  }, [isTopBarVisible]);

  useEffect(() => {
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
  }, [headerHeight]);

  return (
    <Box id="main-header" component="header" sx={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1100 }}>
      <Box id="main-header-bar" sx={{ backgroundColor: kidColors.sky }}>
        <TopBar onClose={() => setIsTopBarVisible(false)} isVisible={isTopBarVisible} />

        {/* Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'block' } }}>
          <BottomBar />
        </Box>

        {/* Mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' }, alignItems: 'center', justifyContent: 'space-between', px: 1.5, height: 64 }}>
          <Logo width={58} to="/" />
          <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: 17, color: '#fff' }}>لغتي العربية</Typography>
          <IconButton
            onClick={() => setDrawerOpen(true)}
            aria-label="فتح القائمة"
            sx={{
              backgroundColor: kidColors.sun,
              borderRadius: '14px',
              boxShadow: `0 4px 0 ${kidColors.sunDeep}`,
              '&:hover': { backgroundColor: kidColors.sun }
            }}
          >
            <HambergerMenu size={24} color={kidColors.ink} />
          </IconButton>
        </Box>
      </Box>

      {/* scalloped hill edge hanging under the bar */}
      <Wave color={kidColors.sky} variant="bumpy" flip height={{ xs: 12, md: 18 }} sx={{ mt: '-1px', pointerEvents: 'none' }} />

      <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

      {/* floating logo — desktop only */}
      <Box
        component={Link}
        to="/"
        aria-label="الصفحة الرئيسية"
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          bottom: '-14px',
          left: { md: 20, lg: 32 },
          zIndex: 1200,
          width: LOGO_WIDTH,
          transition: 'transform .3s cubic-bezier(.34,1.56,.64,1)',
          '&:hover': { transform: 'rotate(-4deg) scale(1.04)' }
        }}
      >
        <img
          src={logo1}
          alt="لغتي العربية"
          style={{ width: LOGO_WIDTH, display: 'block', filter: 'drop-shadow(0 6px 0 rgba(0,0,0,.12))' }}
        />
      </Box>
    </Box>
  );
}
