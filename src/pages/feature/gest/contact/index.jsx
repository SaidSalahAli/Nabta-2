import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Paper,
  Fade,
  TextField,
  Button,
  Stack,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar
} from '@mui/material';
import { User, Sms, Call, MessageText, Send } from 'iconsax-react';
import { createContactMessage } from 'api/contactMessages';

// ==============================|| CONTACT PAGE ||============================== //

const contactInfo = [
  {
    icon: <Sms size={28} color="#0088CC" variant="Bold" />,
    label: 'البريد الإلكتروني',
    value: 'info@nabtastudio.com'
  },
  {
    icon: <Call size={28} color="#0088CC" variant="Bold" />,
    label: 'رقم الهاتف',
    value: '+20 106 653 6008'
  },
  {
    icon: <MessageText size={28} color="#0088CC" variant="Bold" />,
    label: 'ساعات الدعم',
    value: 'السبت – الخميس، 9 صباحاً – 10 مساءً'
  }
];

const initialForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

const initialErrors = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
};

function validate(values) {
  const errs = { ...initialErrors };
  if (!values.name.trim()) errs.name = 'الاسم مطلوب';
  if (!values.email.trim()) errs.email = 'البريد الإلكتروني مطلوب';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'بريد إلكتروني غير صالح';
  if (!values.subject.trim()) errs.subject = 'الموضوع مطلوب';
  if (!values.message.trim()) errs.message = 'الرسالة مطلوبة';
  return errs;
}

function hasErrors(errs) {
  return Object.values(errs).some((v) => v !== '');
}

export default function Contact() {
  const [checked, setChecked] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    setChecked(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const updated = { ...form, [name]: value };
      setErrors(validate(updated));
    }
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const allTouched = Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (hasErrors(errs)) return;

    setLoading(true);
    try {
      await createContactMessage(form);
      setSnack({ open: true, message: 'تم إرسال رسالتك بنجاح، سنتواصل معك قريباً!', severity: 'success' });
      setForm(initialForm);
      setTouched({});
    } catch (err) {
      setSnack({
        open: true,
        message: err?.message || 'حدث خطأ أثناء إرسال الرسالة، حاول مجدداً.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Fade in={checked} timeout={800}>
        <Box sx={{ py: 8, width: '100%', minHeight: '100vh', backgroundColor: '#fcfcfc' }}>
          <Container maxWidth="lg">
            {/* Header */}
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{ fontWeight: 800, color: 'text.primary', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}
              >
                تواصل معنا
              </Typography>
              <Box sx={{ width: '80px', height: '4px', backgroundColor: '#FFD666', mx: 'auto', borderRadius: '2px', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
                نحن هنا للإجابة على استفساراتك، أرسل لنا رسالة وسنتواصل معك في أقرب وقت
              </Typography>
            </Box>

            <Grid container spacing={5} alignItems="flex-start">
              {/* Contact Info */}
              <Grid item xs={12} md={4}>
                <Stack spacing={3}>
                  {contactInfo.map((item, i) => (
                    <Paper
                      key={i}
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 12px 30px rgba(0,136,204,0.1)',
                          borderColor: '#0088CC',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box
                        sx={{
                          width: 52,
                          height: 52,
                          borderRadius: '14px',
                          backgroundColor: '#E8F4FD',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0
                        }}
                      >
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
                          {item.label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#2E2A39', mt: 0.5 }}>
                          {item.value}
                        </Typography>
                      </Box>
                    </Paper>
                  ))}

                  {/* Decorative Card */}
                  <Paper
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: '20px',
                      background: 'linear-gradient(135deg, #0088CC 0%, #006699 100%)',
                      color: '#fff',
                      textAlign: 'center'
                    }}
                  >
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                      يسعدنا سماعك!
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>
                      فريقنا جاهز للرد على جميع استفساراتك واقتراحاتك
                    </Typography>
                  </Paper>
                </Stack>
              </Grid>

              {/* Contact Form */}
              <Grid item xs={12} md={8}>
                <Paper
                  elevation={0}
                  sx={{
                    p: { xs: 3, md: 5 },
                    borderRadius: '24px',
                    border: '1px solid',
                    borderColor: 'divider',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.04)'
                  }}
                >
                  <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, color: '#2E2A39' }}>
                    أرسل رسالتك
                  </Typography>

                  <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={3}>
                      {/* Name */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="contact-name"
                          name="name"
                          label="الاسم الكامل"
                          value={form.name}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.name && Boolean(errors.name)}
                          helperText={touched.name && errors.name}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <User size={20} color="#0088CC" />
                              </InputAdornment>
                            )
                          }}
                          sx={fieldSx}
                        />
                      </Grid>

                      {/* Email */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="contact-email"
                          name="email"
                          label="البريد الإلكتروني"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.email && Boolean(errors.email)}
                          helperText={touched.email && errors.email}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Sms size={20} color="#0088CC" />
                              </InputAdornment>
                            )
                          }}
                          sx={fieldSx}
                        />
                      </Grid>

                      {/* Phone */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="contact-phone"
                          name="phone"
                          label="رقم الهاتف (اختياري)"
                          value={form.phone}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <Call size={20} color="#0088CC" />
                              </InputAdornment>
                            )
                          }}
                          sx={fieldSx}
                        />
                      </Grid>

                      {/* Subject */}
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          id="contact-subject"
                          name="subject"
                          label="الموضوع"
                          value={form.subject}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.subject && Boolean(errors.subject)}
                          helperText={touched.subject && errors.subject}
                          sx={fieldSx}
                        />
                      </Grid>

                      {/* Message */}
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          id="contact-message"
                          name="message"
                          label="رسالتك"
                          multiline
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={touched.message && Boolean(errors.message)}
                          helperText={touched.message && errors.message}
                          InputProps={{
                            startAdornment: (
                              <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}>
                                <MessageText size={20} color="#0088CC" />
                              </InputAdornment>
                            )
                          }}
                          sx={fieldSx}
                        />
                      </Grid>

                      {/* Submit */}
                      <Grid item xs={12}>
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={loading}
                          size="large"
                          endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <Send size={20} />}
                          sx={{
                            px: 6,
                            py: 1.6,
                            borderRadius: '14px',
                            fontWeight: 700,
                            fontSize: '1.05rem',
                            backgroundColor: '#0088CC',
                            boxShadow: '0 8px 24px rgba(0,136,204,0.3)',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                              backgroundColor: '#006699',
                              boxShadow: '0 12px 30px rgba(0,136,204,0.4)',
                              transform: 'translateY(-2px)'
                            },
                            '&:disabled': { opacity: 0.7 }
                          }}
                        >
                          {loading ? 'جاري الإرسال...' : 'إرسال الرسالة'}
                        </Button>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
      </Fade>

      <Snackbar
        open={snack.open}
        autoHideDuration={6000}
        onClose={() => setSnack((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={() => setSnack((s) => ({ ...s, open: false }))}
          severity={snack.severity}
          variant="filled"
          sx={{ borderRadius: '12px', fontWeight: 600 }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </>
  );
}

// Shared field styling
const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    backgroundColor: '#fafafa',
    transition: 'all 0.25s ease',
    '&:hover fieldset': { borderColor: '#0088CC' },
    '&.Mui-focused fieldset': {
      borderColor: '#0088CC',
      boxShadow: '0 0 0 3px rgba(0,136,204,0.1)'
    }
  },
  '& .MuiInputLabel-root.Mui-focused': { color: '#0088CC' }
};
