import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { kidColors } from './tokens';

// Small decorative SVGs. All are aria-hidden and pointer-events:none.

const base = { position: 'absolute', pointerEvents: 'none', userSelect: 'none', display: { xs: 'none', md: 'block' } };

function Svg({ children, viewBox, size, sx, alwaysShow }) {
  return (
    <Box
      component="svg"
      viewBox={viewBox}
      aria-hidden="true"
      focusable="false"
      sx={{ ...base, ...(alwaysShow && { display: 'block' }), width: size, height: 'auto', ...sx }}
    >
      {children}
    </Box>
  );
}

Svg.propTypes = {
  children: PropTypes.node,
  viewBox: PropTypes.string,
  size: PropTypes.any,
  sx: PropTypes.object,
  alwaysShow: PropTypes.bool
};

export function Sprout({ size = 56, color = kidColors.leaf, sx, alwaysShow }) {
  return (
    <Svg viewBox="0 0 64 64" size={size} sx={sx} alwaysShow={alwaysShow}>
      <path d="M32 60V30" stroke={kidColors.leafDeep} strokeWidth="5" strokeLinecap="round" />
      <path d="M32 34C32 20 22 12 8 12c0 14 10 22 24 22Z" fill={color} />
      <path d="M32 28c0-12 9-20 24-20 0 13-10 20-24 20Z" fill={color} opacity=".85" />
      <path d="M14 16c6 2 11 7 15 14" stroke="#fff" strokeOpacity=".55" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Star({ size = 36, color = kidColors.sun, sx, alwaysShow }) {
  return (
    <Svg viewBox="0 0 48 48" size={size} sx={sx} alwaysShow={alwaysShow}>
      <path
        d="M24 4c2 0 3 1.5 4 4l3.4 8.2 8.8.8c2.7.3 3.8 1.3 4.2 2.5.4 1.3-.2 2.6-2.2 4.4l-6.6 5.8 2 8.6c.6 2.6.3 4-.8 4.8-1 .8-2.5.6-4.8-.8L24 37.8l-8 4.5c-2.3 1.4-3.8 1.6-4.8.8-1.1-.8-1.4-2.2-.8-4.8l2-8.6-6.6-5.8c-2-1.8-2.6-3.1-2.2-4.4.4-1.2 1.5-2.2 4.2-2.5l8.8-.8L20 8c1-2.5 2-4 4-4Z"
        fill={color}
      />
    </Svg>
  );
}

export function Cloud({ size = 140, color = '#fff', sx, alwaysShow }) {
  return (
    <Svg viewBox="0 0 160 80" size={size} sx={sx} alwaysShow={alwaysShow}>
      <path
        d="M36 74c-17 0-30-11-30-25 0-13 11-23 25-24C35 12 48 4 63 4c15 0 27 8 32 20 3-1 7-2 11-2 16 0 29 11 30 25 13 2 22 11 22 22 0 3-2 5-5 5H36Z"
        fill={color}
      />
    </Svg>
  );
}

export function Sun({ size = 90, sx, alwaysShow }) {
  const rays = Array.from({ length: 10 });
  return (
    <Svg viewBox="0 0 100 100" size={size} sx={sx} alwaysShow={alwaysShow}>
      {rays.map((_, i) => (
        <rect key={i} x="47" y="2" width="6" height="16" rx="3" fill={kidColors.sun} transform={`rotate(${i * 36} 50 50)`} />
      ))}
      <circle cx="50" cy="50" r="24" fill={kidColors.sun} />
      <circle cx="42" cy="47" r="3" fill={kidColors.ink} />
      <circle cx="58" cy="47" r="3" fill={kidColors.ink} />
      <path d="M41 56c5 6 13 6 18 0" stroke={kidColors.ink} strokeWidth="3.5" strokeLinecap="round" fill="none" />
    </Svg>
  );
}

export function Flower({ size = 44, color = kidColors.coral, sx, alwaysShow }) {
  return (
    <Svg viewBox="0 0 48 48" size={size} sx={sx} alwaysShow={alwaysShow}>
      {[0, 72, 144, 216, 288].map((r) => (
        <ellipse key={r} cx="24" cy="12" rx="7" ry="10" fill={color} transform={`rotate(${r} 24 24)`} />
      ))}
      <circle cx="24" cy="24" r="7" fill={kidColors.sun} />
    </Svg>
  );
}

export function Dots({ size = 70, color = kidColors.sky, sx, alwaysShow }) {
  return (
    <Svg viewBox="0 0 70 50" size={size} sx={sx} alwaysShow={alwaysShow}>
      {[0, 1, 2, 3].map((c) =>
        [0, 1, 2].map((r) => <circle key={`${c}-${r}`} cx={8 + c * 18} cy={8 + r * 17} r="4" fill={color} opacity=".35" />)
      )}
    </Svg>
  );
}

// The signature mark: a wavy underline with a sprout growing from its end
export function SproutLine({ color = kidColors.sun, width = 150, sx }) {
  return (
    <Box component="svg" viewBox="0 0 150 34" aria-hidden="true" sx={{ width, height: 'auto', display: 'block', ...sx }}>
      <path d="M6 24c12-10 22-10 34 0s22 10 34 0 22-10 34 0" stroke={color} strokeWidth="7" strokeLinecap="round" fill="none" />
      <path d="M126 26V12" stroke={kidColors.leafDeep} strokeWidth="4" strokeLinecap="round" />
      <path d="M126 15c0-7-5-11-12-11 0 7 5 11 12 11Z" fill={kidColors.leaf} />
      <path d="M126 12c0-6 5-10 12-10 0 6-5 10-12 10Z" fill={kidColors.leaf} opacity=".85" />
    </Box>
  );
}

const sharedProps = { size: PropTypes.any, color: PropTypes.string, sx: PropTypes.object, alwaysShow: PropTypes.bool };
Sprout.propTypes = sharedProps;
Star.propTypes = sharedProps;
Cloud.propTypes = sharedProps;
Sun.propTypes = sharedProps;
Flower.propTypes = sharedProps;
Dots.propTypes = sharedProps;
SproutLine.propTypes = { color: PropTypes.string, width: PropTypes.any, sx: PropTypes.object };
