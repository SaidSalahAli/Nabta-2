import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { crayon, kidColors, kidFont } from './tokens';

/**
 * Category filter as a row of crayon-coloured pills. Each category keeps its own colour when selected.
 * items: [{ value, label }]
 */
export default function CategoryPills({ value, onChange, items, allLabel = 'الكل', ariaLabel = 'التصنيفات', sx }) {
  const all = [{ value: 'all', label: allLabel }, ...items];

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: 4, md: 5 }, ...sx }}>
      <Tabs
        value={value}
        onChange={(_, v) => onChange(v)}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        aria-label={ariaLabel}
        sx={{
          minHeight: 0,
          '& .MuiTabs-indicator': { display: 'none' },
          '& .MuiTabs-flexContainer': { gap: 1.5, py: 1.25, px: 0.5 },
          '& .MuiTabs-scrollButtons': { color: kidColors.ink, '&.Mui-disabled': { opacity: 0.25 } }
        }}
      >
        {all.map((item, i) => {
          const c = i === 0 ? { main: kidColors.ink, deep: '#0F1626', text: '#fff' } : crayon(i - 1);
          const selected = String(value) === String(item.value);
          return (
            <Tab
              key={item.value}
              value={item.value}
              label={item.label}
              disableRipple
              sx={{
                fontFamily: kidFont,
                fontSize: '1.05rem',
                fontWeight: 800,
                minHeight: 0,
                minWidth: 0,
                px: 2.75,
                py: 1,
                borderRadius: '999px',
                textTransform: 'none',
                opacity: 1,
                color: selected ? `${c.text} !important` : `${kidColors.ink} !important`,
                backgroundColor: selected ? c.main : '#fff',
                border: `3px solid ${selected ? c.main : `${kidColors.ink}14`}`,
                boxShadow: selected ? `0 5px 0 ${c.deep}` : `0 4px 0 ${kidColors.ink}12`,
                transform: selected ? 'translateY(-2px)' : 'none',
                transition: 'all .18s ease',
                '&:hover': { backgroundColor: selected ? c.main : c.soft || kidColors.skySoft },
                '&.Mui-focusVisible': { outline: `4px solid ${kidColors.sky}66`, outlineOffset: 2 }
              }}
            />
          );
        })}
      </Tabs>
    </Box>
  );
}

CategoryPills.propTypes = {
  value: PropTypes.any,
  onChange: PropTypes.func,
  items: PropTypes.array,
  allLabel: PropTypes.string,
  ariaLabel: PropTypes.string,
  sx: PropTypes.object
};
