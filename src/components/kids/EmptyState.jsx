import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Sprout } from './Doodles';
import { kidColors, kidFont } from './tokens';

/** Friendly empty / not-found block with a little sprout. */
export default function EmptyState({ title, description, action, sx }) {
  return (
    <Box
      sx={{
        textAlign: 'center',
        py: { xs: 6, md: 8 },
        px: 3,
        borderRadius: '32px',
        backgroundColor: '#fff',
        border: `3px dashed ${kidColors.sky}55`,
        maxWidth: 620,
        mx: 'auto',
        ...sx
      }}
    >
      <Sprout size={78} alwaysShow sx={{ position: 'static', mx: 'auto', mb: 1 }} />
      <Typography
        component="h2"
        sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.6rem' }, color: kidColors.ink, mb: 1 }}
      >
        {title}
      </Typography>
      {description && (
        <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, fontSize: '1.05rem', lineHeight: 1.8, mb: action ? 3 : 0 }}>
          {description}
        </Typography>
      )}
      {action}
    </Box>
  );
}

EmptyState.propTypes = { title: PropTypes.node, description: PropTypes.node, action: PropTypes.node, sx: PropTypes.object };
