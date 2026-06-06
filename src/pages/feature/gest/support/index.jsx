import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Fade, Button } from '@mui/material';
import SEO from 'components/SEO';
import vodafoneImg from 'assets/Home/vodafone (1).png';
import instaImg from 'assets/Home/insta (1).png';
import paypalImg from 'assets/Home/paypal (1).png';
import qnb_bankImg from 'assets/Home/qnb-bank (1).png';
import patreonImg from 'assets/Home/patreon (1).png';
import coffeeImg from 'assets/Home/coffee (1).png';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);
  const handle = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <Button
      onClick={handle}
      size="small"
      variant="outlined"
      sx={{
        mt: 1,
        borderRadius: '8px',
        borderColor: copied ? 'success.main' : '#FFD666',
        color: copied ? 'success.main' : '#2E2A39',
        fontSize: '12px',
        fontWeight: 600,
        px: 2,
        '&:hover': { borderColor: '#FFD666', backgroundColor: 'rgba(255,214,102,0.08)' }
      }}
    >
      {copied ? '✓ تم النسخ' : 'نسخ'}
    </Button>
  );
}

export default function Support() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  const linkButton = (label, href) => (
    <Button
      variant="contained"
      href={href}
      target="_blank"
      sx={{
        px: 4,
        py: 1,
        borderRadius: '12px',
        backgroundColor: '#FFD666',
        color: '#2E2A39',
        fontWeight: 700,
        boxShadow: '0 8px 20px rgba(255, 214, 102, 0.3)',
        '&:hover': { backgroundColor: '#ffcf4d' }
      }}
    >
      {label}
    </Button>
  );

  const supportMethods = [
    {
      id: 'qnb',
      image: qnb_bankImg,
      content: (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 0.5 }}>حمدي محمود عشري عثمان</Typography>
          <Typography variant="h6" sx={{ letterSpacing: '1px', mb: 0.5, direction: 'ltr' }}>1020518304835</Typography>
          <CopyButton text="1020518304835" />
          <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>فرع ش شامبليون، وسط القاهرة، قصر النيل</Typography>
        </Box>
      )
    },
    {
      id: 'instapay',
      image: instaImg,
      content: (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>اسم المستخدم: qnb-hamdy</Typography>
          <CopyButton text="qnb-hamdy" />
        </Box>
      )
    },
    {
      id: 'wallets',
      // title: 'المحافظ الإلكترونية',
      image: vodafoneImg,
      content: (
        <Box sx={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 0.5 }}>رقم التحويل: 01067007977</Typography>
          <CopyButton text="01067007977" />
          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600, display: 'block', mt: 1 }}>الرقم خاص بالدعم فقط — داخل مصر</Typography>
        </Box>
      )
    },
    {
      id: 'bmc',
      title: 'Buy Me a Coffee',
      image: coffeeImg,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          {linkButton('هنا', 'https://www.buymeacoffee.com/HamdyMahmoud')}
        </Box>
      )
    },
    {
      id: 'patreon',
      title: 'باتريون Patreon',
      image: patreonImg,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          {linkButton('هنا', 'https://www.patreon.com/NabtaStudio')}
        </Box>
      )
    },
    {
      id: 'paypal',
      title: 'باي بال PayPal',
      image: paypalImg,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          {linkButton('هنا', 'https://paypal.me/HamdyMahmoudAshry')}
        </Box>
      )
    }
  ];

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <SEO 
          title="كيف تدعمنا" 
          description="ساهم ودعم استمرار منصة أستوديو نبتة لتقديم محتوى تعليمي وتربوي قيم وآمن للأطفال. تعرف على طرق الدعم المتنوعة المتاحة."
          keywords="دعم أستوديو نبتة, التبرع للتعليم, منصات تعليم الأطفال, تمويل محتوى تربوي"
          url="/support"
        />
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              كيف تدعمنا؟
            </Typography>
          </Box>

          {/* Description Block */}
          <Box sx={{ mb: 8 }}>

            <Paper
              elevation={0}
              sx={{
                p: { xs: 3, md: 5 },
                borderRadius: '24px',
                backgroundColor: '#fff',
                boxShadow: '0 10px 40px rgba(0,0,0,0.03)',
                border: '1px solid',
                borderColor: 'divider'
              }}
            >
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, color: '#2E2A39', lineHeight: 1.6 }}>
                أهلاً ومرحباً بالداعم الكريم.. يمكنك دعمنا بطرق متعددة مثل:
              </Typography>
              <Typography variant="body1" sx={{ fontWeight: 600, color: '#0088CC', mb: 4, fontSize: '18px' }}>
                الرأي والمشورة - مشاركة المحتوى - الدعم المادي - الدعاء
              </Typography>
              <Box sx={{ p: 3, backgroundColor: '#fff4e5', borderRadius: '16px', borderRight: '4px solid #FFD666' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#b27b00', mb: 1 }}>
                  ملاحظة !
                </Typography>
                <Typography variant="body1" sx={{ color: '#5c4100', lineHeight: 1.8, fontWeight: 500 }}>
                  قبل اتخاذك القرار بدعمنا مالياً فاعلم أنه لا يوجد مزايا خاصة لهذا النوع من الدعم، فاجعل نيتك خالصة ليكون الدعم لاستمرار
                  المنصة ولنشر ما ينفع الناس.
                </Typography>
              </Box>
            </Paper>
          </Box>

          {/* Support Methods Grid */}
          <Grid container spacing={3}>
            {supportMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Paper
                  elevation={0}
                  sx={{
                    height: '100%',
                    borderRadius: '10px',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                      transform: 'translateY(-5px)',
                      borderColor: '#FFD666'
                    }
                  }}
                >
                  {/* Image — top full width */}
                  <Box
                    sx={{
                      width: '100%',

                      backgroundColor: '#f8f8f8',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid',
                      borderColor: 'divider',
                      // p: 2
                    }}
                  >
                    <Box
                      component="img"
                      src={method.image}
                      alt={method.title}
                      sx={{ maxWidth: '100%', objectFit: 'contain' }}
                    />
                  </Box>

                  {/* Content — bottom */}
                  <Box sx={{ p: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: '#2E2A39', mb: 2, textAlign: 'center' }}>
                      {method.title}
                    </Typography>
                    {method.content}
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
}
