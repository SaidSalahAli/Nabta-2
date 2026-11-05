// ==============================|| NABTA KIDS – DESIGN TOKENS ||============================== //
// "حديقة نبتة" — a playful garden language: rolling hills, sprouts, sticker cards, squishy buttons.

export const kidColors = {
  sky: '#0088CC',
  skyDeep: '#006BA3',
  skySoft: '#D9F0FC',
  berry: '#A4257B',
  berryDeep: '#801B5F',
  berrySoft: '#F8E3F1',
  sun: '#FFD666',
  sunDeep: '#E8B730',
  sunSoft: '#FFF4D1',
  leaf: '#5DBB63',
  leafDeep: '#3E9845',
  leafSoft: '#E3F5E4',
  coral: '#FF8B6A',
  coralDeep: '#E0674A',
  coralSoft: '#FFE6DE',
  ink: '#1F2A44',
  inkSoft: '#56607A',
  cloud: '#EEF7FC',
  paper: '#FFFFFF'
};

// Rotating palette so lists of cards / pills feel like a box of crayons
export const crayonCycle = [
  { main: kidColors.sky, deep: kidColors.skyDeep, soft: kidColors.skySoft, text: '#fff' },
  { main: kidColors.leaf, deep: kidColors.leafDeep, soft: kidColors.leafSoft, text: '#fff' },
  { main: kidColors.sun, deep: kidColors.sunDeep, soft: kidColors.sunSoft, text: kidColors.ink },
  { main: kidColors.berry, deep: kidColors.berryDeep, soft: kidColors.berrySoft, text: '#fff' },
  { main: kidColors.coral, deep: kidColors.coralDeep, soft: kidColors.coralSoft, text: '#fff' }
];

export const crayon = (index) => crayonCycle[index % crayonCycle.length];

export const kidFont = `'Baloo Bhaijaan 2', sans-serif`;

// Sticker card: white, rounded, thick soft outline + hard (non-blurred) drop shadow
export const stickerCard = (accent = kidColors.sky, { lift = true } = {}) => ({
  backgroundColor: kidColors.paper,
  borderRadius: '28px',
  border: `3px solid ${kidColors.ink}14`,
  boxShadow: `0 8px 0 ${accent}33`,
  transition: 'transform .25s cubic-bezier(.34,1.56,.64,1), box-shadow .25s ease',
  ...(lift && {
    '&:hover': {
      transform: 'translateY(-6px) rotate(-0.6deg)',
      boxShadow: `0 14px 0 ${accent}40`
    }
  }),
  '@media (prefers-reduced-motion: reduce)': {
    transition: 'none',
    '&:hover': { transform: 'none' }
  }
});

// Headline scale (Baloo is round & friendly – we push weight and size)
export const kidType = {
  display: { fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '2.1rem', sm: '2.6rem', md: '3.4rem' }, lineHeight: 1.25 },
  h2: { fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.7rem' }, lineHeight: 1.3 },
  h3: { fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '1.35rem', md: '1.6rem' }, lineHeight: 1.4 },
  body: { fontFamily: kidFont, fontSize: { xs: '1.05rem', md: '1.15rem' }, lineHeight: 1.9 }
};

// Fun pagination styling shared by listing pages
export const kidPaginationSx = {
  '& .MuiPaginationItem-root': {
    fontFamily: kidFont,
    fontSize: '1.15rem',
    fontWeight: 800,
    minWidth: 46,
    height: 46,
    borderRadius: '16px',
    border: `3px solid ${kidColors.ink}14`,
    backgroundColor: '#fff',
    color: kidColors.ink,
    boxShadow: `0 4px 0 ${kidColors.ink}14`,
    transition: 'transform .15s ease',
    '&:hover': { backgroundColor: kidColors.skySoft, transform: 'translateY(-2px)' },
    '&.Mui-selected': {
      backgroundColor: kidColors.sun,
      borderColor: kidColors.sunDeep,
      color: kidColors.ink,
      boxShadow: `0 4px 0 ${kidColors.sunDeep}`,
      '&:hover': { backgroundColor: kidColors.sun }
    }
  }
};

// Friendly input fields
export const kidFieldSx = {
  '& .MuiOutlinedInput-root': {
    fontFamily: kidFont,
    borderRadius: '18px',
    backgroundColor: kidColors.cloud,
    fontSize: '1.05rem',
    '& fieldset': { borderWidth: 3, borderColor: 'transparent' },
    '&:hover fieldset': { borderColor: `${kidColors.sky}55` },
    '&.Mui-focused fieldset': { borderColor: kidColors.sky, borderWidth: 3 },
    '&.Mui-focused': { backgroundColor: '#fff' }
  },
  '& .MuiInputLabel-root': { fontFamily: kidFont, fontWeight: 600 },
  '& .MuiInputLabel-root.Mui-focused': { color: kidColors.sky }
};
