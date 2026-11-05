import PropTypes from 'prop-types';
import Box from '@mui/material/Box';

// Rolling-hill divider. Fill it with the colour of the section it belongs to.
const shapes = {
  hills: 'M0 60V34C120 6 240 6 360 26s240 40 360 18 240-44 360-34 240 30 360 22V60Z',
  gentle: 'M0 60V40C180 10 360 10 540 30s360 30 540 10 270-20 360-10V60Z',
  bumpy: 'M0 60V38c60-22 120-22 180 0s120 22 180 0 120-22 180 0 120 22 180 0 120-22 180 0 120 22 180 0 120-22 180 0 120 22 180 0V60Z'
};

export default function Wave({ color = '#fff', variant = 'hills', flip = false, height = { xs: 26, md: 56 }, sx }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 1440 60"
      preserveAspectRatio="none"
      aria-hidden="true"
      sx={{
        display: 'block',
        width: '100%',
        height,
        transform: flip ? 'scaleY(-1)' : 'none',
        ...sx
      }}
    >
      <path d={shapes[variant] || shapes.hills} fill={color} />
    </Box>
  );
}

Wave.propTypes = { color: PropTypes.string, variant: PropTypes.string, flip: PropTypes.bool, height: PropTypes.any, sx: PropTypes.object };
