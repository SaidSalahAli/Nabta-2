import { forwardRef } from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { kidColors, kidFont } from './tokens';

const palettes = {
  sun: { bg: kidColors.sun, deep: kidColors.sunDeep, text: kidColors.ink },
  sky: { bg: kidColors.sky, deep: kidColors.skyDeep, text: '#fff' },
  berry: { bg: kidColors.berry, deep: kidColors.berryDeep, text: '#fff' },
  leaf: { bg: kidColors.leaf, deep: kidColors.leafDeep, text: '#fff' },
  coral: { bg: kidColors.coral, deep: kidColors.coralDeep, text: '#fff' },
  white: { bg: '#fff', deep: `${kidColors.ink}26`, text: kidColors.ink }
};

const sizes = {
  small: { px: 2.25, py: 0.6, fontSize: '0.98rem', depth: 4, radius: '14px' },
  medium: { px: 3.5, py: 1.1, fontSize: '1.1rem', depth: 5, radius: '18px' },
  large: { px: 5, py: 1.5, fontSize: '1.25rem', depth: 6, radius: '22px' }
};

/**
 * Squishy toy button: solid colour with a hard "bottom edge" that collapses when pressed.
 */
const KidButton = forwardRef(function KidButton({ color = 'sun', size = 'medium', sx, children, ...rest }, ref) {
  const p = palettes[color] || palettes.sun;
  const s = sizes[size] || sizes.medium;

  return (
    <Button
      ref={ref}
      disableElevation
      {...rest}
      sx={{
        fontFamily: kidFont,
        fontWeight: 800,
        fontSize: s.fontSize,
        lineHeight: 1.4,
        px: s.px,
        py: s.py,
        minWidth: 0,
        borderRadius: s.radius,
        textTransform: 'none',
        whiteSpace: 'nowrap',
        backgroundColor: p.bg,
        color: `${p.text} !important`,
        border: color === 'white' ? `3px solid ${kidColors.ink}14` : '3px solid transparent',
        boxShadow: `0 ${s.depth}px 0 ${p.deep}`,
        transform: 'translateY(0)',
        transition: 'transform .12s ease, box-shadow .12s ease, filter .2s ease',
        '& .MuiButton-startIcon, & .MuiButton-endIcon': { mx: 0.75 },
        '&:hover': {
          backgroundColor: p.bg,
          filter: 'brightness(1.05)',
          transform: 'translateY(-2px)',
          boxShadow: `0 ${s.depth + 2}px 0 ${p.deep}`
        },
        '&:active': {
          transform: `translateY(${s.depth - 1}px)`,
          boxShadow: `0 1px 0 ${p.deep}`
        },
        '&.Mui-focusVisible': {
          outline: `4px solid ${kidColors.sky}66`,
          outlineOffset: 3
        },
        '&.Mui-disabled': {
          backgroundColor: p.bg,
          opacity: 0.6,
          color: `${p.text} !important`
        },
        '@media (prefers-reduced-motion: reduce)': {
          transition: 'none',
          '&:hover, &:active': { transform: 'none' }
        },
        ...sx
      }}
    >
      {children}
    </Button>
  );
});

KidButton.propTypes = {
  color: PropTypes.oneOf(['sun', 'sky', 'berry', 'leaf', 'coral', 'white']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  sx: PropTypes.object,
  children: PropTypes.node
};

export default KidButton;
