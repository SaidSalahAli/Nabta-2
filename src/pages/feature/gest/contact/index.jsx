import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  TextField,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  IconButton,
  Tooltip
} from '@mui/material';
import { User, Sms, Call, MessageText, Send, Clock } from 'iconsax-react';
import { createContactMessage } from 'api/contactMessages';
import SEO from 'components/SEO';
import { PageHero, KidButton, Sun, crayon, kidColors, kidFont, kidFieldSx, stickerCard } from 'components/kids';

const TikTokIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.34 6.34 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V9.28a8.18 8.18 0 004.78 1.52V7.35a4.85 4.85 0 01-1.01-.66z" />
  </svg>
);
const TelegramIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.665 3.717l-17.73 6.837c-1.21.486-1.203 1.161-.222 1.462l4.552 1.42 10.532-6.645c.498-.303.953-.14.579.192l-8.533 7.701h-.002l.002.001-.314 4.692c.46 0 .663-.211.921-.46l2.211-2.15 4.599 3.397c.848.467 1.457.227 1.668-.785l3.019-14.228c.309-1.239-.473-1.636-1.291-1.294z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const WhatsAppIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const contactInfo = [
  {
    icon: <Sms size={28} variant="Bold" />,
    label: 'البريد الإلكتروني',
    value: 'contact@nabtastudio.com',
    href: 'mailto:contact@nabtastudio.com',
    ltr: true
  },
  { icon: <WhatsAppIcon size={28} />, label: 'واتساب', value: '+20 100 756 0466', href: 'https://wa.me/201007560466', ltr: true },
  { icon: <Clock size={28} variant="Bold" />, label: 'أوقات الدعم', value: 'السبت إلى الأربعاء | 9 صباحًا : 5 مساءً', href: null }
];

const socialLinks = [
  { icon: <WhatsAppIcon />, label: 'WhatsApp', href: 'https://wa.me/201007560466' },
  { icon: <TelegramIcon />, label: 'Telegram', href: 'https://t.me/+201007560466' },
  { icon: <TikTokIcon />, label: 'TikTok', href: 'https://www.tiktok.com/@nabta_studio' },
  { icon: <LinkedInIcon />, label: 'LinkedIn', href: 'https://www.linkedin.com/in/NabtaStudio' }
];

const initialForm = { name: '', email: '', phone: '', subject: '', message: '' };
const initialErrors = { name: '', email: '', phone: '', subject: '', message: '' };

function validate(values) {
  const errs = { ...initialErrors };
  if (!values.name.trim()) errs.name = 'اكتب اسمك';
  if (!values.email.trim()) errs.email = 'اكتب بريدك الإلكتروني';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) errs.email = 'تأكد من كتابة البريد بشكل صحيح، مثل name@mail.com';
  if (!values.subject.trim()) errs.subject = 'اكتب موضوع الرسالة';
  if (!values.message.trim()) errs.message = 'اكتب رسالتك';
  return errs;
}

const hasErrors = (errs) => Object.values(errs).some((v) => v !== '');

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState(initialErrors);
  const [touched, setTouched] = useState({});
  const [loading, setLoading] = useState(false);
  const [snack, setSnack] = useState({ open: false, message: '', severity: 'success' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) setErrors(validate({ ...form, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors(validate(form));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTouched(Object.keys(form).reduce((acc, k) => ({ ...acc, [k]: true }), {}));
    const errs = validate(form);
    setErrors(errs);
    if (hasErrors(errs)) return;

    setLoading(true);
    try {
      await createContactMessage(form);
      setSnack({ open: true, message: 'وصلتنا رسالتك! سنرد عليك قريبًا.', severity: 'success' });
      setForm(initialForm);
      setTouched({});
    } catch (err) {
      setSnack({ open: true, message: err?.message || 'لم تُرسل الرسالة. تأكد من اتصالك بالإنترنت وحاول مرة أخرى.', severity: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const field = (name, label, icon, props = {}) => (
    <TextField
      fullWidth
      id={`contact-${name}`}
      name={name}
      label={label}
      value={form[name]}
      onChange={handleChange}
      onBlur={handleBlur}
      error={touched[name] && Boolean(errors[name])}
      helperText={touched[name] && errors[name]}
      InputProps={
        icon
          ? {
              startAdornment: (
                <InputAdornment position="start" sx={props.multiline ? { alignSelf: 'flex-start', mt: 1.5 } : undefined}>
                  {icon}
                </InputAdornment>
              )
            }
          : undefined
      }
      sx={kidFieldSx}
      {...props}
    />
  );

  return (
    <Box sx={{ backgroundColor: kidColors.cloud }}>
      <SEO
        title="تواصل معنا"
        description="تواصل مع فريق منصة نبتة. يسعدنا استقبال استفساراتكم واقتراحاتكم لتطوير محتوى الأطفال ودعم أولياء الأمور."
        keywords="تواصل معنا منصة نبتة, رقم منصة نبتة, البريد الإلكتروني لمنصة نبتة, اقتراحات شكاوى"
        url="/contact"
      />

      <PageHero title="تواصل معنا" description="عندك سؤال أو اقتراح؟ اكتب لنا وسنرد عليك في أقرب وقت." />

      <Container maxWidth="lg" sx={{ pt: { xs: 3, md: 4 }, pb: { xs: 6, md: 8 } }}>
        <Grid container spacing={{ xs: 4, md: 5 }} alignItems="flex-start">
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
              {contactInfo.map((item, i) => {
                const c = crayon(i);
                return (
                  <Box
                    key={item.label}
                    component={item.href ? 'a' : 'div'}
                    href={item.href || undefined}
                    target={item.href ? '_blank' : undefined}
                    rel={item.href ? 'noopener noreferrer' : undefined}
                    sx={{
                      ...stickerCard(c.main, { lift: Boolean(item.href) }),
                      p: 2.5,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      textDecoration: 'none'
                    }}
                  >
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        borderRadius: '18px',
                        backgroundColor: c.main,
                        color: c.text,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        boxShadow: `0 4px 0 ${c.deep}`,
                        '& svg': { color: c.text }
                      }}
                    >
                      {item.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                      <Typography sx={{ fontFamily: kidFont, color: kidColors.inkSoft, fontWeight: 700, fontSize: '0.95rem' }}>
                        {item.label}
                      </Typography>
                      <Typography
                        sx={{
                          fontFamily: kidFont,
                          fontWeight: 800,
                          color: kidColors.ink,
                          fontSize: '1.05rem',
                          wordBreak: 'break-word',
                          ...(item.ltr && { direction: 'ltr', textAlign: 'end' })
                        }}
                      >
                        {item.value}
                      </Typography>
                    </Box>
                  </Box>
                );
              })}

              <Box
                sx={{
                  position: 'relative',
                  p: 3.5,
                  borderRadius: '30px',
                  backgroundColor: kidColors.berry,
                  color: '#fff',
                  textAlign: 'center',
                  overflow: 'hidden'
                }}
              >
                <Sun size={70} alwaysShow sx={{ top: -16, insetInlineEnd: -14, opacity: 0.9 }} />
                <Typography sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: '1.4rem', mb: 1, position: 'relative' }}>
                  يسعدنا سماعك!
                </Typography>
                <Typography sx={{ fontFamily: kidFont, opacity: 0.92, lineHeight: 1.8, mb: 2.5, position: 'relative' }}>
                  تابعنا وشاركنا آراءك على منصاتنا
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 1.25, flexWrap: 'wrap', position: 'relative' }}>
                  {socialLinks.map((s) => (
                    <Tooltip key={s.label} title={s.label}>
                      <IconButton
                        component="a"
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        sx={{
                          width: 46,
                          height: 46,
                          borderRadius: '16px',
                          backgroundColor: '#fff',
                          color: kidColors.berry,
                          boxShadow: `0 4px 0 ${kidColors.berryDeep}`,
                          '&:hover': { backgroundColor: kidColors.sun, color: kidColors.ink }
                        }}
                      >
                        {s.icon}
                      </IconButton>
                    </Tooltip>
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={8}>
            <Box sx={{ ...stickerCard(kidColors.sky, { lift: false }), p: { xs: 3, md: 5 } }}>
              <Typography
                component="h2"
                sx={{ fontFamily: kidFont, fontWeight: 800, fontSize: { xs: '1.6rem', md: '1.9rem' }, color: kidColors.ink, mb: 3.5 }}
              >
                أرسل رسالتك
              </Typography>

              <Box component="form" onSubmit={handleSubmit} noValidate>
                <Grid container spacing={2.5}>
                  <Grid item xs={12} sm={6}>
                    {field('name', 'الاسم الكامل', <User size={22} color={kidColors.sky} />)}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {field('email', 'البريد الإلكتروني', <Sms size={22} color={kidColors.sky} />, { type: 'email' })}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {field('phone', 'رقم الهاتف (اختياري)', <Call size={22} color={kidColors.sky} />)}
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    {field('subject', 'الموضوع')}
                  </Grid>
                  <Grid item xs={12}>
                    {field('message', 'رسالتك', <MessageText size={22} color={kidColors.sky} />, { multiline: true, rows: 5 })}
                  </Grid>
                  <Grid item xs={12}>
                    <KidButton
                      type="submit"
                      color="sky"
                      size="large"
                      disabled={loading}
                      endIcon={loading ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : <Send size={20} color="#fff" />}
                      sx={{ width: { xs: '100%', sm: 'auto' } }}
                    >
                      {loading ? 'جاري الإرسال...' : 'أرسل الرسالة'}
                    </KidButton>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

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
          sx={{ borderRadius: '18px', fontFamily: kidFont, fontWeight: 700, fontSize: '1rem' }}
        >
          {snack.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
