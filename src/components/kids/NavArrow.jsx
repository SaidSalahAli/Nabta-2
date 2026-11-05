import PropTypes from 'prop-types';
import IconButton from '@mui/material/IconButton';
import { ArrowLeft, ArrowRight } from 'iconsax-react';
import { kidColors } from './tokens';

/** Chunky round arrow for carousels. direction: 'next' | 'prev' (RTL aware: next points left). */
export default function NavArrow({ direction = 'next', onClick, disabled, color = kidColors.sky, sx }) {
  const Icon = direction === 'next' ? ArrowLeft : ArrowRight;
  return (
    <IconButton
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === 'next' ? 'التالي' : 'السابق'}
      sx={{
        width: 52,
        height: 52,
        borderRadius: '50%',
        backgroundColor: '#fff',
        border: `3px solid ${kidColors.ink}14`,
        boxShadow: `0 5px 0 ${kidColors.ink}1F`,
        transition: 'transform .15s ease, box-shadow .15s ease',
        '&:hover': { backgroundColor: kidColors.sunSoft, transform: 'translateY(-2px)' },
        '&:active': { transform: 'translateY(3px)', boxShadow: `0 1px 0 ${kidColors.ink}1F` },
        '&.Mui-disabled': { backgroundColor: '#fff', opacity: 0.45 },
        '& svg path': { strokeWidth: '3px' },
        ...sx
      }}
    >
      <Icon size={26} color={color} />
    </IconButton>
  );
}

NavArrow.propTypes = {
  direction: PropTypes.oneOf(['next', 'prev']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  color: PropTypes.string,
  sx: PropTypes.object
};
