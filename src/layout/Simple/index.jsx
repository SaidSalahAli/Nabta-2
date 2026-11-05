import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import lazyRetry from 'utils/lazyRetry';

// project-imports
import Loader from 'components/Loader';
import { SimpleLayoutType } from 'config';
import Box from '@mui/material/Box';
import { kidColors, kidFont } from 'components/kids';

const Header = lazyRetry(() => import('./Header'));
const FooterBlock = lazyRetry(() => import('./FooterBlock'));

export default function SimpleLayout({ layout = SimpleLayoutType.SIMPLE }) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Box
        component="main"
        sx={{
          pt: 'var(--header-height)',
          backgroundColor: kidColors.cloud,
          color: kidColors.ink,
          fontFamily: kidFont,
          minHeight: '100vh',
          overflowX: 'clip',
          '@media (prefers-reduced-motion: reduce)': {
            '& *': { animation: 'none !important', transition: 'none !important', scrollBehavior: 'auto !important' }
          }
        }}
      >
        <Outlet />
        <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
      </Box>
    </Suspense>
  );
}

SimpleLayout.propTypes = { layout: PropTypes.any };
