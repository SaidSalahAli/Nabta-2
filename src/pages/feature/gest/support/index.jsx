import React, { useState, useEffect } from 'react';
import { Box, Typography, Container, Grid, Paper, Fade, Button } from '@mui/material';
import { Bank, CardPos, Mobile, Coffee, Global, Heart } from 'iconsax-react';

export default function Support() {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    setChecked(true);
  }, []);

  // Support methods data
  const supportMethods = [
    {
      id: 'qnb',
      title: 'حساب بنكي',
      icon: <Bank size="40" color="#FFD666" variant="Bold" />,
      content: (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, color: '#2E2A39' }}>
            QNB
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 700, mb: 1 }}>
            حمدي محمود عشري عثمان
          </Typography>
          <Typography variant="h6" sx={{ letterSpacing: '1px', mb: 1, dir: 'ltr' }}>
            1020518304835
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            فرع ش شامبليون، وسط البلد، قصر النيل
          </Typography>
        </Box>
      )
    },
    {
      id: 'instapay',
      title: 'إنستاباي Instapay',
      icon: <CardPos size="40" color="#FFD666" variant="Bold" />,
      content: (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            اسم المستخدم:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#0088CC', dir: 'ltr' }}>
            qnb-hamdy
          </Typography>
        </Box>
      )
    },
    {
      id: 'wallets',
      title: 'المحافظ الإلكترونية',
      icon: <Mobile size="40" color="#FFD666" variant="Bold" />,
      content: (
        <Box sx={{ textAlign: 'center', mt: 1 }}>
          <Typography variant="body2" sx={{ mb: 1, color: 'text.secondary' }}>
            (فودافون كاش، أورانج، وي، اتصالات)
          </Typography>
          <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
            رقم التحويل:
          </Typography>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2, letterSpacing: '1px', dir: 'ltr' }}>
            01067007977
          </Typography>
          <Typography variant="caption" sx={{ color: 'error.main', fontWeight: 600, display: 'block' }}>
            الرقم خاص بالدعم فقط وليس للاتصال منعاً للإحراج
          </Typography>
        </Box>
      )
    },
    {
      id: 'bmc',
      title: 'Buy Me a Coffee',
      icon: <Coffee size="40" color="#FFD666" variant="Bold" />,
      content: (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            href="#"
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
            هنا
          </Button>
        </Box>
      )
    },
    {
      id: 'patreon',
      title: 'باتريون Patreon',
      icon: <Heart size="40" color="#FFD666" variant="Bold" />,
      content: (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            href="#"
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
            هنا
          </Button>
        </Box>
      )
    },
    {
      id: 'paypal',
      title: 'باي بال PayPal',
      icon: <Global size="40" color="#FFD666" variant="Bold" />,
      content: (
        <Box sx={{ textAlign: 'center', mt: 2 }}>
          <Button
            variant="contained"
            href="#"
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
            هنا
          </Button>
        </Box>
      )
    }
  ];

  return (
    <Fade in={checked} timeout={800}>
      <Box sx={{ py: 6, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
        <Container maxWidth="lg">
          {/* Main Title */}
          <Box sx={{ mb: 6, textAlign: 'center' }}>
            <Typography variant="h1" sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
              كيف تدعمنا؟
            </Typography>
            <Box sx={{ width: '80px', height: '4px', backgroundColor: '#FFD666', mx: 'auto', borderRadius: '2px' }} />
          </Box>

          {/* Description Block */}
          <Box sx={{ mb: 8 }}>
            <Typography
              variant="h3"
              sx={{
                fontWeight: 800,
                color: '#2E2A39',
                mb: 3,
                display: 'inline-block',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: '-8px',
                  right: 0,
                  width: '50%',
                  height: '4px',
                  backgroundColor: '#0088CC',
                  borderRadius: '2px'
                }
              }}
            >
              نبذة
            </Typography>
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

              <Box sx={{ p: 3, backgroundColor: '#fff4e5', borderRadius: '16px', borderLeft: '4px solid #FFD666' }}>
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
          <Grid container spacing={4}>
            {supportMethods.map((method) => (
              <Grid item xs={12} sm={6} md={4} key={method.id}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: '100%',
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: 'divider',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                      transform: 'translateY(-5px)',
                      borderColor: '#FFD666'
                    }
                  }}
                >
                  <Box sx={{ mb: 2 }}>{method.icon}</Box>
                  <Typography variant="h5" sx={{ fontWeight: 700, color: '#2E2A39', mb: 3, textAlign: 'center' }}>
                    {method.title}
                  </Typography>
                  <Box sx={{ mt: 'auto', width: '100%' }}>{method.content}</Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Fade>
  );
}
