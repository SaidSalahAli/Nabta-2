import PropTypes from 'prop-types';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import lazyRetry from 'utils/lazyRetry';

// project-imports
import Loader from 'components/Loader';
import { SimpleLayoutType } from 'config';
import Box from '@mui/material/Box';

const Header = lazyRetry(() => import('./Header'));
const FooterBlock = lazyRetry(() => import('./FooterBlock'));

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
