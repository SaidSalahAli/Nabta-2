import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Wave from './Wave';

/**
 * A colour band of the garden. `wave` draws a hill on top of the band (in the band's own colour)
 * so consecutive sections flow into each other instead of meeting at a hard edge.
 */
export default function KidSection({
  id,
  bg = '#fff',
  wave = false,
  waveVariant = 'hills',
  py = { xs: 6, md: 9 },
  maxWidth = 'lg',
  decorations,
  children,
  sx,
  containerSx
}) {
  return (
    <Box
      component="section"
      id={id}
      sx={{
        position: 'relative',
        backgroundColor: bg,
        overflowX: 'clip',
        scrollMarginTop: { xs: '90px', md: '130px' },
        ...sx
      }}
    >
      {wave && (
        <Box sx={{ position: 'absolute', left: 0, right: 0, top: 0, transform: 'translateY(-99%)', zIndex: 1, pointerEvents: 'none' }}>
          <Wave color={bg} variant={waveVariant} />
        </Box>
      )}
      {decorations}
      <Container maxWidth={maxWidth} sx={{ position: 'relative', zIndex: 2, py, ...containerSx }}>
        {children}
      </Container>
    </Box>
  );
}

KidSection.propTypes = {
  id: PropTypes.string,
  bg: PropTypes.string,
  wave: PropTypes.bool,
  waveVariant: PropTypes.string,
  py: PropTypes.any,
  maxWidth: PropTypes.any,
  decorations: PropTypes.node,
  children: PropTypes.node,
  sx: PropTypes.object,
  containerSx: PropTypes.object
};
