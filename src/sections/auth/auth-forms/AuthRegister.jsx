import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import { openSnackbar } from 'api/snackbar';
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { strengthColor, strengthIndicator } from 'utils/password-strength';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

const countries = [
  { code: 'EG', label: 'مصر' },
  { code: 'SA', label: 'السعودية' },
  { code: 'AE', label: 'الإمارات' },
  { code: 'KW', label: 'الكويت' },
  { code: 'QA', label: 'قطر' },
  { code: 'BH', label: 'البحرين' },
  { code: 'OM', label: 'عُمان' },
  { code: 'JO', label: 'الأردن' },
  { code: 'LB', label: 'لبنان' },
  { code: 'IQ', label: 'العراق' },
  { code: 'LY', label: 'ليبيا' },
  { code: 'TN', label: 'تونس' },
  { code: 'DZ', label: 'الجزائر' },
  { code: 'MA', label: 'المغرب' },
  { code: 'SD', label: 'السودان' },
  { code: 'YE', label: 'اليمن' },
  { code: 'SY', label: 'سوريا' },
  { code: 'PS', label: 'فلسطين' },
  { code: 'OTHER', label: 'أخرى' }
];

// Google logo SVG inline
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.31-8.16 2.31-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

export default function AuthRegister() {
  const { register } = useAuth();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();

  const [level, setLevel] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  const changePassword = (value) => {
    const temp = strengthIndicator(value);
    setLevel(strengthColor(temp));
  };

  useEffect(() => {
    changePassword('');
  }, []);

  return (
    <Formik
      initialValues={{
        firstname: '',
        lastname: '',
        country: '',
        email: '',
        mobail: '',
        password: '',
        confirmPassword: '',
        submit: null
      }}
      validationSchema={Yup.object().shape({
        firstname: Yup.string().max(255).required('الاسم مطلوب'),
        lastname: Yup.string().max(255).required('اسم العائلة مطلوب'),
        country: Yup.string().required('الدولة مطلوبة'),
        email: Yup.string().email('البريد الإلكتروني غير صحيح').max(255).required('البريد الإلكتروني مطلوب'),
        mobail: Yup.string()
          .matches(/^[0-9]+$/, 'رقم الهاتف غير صحيح')
          .min(10, 'رقم الهاتف قصير')
          .required('رقم الهاتف مطلوب'),
        password: Yup.string()
          .required('كلمة المرور مطلوبة')
          .test('no-leading-trailing-whitespace', 'كلمة المرور لا يمكن أن تبدأ أو تنتهي بمسافة', (value) => value === value?.trim())
          .max(10, 'كلمة المرور يجب أن تكون أقل من 10 أحرف'),
        confirmPassword: Yup.string()
          .required('تأكيد كلمة المرور مطلوب')
          .oneOf([Yup.ref('password')], 'كلمتا المرور غير متطابقتين')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await register(values.email.trim(), values.password, values.firstname, values.lastname, values.mobail);

          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            openSnackbar({
              open: true,
              message: 'تم إنشاء الحساب بنجاح!',
              variant: 'alert',
              alert: { color: 'success' }
            });
            setTimeout(() => navigate('/auth/login', { replace: true }), 1500);
          }
        } catch (err) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            
            let errorMsg = 'حدث خطأ، حاول مرة أخرى';
            if (err && (err.message === 'Email already exists' || err.message === 'Email already Exist')) {
              errorMsg = 'هذا البريد الإلكتروني مسجل بالفعل. يرجى استخدام بريد إلكتروني آخر أو تسجيل الدخول.';
            } else if (err && err.errors?.Mobail) {
              errorMsg = err.errors.Mobail;
            } else if (err && err.message) {
              errorMsg = err.message;
            }
            
            setErrors({ submit: errorMsg });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Section Label */}
            <Grid size={12}>
              <Typography variant="subtitle1" sx={{ fontWeight: 700, color: 'text.primary', mb: -1 }}>
                تسجيل حساب جديد
              </Typography>
            </Grid>

            {/* First Name */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.firstname && errors.firstname)}>
                <InputLabel htmlFor="firstname-signup">الاسم *</InputLabel>
                <OutlinedInput
                  id="firstname-signup"
                  value={values.firstname}
                  name="firstname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="محمد"
                  label="الاسم *"
                />
              </FormControl>
              {touched.firstname && errors.firstname && <FormHelperText error>{errors.firstname}</FormHelperText>}
            </Grid>

            {/* Last Name */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.lastname && errors.lastname)}>
                <InputLabel htmlFor="lastname-signup">اسم العائلة *</InputLabel>
                <OutlinedInput
                  id="lastname-signup"
                  value={values.lastname}
                  name="lastname"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أحمد"
                  label="اسم العائلة *"
                />
              </FormControl>
              {touched.lastname && errors.lastname && <FormHelperText error>{errors.lastname}</FormHelperText>}
            </Grid>

            {/* Country */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.country && errors.country)}>
                <InputLabel id="country-signup-label">اختر الدولة *</InputLabel>
                <Select
                  labelId="country-signup-label"
                  id="country-signup"
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="اختر الدولة *"
                >
                  {countries.map((c) => (
                    <MenuItem key={c.code} value={c.code}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              {touched.country && errors.country && <FormHelperText error>{errors.country}</FormHelperText>}
            </Grid>

            {/* Phone */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.mobail && errors.mobail)}>
                <InputLabel htmlFor="mobail-signup">رقم الهاتف *</InputLabel>
                <OutlinedInput
                  id="mobail-signup"
                  type="tel"
                  value={values.mobail}
                  name="mobail"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="01006300000"
                  label="رقم الهاتف *"
                />
              </FormControl>
              {touched.mobail && errors.mobail && <FormHelperText error>{errors.mobail}</FormHelperText>}
            </Grid>

            {/* Email */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.email && errors.email)}>
                <InputLabel htmlFor="email-signup">البريد الإلكتروني *</InputLabel>
                <OutlinedInput
                  id="email-signup"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  label="البريد الإلكتروني *"
                />
              </FormControl>
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </Grid>

            {/* Password */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.password && errors.password)}>
                <InputLabel htmlFor="password-signup">كلمة المرور *</InputLabel>
                <OutlinedInput
                  id="password-signup"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={(e) => {
                    handleChange(e);
                    changePassword(e.target.value);
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" color="secondary">
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  label="كلمة المرور *"
                />
              </FormControl>
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
              <FormControl fullWidth sx={{ mt: 2 }}>
                <Grid container spacing={2} sx={{ alignItems: 'center' }}>
                  <Grid>
                    <Box sx={{ bgcolor: level?.color, width: 85, height: 8, borderRadius: '7px' }} />
                  </Grid>
                  <Grid>
                    <Typography variant="subtitle1" sx={{ fontSize: '0.75rem' }}>
                      {level?.label}
                    </Typography>
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            {/* Confirm Password */}
            <Grid size={12}>
              <FormControl fullWidth error={Boolean(touched.confirmPassword && errors.confirmPassword)}>
                <InputLabel htmlFor="confirm-password-signup">تأكيد كلمة المرور *</InputLabel>
                <OutlinedInput
                  id="confirm-password-signup"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={values.confirmPassword}
                  name="confirmPassword"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        onClick={handleClickShowConfirmPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                        color="secondary"
                      >
                        {showConfirmPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  label="تأكيد كلمة المرور *"
                />
              </FormControl>
              {touched.confirmPassword && errors.confirmPassword && <FormHelperText error>{errors.confirmPassword}</FormHelperText>}
            </Grid>

            {/* Submit Error */}
            {errors.submit && (
              <Grid size={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            {/* Submit Button */}
            <Grid size={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  سجل الآن
                </Button>
              </AnimateButton>
            </Grid>

            {/* Divider */}
            <Grid size={12}>
              <Divider>
                <Typography variant="caption" sx={{ color: 'text.secondary', px: 1 }}>
                  أو
                </Typography>
              </Divider>
            </Grid>

            {/* Google Register */}
            <Grid size={12}>
              <AnimateButton>
                <Button fullWidth size="large" variant="outlined" color="secondary" startIcon={<GoogleIcon />} sx={{ gap: 1 }}>
                  التسجيل عبر جوجل
                </Button>
              </AnimateButton>
            </Grid>

            {/* Login Link */}
            <Grid size={12}>
              <Typography variant="body2" align="center">
                لديك حساب بالفعل؟&nbsp;
                <Link variant="subtitle2" component={RouterLink} to="/auth/login">
                  تسجيل الدخول
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}
