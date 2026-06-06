import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Fade } from '@mui/material';
import img from 'assets/images/test.jpeg';

export default function GoalsPrinciples({ shouldAnimate = false }) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (shouldAnimate) setChecked(true);
  }, [shouldAnimate]);

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: { xs: 8, md: 10 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 6 } }}>
            <Typography
              variant="h1"
              sx={{
                fontWeight: 700,
                color: 'primary.main'
              }}
            >
              ملتزمون بأهداف طموحة ومبادئ أساسية
            </Typography>
          </Box>

          {/* Grid */}
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: { xs: 3, md: 4 }
            }}
          >
            {/* 1 - Goals */}
            <CardBox sx={{ order: { xs: 1, md: 2 } }}>
              <Typography sx={titleStyle}>الأهداف والطموحات:</Typography>

              <Typography sx={textStyle}>• ترسيخ مفهوم أن التربية تُعلم والتعليم يُربي.</Typography>
              <Typography sx={textStyle}>• التخصص في مجال التربية والتعليم للأطفال.</Typography>
              <Typography sx={textStyle}>• الدمج بين متعة التعلم وسهولة الاستخدام.</Typography>
              <Typography sx={textStyle}>• إمتلاك أدوات وأساليب تربوية تعليمية مبتكرة وإبداعية.</Typography>
              <Typography sx={textStyle}>• إيجاد بيئة تربوية صحية واجتماعية للطفل تساعده على الإبداع.</Typography>
              <Typography sx={textStyle}>• المساهمة في حل مشكلة التعليم في مصر والعالم العربي.</Typography>
              <Typography sx={textStyle}>• تقديم جودة عالية مقابل تكلفة مناسبة.</Typography>
            </CardBox>

            {/* 2 - Image */}
            <ImageBox src={img} sx={{ order: { xs: 2, md: 1 } }} />

            {/* 3 - Principles */}
            <CardBox sx={{ order: { xs: 3, md: 3 } }}>
              <Typography sx={titleStyle}>المبادئ الأساسية:</Typography>

              <Typography sx={textStyle}>• <strong>الغرس:</strong> نغرس بذور المعرفة السليمة من تربية وتعليم داخل أطفالنا ليصبحوا زهور متفتحة ومفيدة.</Typography>
              <Typography sx={textStyle}>• <strong>المتابعة:</strong> نسقي البذور التي غرسناها بالحب والمتابعة داخل أطفالنا ونتابع نموها تدريجيًا وبشغف.</Typography>
              <Typography sx={textStyle}>• <strong>الحصاد:</strong> بعد غرس وسقي بذور المعرفة داخل أطفالنا نحصد ثمرة يانعة مذاقها حلو لشباب واعي ورجال عقلاء.</Typography>
              <Typography sx={textStyle}>• <strong>النزاهة:</strong> نعمل بجهد وصدق لوضع الثقة في قلوب شركائنا.</Typography>
              <Typography sx={textStyle}>• <strong>الالتزام:</strong> ملتزمون بتنمية وتطوير مجتمعنا والاهتمام بالنشء الصغير.</Typography>
              <Typography sx={textStyle}>• <strong>الكفاءة:</strong> نحرص على امتلاك الكفاءات العالية والمتنوعة في جميع تخصصاتنا.</Typography>
              <Typography sx={textStyle}>• <strong>الجودة:</strong> نسعى دائمًا لتحقيق أعلى درجات الجودة المُرضية.</Typography>
              <Typography sx={textStyle}>• <strong>روح الفريق:</strong> نعمل جميعًا متعاونين كفريق واحد ونتشارك المعلومات والخبرات والحياة الاجتماعية.</Typography>
            </CardBox>

            {/* 4 - Image */}
            <ImageBox src={img} sx={{ order: { xs: 4, md: 4 } }} />
          </Box>
        </Container>
      </Box>
    </Fade>
  );
}

/* ================= UI Components ================= */

function CardBox({ children, sx = {} }) {
  return (
    <Box
      sx={{
        background: 'rgba(255,255,255,0.75)',
        border: '2px solid #00AEEF',
        borderRadius: '12px',
        p: { xs: 3, md: 4 },
        minHeight: { xs: 200, md: 220 },
        backdropFilter: 'blur(4px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        // textAlign: 'right',
        ...sx
      }}
    >
      {children}
    </Box>
  );
}

function ImageBox({ src, sx = {} }) {
  return (
    <Box
      sx={{
        borderRadius: '12px',
        overflow: 'hidden',
        height: { xs: 200, sm: 260, md: 220 },
        backgroundColor: '#eee',
        ...sx
      }}
    >
      <Box
        component="img"
        src={src}
        alt=""
        sx={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      />
    </Box>
  );
}

/* ================= Styles ================= */

const titleStyle = {
  fontWeight: 800,
  fontSize: { xs: '16px', md: '18px' },
  mb: 2,
  color: '#2F2B3D',
  lineHeight: 1.7
};

const textStyle = {
  fontSize: { xs: '14px', md: '15px' },
  lineHeight: 2,
  color: '#555'
};
