import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useLocation, Link } from 'react-router-dom';

// material-ui
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

// assets
import GooglePlay from 'assets/images/google-play-button.png';
import logo1 from 'assets/images/LogoNoon.png';
import Logo from 'components/logo';

import { HambergerMenu } from 'iconsax-react';

// auth
import useAuth from 'hooks/useAuth';

// ==============================|| HEADER - TOP BAR ||============================== //

function TopBar({ primaryColor, onClose, isVisible }) {
  if (!isVisible) return null;

  return (
    <Box
      sx={{
        px: { xs: 1.5, md: 3 },
        py: { xs: 1.5, md: 1.25 },
        display: 'flex',
        alignItems: 'center',
        backgroundColor: '#FFD666',
        justifyContent: 'space-between',
        position: 'relative'
      }}
    >
      <IconButton
        size="small"
        onClick={onClose}
        sx={{
          color: 'text.primary',
          border: '1px solid',
          borderColor: 'divider',
          borderRadius: '50%',
          flexShrink: 0,
          '&:hover': { color: primaryColor, borderColor: primaryColor, bgcolor: 'action.hover' }
        }}
      >
        X
      </IconButton>

      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1.2, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600, fontSize: { xs: 13, md: 20 }, color: 'text.primary', lineHeight: 1.3, textAlign: 'center' }}>
          تم إطلاق تطبيق لغتي العربية , ابدأ مع طفلك اليوم وحمّله الآن
        </Typography>
        <img src={GooglePlay} alt="Google Play" style={{ height: '28px', width: 'auto', flexShrink: 0 }} />
      </Box>

      <Box sx={{ width: 40, flexShrink: 0 }} />
    </Box>
  );
}

// ==============================|| USER MENU ||============================== //

function UserMenu({ user, primaryColor, onLogout }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const initials = `${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase();

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)} sx={{ p: 0 }}>
        <Avatar sx={{ width: 34, height: 34, bgcolor: primaryColor, fontSize: 13, fontWeight: 700, cursor: 'pointer' }}>{initials}</Avatar>
      </IconButton>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{ paper: { sx: { mt: 1, minWidth: 180, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' } } }}
      >
        <Box sx={{ px: 2, py: 1.5, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography sx={{ fontWeight: 700, fontSize: 14, color: 'text.primary' }}>
            {user?.firstName} {user?.lastName}
          </Typography>
          <Typography sx={{ fontSize: 12, color: 'text.secondary', mt: 0.25 }}>{user?.email}</Typography>
        </Box>
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            navigate('/dashboard/episodes');
          }}
          sx={{ fontSize: 14, py: 1.25 }}
        >
          لوحة التحكم
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            setAnchorEl(null);
            onLogout();
          }}
          sx={{ fontSize: 14, py: 1.25, color: 'error.main' }}
        >
          تسجيل الخروج
        </MenuItem>
      </Menu>
    </>
  );
}

// ==============================|| HEADER - BOTTOM BAR ||============================== //

const navLinks = [
  { label: 'الصفحة الرئيسية', path: '/' },
  { label: 'حلقات', path: '/episodes' },
  { label: 'تطبيقات', path: '/applications' },
  { label: 'أوراق عمل', path: '/worksheets' },
  { label: 'تواصل معنا', path: '/contact' }
];

const LOGO_WIDTH = 110;

function BottomBar({ primaryColor }) {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  useEffect(() => {
    const currentIndex = navLinks.findIndex((link) => link.path !== '#' && location.pathname === link.path);
    setActiveTab(currentIndex !== -1 ? currentIndex : false);
  }, [location]);

  return (
    <Box
      sx={{
        px: { xs: 1.5, md: 3 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&::-webkit-scrollbar': { height: '4px' },
        '&::-webkit-scrollbar-thumb': { bgcolor: primaryColor, borderRadius: '2px' }
      }}
    >
      {/* ← Placeholder فارغ بيحجز مكان اللوجو */}
      <Box sx={{ width: LOGO_WIDTH, flexShrink: 0 }} />

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(_, val) => setActiveTab(val)}
        textColor="inherit"
        TabIndicatorProps={{ style: { display: 'none' } }}
        sx={{
          minHeight: 56,
          flex: 1,
          '& .MuiTab-root': { opacity: 1 }
        }}
        variant="scrollable"
        scrollButtons="auto"
      >
        {navLinks.map((link, i) => (
          <Tab
            key={link.label}
            label={link.label}
            component={link.path !== '#' ? Link : 'div'}
            to={link.path !== '#' ? link.path : undefined}
            disableRipple
            sx={{
              position: 'relative',
              overflow: 'visible',
              fontSize: { xs: 14, md: 18 },
              fontWeight: activeTab === i ? 700 : 500,
              color: '#fff !important',
              minHeight: 56,
              px: { xs: 1.5, md: 2 },
              textTransform: 'none',
              minWidth: 'auto',
              backgroundColor: 'transparent !important',

              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 8,
                left: '50%',
                width: '60%',
                height: '3px',
                backgroundColor: '#FFD666',
                borderRadius: '20px',
                transform: activeTab === i ? 'translateX(-50%) scaleX(1)' : 'translateX(-50%) scaleX(0)',
                transformOrigin: 'center',
                transition: 'transform 0.35s ease'
              },

              '&:hover::after': { transform: 'translateX(-50%) scaleX(1)' },
              '&:hover': { color: '#fff', backgroundColor: 'transparent' },
              '&.Mui-selected': { color: '#fff !important' }
            }}
          />
        ))}
      </Tabs>

      {/* Action Buttons */}
      <Stack direction="row" alignItems="center" gap={1} sx={{ display: { xs: 'none', md: 'flex' }, flexShrink: 0 }}>
        {[
          { label: 'المتجر', path: '#' },
          { label: 'ادعمنا', path: '/support' }
        ].map((btn) => (
          <Button
            key={btn.label}
            component={btn.path !== '#' ? Link : 'button'}
            to={btn.path !== '#' ? btn.path : undefined}
            variant="outlined"
            sx={{
              fontSize: 13,
              fontWeight: 500,
              borderColor: 'white',
              color: 'white',
              borderRadius: 1,
              px: 1.75,
              py: 0.75,
              textTransform: 'none',
              '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
            }}
          >
            {btn.label}
          </Button>
        ))}

        <Box sx={{ width: '0.5px', height: 20, bgcolor: 'white', mx: 0.5 }} />

        {isLoggedIn ? (
          <UserMenu user={user} primaryColor={primaryColor} onLogout={logout} />
        ) : (
          <>
            <Button
              variant="text"
              component={Link}
              to="/auth/login"
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: 'white',
                borderRadius: 1,
                border: '1px solid white',
                px: 1.75,
                py: 0.75,
                textTransform: 'none'
              }}
            >
              دخول
            </Button>
            <Button
              variant="contained"
              component={Link}
              to="/auth/register"
              sx={{
                fontSize: 13,
                fontWeight: 600,
                bgcolor: '#FFD666',
                color: '#000',
                borderRadius: 1,
                px: 1.75,
                py: 0.75,
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': { bgcolor: '#FFD666', boxShadow: 'none', opacity: 0.85 }
              }}
            >
              تسجيل
            </Button>
          </>
        )}
      </Stack>
    </Box>
  );
}

// ==============================|| HEADER - MOBILE DRAWER ||============================== //

function MobileDrawer({ open, onClose, primaryColor }) {
  const { isLoggedIn, user, logout } = useAuth();

  return (
    <Drawer anchor="top" open={open} onClose={onClose} sx={{ '& .MuiDrawer-paper': { backgroundImage: 'none' } }}>
      <Box sx={{ p: 3 }}>
        {isLoggedIn && user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2, pb: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
            <Avatar sx={{ bgcolor: primaryColor, width: 40, height: 40, fontSize: 14, fontWeight: 700 }}>
              {`${user?.firstName?.[0] || ''}${user?.lastName?.[0] || ''}`.toUpperCase()}
            </Avatar>
            <Box>
              <Typography sx={{ fontWeight: 700, fontSize: 14 }}>
                {user?.firstName} {user?.lastName}
              </Typography>
              <Typography sx={{ fontSize: 12, color: 'text.secondary' }}>{user?.email}</Typography>
            </Box>
          </Box>
        )}

        <List sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {navLinks.map((link) => (
            <ListItemButton
              key={link.label}
              component={link.path !== '#' ? Link : 'div'}
              to={link.path !== '#' ? link.path : undefined}
              onClick={() => {
                if (link.path !== '#') onClose();
              }}
              sx={{ px: 0, borderRadius: 1 }}
            >
              <ListItemText primary={link.label} slotProps={{ primary: { sx: { fontWeight: 500, fontSize: 16 } } }} />
            </ListItemButton>
          ))}
        </List>

        <Stack gap={1} mt={2}>
          {[
            { label: 'المتجر', path: '#' },
            { label: 'ادعمنا', path: '/support' }
          ].map((btn) => (
            <Button
              key={btn.label}
              component={btn.path !== '#' ? Link : 'button'}
              to={btn.path !== '#' ? btn.path : undefined}
              onClick={() => {
                if (btn.path !== '#') onClose();
              }}
              variant="outlined"
              fullWidth
              sx={{ textTransform: 'none', borderColor: 'divider', color: 'text.primary' }}
            >
              {btn.label}
            </Button>
          ))}

          {isLoggedIn ? (
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                logout();
                onClose();
              }}
              sx={{ textTransform: 'none', bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
            >
              تسجيل الخروج
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                fullWidth
                component={Link}
                to="/auth/login"
                sx={{ textTransform: 'none', borderColor: 'divider', color: 'text.primary' }}
              >
                دخول
              </Button>
              <Button
                variant="contained"
                fullWidth
                component={Link}
                to="/auth/register"
                sx={{ textTransform: 'none', bgcolor: primaryColor, '&:hover': { bgcolor: primaryColor, opacity: 0.85 } }}
              >
                تسجيل
              </Button>
            </>
          )}
        </Stack>
      </Box>
    </Drawer>
  );
}

// ==============================|| MAIN HEADER EXPORT ||============================== //

const LOGO_OVERFLOW = 30; // المقدار اللي اللوجو هينزل بيه فوق الـ Hero

export default function Header() {
  const theme = useTheme();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTopBarVisible, setIsTopBarVisible] = useState(true);
  const primaryColor = theme.palette.primary.main;

  return (
    /*
     * ← الـ wrapper الخارجي بيحتوي AppBar + اللوجو الطافي
     *   position: relative عشان اللوجو يتحدد موقعه منه
     */
    <Box sx={{ position: 'relative', zIndex: 1100 }}>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: primaryColor,
          boxShadow: 'none',
          color: 'text.primary',
          position: 'relative' // ← relative مش sticky عشان اللوجو يتحدد منه
        }}
      >
        {/* Desktop */}
        <Box sx={{ display: { xs: 'none', md: 'block' }, bgcolor: primaryColor }}>
          <TopBar primaryColor={primaryColor} onClose={() => setIsTopBarVisible(false)} isVisible={isTopBarVisible} />
          <BottomBar primaryColor={primaryColor} />
        </Box>

        {/* Mobile */}
        <Box sx={{ display: { xs: 'block', md: 'none' }, bgcolor: primaryColor }}>
          <TopBar primaryColor={primaryColor} onClose={() => setIsTopBarVisible(false)} isVisible={isTopBarVisible} />
          <Container disableGutters>
            <Toolbar sx={{ justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexShrink: 0, height: 24 }}>
                {/* <img src={logo1} alt=" " style={{ width: 60 }} /> */}
                <Logo width={60} to="/" /> {/* استخدم مكون اللوجو الجديد */}
              </Box>
              <Typography sx={{ fontWeight: 600, fontSize: 14, color: 'white', flex: 1, textAlign: 'center' }}>لغتي العربية</Typography>
              <IconButton size="large" color="inherit" onClick={() => setDrawerOpen(true)} sx={{ flexShrink: 0 }}>
                <HambergerMenu />
              </IconButton>
            </Toolbar>
          </Container>
          <MobileDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} primaryColor={primaryColor} />
        </Box>
      </AppBar>

      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          bottom: '-33px',
          left: { md: 24, lg: 32 },
          zIndex: 1200,
          alignItems: 'flex-start'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: LOGO_WIDTH
          }}
        >
          <img src={logo1} alt="لغتي العربية" style={{ width: 90, display: 'block' }} />
        </Box>
      </Box>
    </Box>
  );
}
