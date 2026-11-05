import React, { useEffect, useState } from 'react';
import { Box, Typography, Fade } from '@mui/material';
import principlesImg from 'assets/Home/principles.jpg';
import goalsImg from 'assets/Home/goals.jpg';
import { KidSection, SectionHeading, Sprout, Flower, kidColors, kidFont } from 'components/kids';

const goals = [
  'ترسيخ مفهوم أن التربية تُعلم والتعليم يُربي.',
  'التخصص في مجال التربية والتعليم للأطفال.',
  'الدمج بين متعة التعلم وسهولة الاستخدام.',
  'إمتلاك أدوات وأساليب تربوية تعليمية مبتكرة وإبداعية.',
  'إيجاد بيئة تربوية صحية واجتماعية للطفل تساعده على الإبداع.',
  'المساهمة في حل مشكلة التعليم في مصر والعالم العربي.',
  'تقديم جودة عالية مقابل تكلفة مناسبة.'
];

const principles = [
  ['الغرس', 'نغرس بذور المعرفة السليمة من تربية وتعليم داخل أطفالنا ليصبحوا زهور متفتحة ومفيدة.'],
  ['المتابعة', 'نسقي البذور التي غرسناها بالحب والمتابعة داخل أطفالنا ونتابع نموها تدريجيًا وبشغف.'],
  ['الحصاد', 'بعد غرس وسقي بذور المعرفة داخل أطفالنا نحصد ثمرة يانعة مذاقها حلو لشباب واعي ورجال عقلاء.'],
  ['النزاهة', 'نعمل بجهد وصدق لوضع الثقة في قلوب شركائنا.'],
  ['الالتزام', 'ملتزمون بتنمية وتطوير مجتمعنا والاهتمام بالنشء الصغير.'],
  ['الكفاءة', 'نحرص على امتلاك الكفاءات العالية والمتنوعة في جميع تخصصاتنا.'],
  ['الجودة', 'نسعى دائمًا لتحقيق أعلى درجات الجودة المُرضية.'],
  ['روح الفريق', 'نعمل جميعًا متعاونين كفريق واحد ونتشارك المعلومات والخبرات والحياة الاجتماعية.']
];

function Bullet({ color }) {
  return (
    <Box component="svg" viewBox="0 0 20 20" aria-hidden="true" sx={{ width: 20, height: 20, flexShrink: 0, mt: '6px' }}>
      <path d="M10 18V9" stroke={kidColors.leafDeep} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M10 11C10 6 7 3 2 3c0 5 3 8 8 8Z" fill={color} />
      <path d="M10 9c0-4 3-7 8-7 0 4-3 7-8 7Z" fill={color} opacity=".8" />
    </Box>
  );
}

function ListCard({ title, accent, children, sx }) {
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '32px',
        border: `3px solid ${accent}`,
        boxShadow: `0 10px 0 ${accent}40`,
        p: { xs: 3, md: 4 },
        ...sx
      }}
    >
      <Typography
        component="h3"
        sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '1.4rem', md: '1.6rem' }, color: kidColors.ink, mb: 2 }}
      >
        {title}
      </Typography>
      <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'flex', flexDirection: 'column', gap: 1.25 }}>
        {children}
      </Box>
    </Box>
  );
}

function PhotoCard({ src, tilt, sx }) {
  return (
    <Box
      sx={{
        p: 1.25,
        backgroundColor: '#fff',
        borderRadius: '32px',
        transform: `rotate(${tilt}deg)`,
        boxShadow: `0 10px 0 ${kidColors.ink}14`,
        minHeight: { xs: 220, md: 'auto' },
        display: 'flex',
        ...sx
      }}
    >
      <Box
        component="img"
        src={src}
        alt=""
        loading="lazy"
        sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '24px', display: 'block' }}
      />
    </Box>
  );
}

const itemSx = {
  display: 'flex',
  gap: 1.25,
  fontFamily: kidFont,
  fontSize: { xs: '1rem', md: '1.08rem' },
  lineHeight: 1.85,
  color: kidColors.inkSoft
};

export default function GoalsPrinciples({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <KidSection
      bg={kidColors.cloud}
      wave
      decorations={
        <>
          <Sprout size={64} sx={{ top: 60, insetInlineStart: '5%' }} />
          <Flower size={40} sx={{ top: 90, insetInlineEnd: '7%' }} />
        </>
      }
    >
      <SectionHeading title="ملتزمون بأهداف طموحة ومبادئ أساسية" lineColor={kidColors.leaf} />

      <Fade in={checked} timeout={700}>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: { xs: 4, md: 5 } }}>
          <ListCard title="الأهداف والطموحات" accent={kidColors.sky} sx={{ order: { xs: 1, md: 2 } }}>
            {goals.map((g) => (
              <Box component="li" key={g} sx={itemSx}>
                <Bullet color={kidColors.leaf} />
                <span>{g}</span>
              </Box>
            ))}
          </ListCard>

          <PhotoCard src={goalsImg} tilt={-2} sx={{ order: { xs: 2, md: 1 } }} />

          <ListCard title="المبادئ الأساسية" accent={kidColors.berry} sx={{ order: 3 }}>
            {principles.map(([name, text]) => (
              <Box component="li" key={name} sx={itemSx}>
                <Bullet color={kidColors.coral} />
                <span>
                  <Box component="strong" sx={{ color: kidColors.ink, fontWeight: 800 }}>
                    {name}:
                  </Box>{' '}
                  {text}
                </span>
              </Box>
            ))}
          </ListCard>

          <PhotoCard src={principlesImg} tilt={2} sx={{ order: 4 }} />
        </Box>
      </Fade>
    </KidSection>
  );
}
