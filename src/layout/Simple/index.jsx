import PropTypes from 'prop-types';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

// project-imports
import Loader from 'components/Loader';
import { SimpleLayoutType } from 'config';
import Box from '@mui/material/Box';

const Header = lazy(() => import('./Header'));
const FooterBlock = lazy(() => import('./FooterBlock'));

export default function SimpleLayout({ layout = SimpleLayoutType.SIMPLE }) {
  return (
    <Suspense fallback={<Loader />}>
      <Header />
      <Box sx={{ pt: 'var(--header-height)' }}>
        <Outlet />
        <FooterBlock isFull={layout === SimpleLayoutType.LANDING} />
      </Box>
    </Suspense>
  );
}

SimpleLayout.propTypes = { layout: PropTypes.any };
