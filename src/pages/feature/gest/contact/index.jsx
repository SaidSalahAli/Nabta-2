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
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Link from '@mui/material/Link';
import SEO from 'components/SEO';

// Social icons (SVG inline)
const TikTokIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.28a8.18 8.18 0 004.78 1.52V7.35a4.85 4.85 0 01-1.01-.66z" /></svg>);
const TwitterXIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>);
const LinkedInIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>);
const WhatsAppIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" /></svg>);

// ==============================|| CONTACT PAGE ||============================== //

const contactInfo = [
  {
    icon: <Sms size={28} color="#0088CC" variant="Bold" />,
    label: 'البريد الإلكتروني',
    value: 'contact@nabtastudio.com',
    href: 'mailto:contact@nabtastudio.com'
  },
  {
    icon: <WhatsAppIcon />,
    label: 'واتساب',
    value: '+20 100 756 0466',
    href: 'https://wa.me/201007560466'
  },

  {
    icon: <MessageText size={28} color="#0088CC" variant="Bold" />,
    label: 'أوقات الدعم',
    value: 'السبت إلى الأربعاء | 9 صباحًا : 5 مسائًا',
    href: null
  }
];

const socialLinks = [
  { icon: <WhatsAppIcon />, label: 'WhatsApp', href: 'https://wa.me/201007560466' },
  { icon: <Call size={20} />, label: 'Telegram', href: 'https://t.me/+201007560466' },
  { icon: <TwitterXIcon />, label: 'Twitter / X', href: 'https://twitter.com/NabtaStudio' },
  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://www.tiktok.com/@nabta_studio' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/NabtaStudio' }
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
          <SEO
            title="تواصل معنا"
            description="تواصل مع فريق منصة نبتة. يسعدنا استقبال استفساراتكم واقتراحاتكم لتطوير محتوى الأطفال ودعم أولياء الأمور."
            keywords="تواصل معنا منصة نبتة, رقم منصة نبتة, البريد الإلكتروني لمنصة نبتة, اقتراحات شكاوى"
            url="/contact"
          />
          <Container maxWidth="lg">
            {/* Header */}
            <Box sx={{ mb: 8, textAlign: 'center' }}>
              <Typography
                variant="h1"
                sx={{ fontWeight: 800, color: 'primary.main', mb: 2, fontSize: { xs: '2.2rem', md: '3.2rem' } }}
              >
                تواصل معنا
              </Typography>
              <Typography variant="h6" sx={{ color: 'text.secondary', fontWeight: 400, maxWidth: 500, mx: 'auto' }}>
                تحتاج للتواصل معنا لأي سبب؟
                أرسل لنا وسنقوم بالرد عليك في القريب العاجل.
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
                      component={item.href ? 'a' : 'div'}
                      href={item.href || undefined}
                      target={item.href ? '_blank' : undefined}
                      rel={item.href ? 'noopener noreferrer' : undefined}
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: 2,
                        textDecoration: 'none',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          boxShadow: '0 12px 30px rgba(0,136,204,0.1)',
                          borderColor: '#0088CC',
                          transform: 'translateY(-2px)'
                        }
                      }}
                    >
                      <Box sx={{ width: 52, height: 52, borderRadius: '14px', backgroundColor: '#E8F4FD', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, color: '#0088CC' }}>
                        {item.icon}
                      </Box>
                      <Box>
                        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>{item.label}</Typography>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#2E2A39', mt: 0.5 }}>{item.value}</Typography>
                      </Box>
                    </Paper>
                  ))}



                  {/* Decorative Card */}
                  <Paper elevation={0} sx={{ p: 4, borderRadius: '20px', background: 'linear-gradient(135deg, #0088CC 0%, #006699 100%)', color: '#fff', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>يسعدنا سماعك!</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, lineHeight: 1.8 }}>فريقنا جاهز للرد على جميع استفساراتك واقتراحاتك</Typography>
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
