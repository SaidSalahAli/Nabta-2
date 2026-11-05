import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { Sprout } from './Doodles';
import { kidColors, kidFont } from './tokens';

/** Full-height loading state: a sprout gently bobbing. */
export default function PageLoader() {
  return (
    <Box
      role="status"
      aria-live="polite"
      sx={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 1.5 }}
    >
      <Box
        sx={{
          '@keyframes kidBob': {
            '0%,100%': { transform: 'translateY(0) rotate(-4deg)' },
            '50%': { transform: 'translateY(-10px) rotate(4deg)' }
          },
          animation: 'kidBob 1.2s ease-in-out infinite',
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' }
        }}
      >
        <Sprout size={72} alwaysShow sx={{ position: 'static' }} />
      </Box>
      <Typography sx={{ fontFamily: kidFont, fontWeight: 800, color: kidColors.inkSoft, fontSize: '1.1rem' }}>
        لحظة، النبتة تكبر...
      </Typography>
    </Box>
  );
}
