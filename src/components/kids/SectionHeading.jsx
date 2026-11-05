import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { SproutLine } from './Doodles';
import { kidColors, kidType } from './tokens';

/**
 * Big friendly heading with the signature sprout underline.
 * tone="dark" for light backgrounds, tone="light" for coloured bands.
 */
export default function SectionHeading({
  title,
  subtitle,
  tone = 'dark',
  align = 'center',
  lineColor,
  as = 'h2',
  mb = { xs: 4, md: 6 },
  sx
}) {
  const isLight = tone === 'light';
  const centered = align === 'center';

  return (
    <Box sx={{ textAlign: align, mb, ...sx }}>
      <Typography
        component={as}
        sx={{
          ...kidType.h2,
          color: isLight ? '#fff' : kidColors.ink,
          m: 0
        }}
      >
        {title}
      </Typography>
      <SproutLine
        color={lineColor || (isLight ? kidColors.sun : kidColors.sky)}
        width={{ xs: 120, md: 150 }}
        sx={{ mx: centered ? 'auto' : 0, mt: 1 }}
      />
      {subtitle && (
        <Typography
          sx={{
            ...kidType.body,
            color: isLight ? 'rgba(255,255,255,.92)' : kidColors.inkSoft,
            maxWidth: 720,
            mx: centered ? 'auto' : 0,
            mt: 2
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
}

SectionHeading.propTypes = {
  title: PropTypes.node,
  subtitle: PropTypes.node,
  tone: PropTypes.oneOf(['dark', 'light']),
  align: PropTypes.string,
  lineColor: PropTypes.string,
  as: PropTypes.string,
  mb: PropTypes.any,
  sx: PropTypes.object
};
