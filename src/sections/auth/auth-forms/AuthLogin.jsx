import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import { preload } from 'swr';

// material-ui
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import IconButton from 'components/@extended/IconButton';
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { fetcher } from 'utils/axios';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

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

export default function AuthLogin({ forgot }) {
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn, login } = useAuth();
  const scriptedRef = useScriptRef();

  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <Formik
      initialValues={{ email: '', password: '', submit: null }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email('البريد الإلكتروني غير صحيح').max(255).required('البريد الإلكتروني مطلوب'),
        password: Yup.string()
          .required('كلمة المرور مطلوبة')
          .test('no-leading-trailing-whitespace', 'كلمة المرور لا يمكن أن تبدأ أو تنتهي بمسافة', (value) => value === value?.trim())
          .max(10, 'كلمة المرور يجب أن تكون أقل من 10 أحرف')
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const trimmedEmail = values.email.trim();
          await login(trimmedEmail, values.password);
          if (scriptedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
            preload('api/menu/dashboard', fetcher);
            const from = location.state?.from || '/dashboard';
            navigate(from, { replace: true });
          }
        } catch (err) {
          if (scriptedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.message });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Email */}
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="email-login">البريد الإلكتروني</InputLabel>
                <OutlinedInput
                  id="email-login"
                  type="email"
                  value={values.email}
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="example@email.com"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
              </Stack>
              {touched.email && errors.email && <FormHelperText error>{errors.email}</FormHelperText>}
            </Grid>

            {/* Password */}
            <Grid size={12}>
              <Stack sx={{ gap: 1 }}>
                <InputLabel htmlFor="password-login">كلمة المرور</InputLabel>
                <OutlinedInput
                  id="password-login"
                  type={showPassword ? 'text' : 'password'}
                  value={values.password}
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" color="secondary">
                        {showPassword ? <Eye /> : <EyeSlash />}
                      </IconButton>
                    </InputAdornment>
                  }
                  placeholder="******"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                />
              </Stack>
              {touched.password && errors.password && <FormHelperText error>{errors.password}</FormHelperText>}
            </Grid>

            {/* Forgot Password */}
            <Grid size={12} sx={{ mt: -1 }}>
              <Typography variant="body2" align="left">
                <Link
                  variant="subtitle2"
                  component={RouterLink}
                  to={isLoggedIn && forgot ? forgot : '/forgot-password'}
                  color="text.secondary"
                >
                  نسيت كلمة المرور؟
                </Link>
              </Typography>
            </Grid>

            {/* Submit Error */}
            {errors.submit && (
              <Grid size={12}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Grid>
            )}

            {/* Login Button */}
            <Grid size={12}>
              <AnimateButton>
                <Button disableElevation disabled={isSubmitting} fullWidth size="large" type="submit" variant="contained" color="primary">
                  دخول
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

            {/* Google Login */}
            <Grid size={12}>
              <AnimateButton>
                <Button fullWidth size="large" variant="outlined" color="secondary" startIcon={<GoogleIcon />} sx={{ gap: 1 }}>
                  التسجيل عبر جوجل
                </Button>
              </AnimateButton>
            </Grid>

            {/* Register Link */}
            <Grid size={12}>
              <Typography variant="body2" align="center">
                ليس لديك حساب؟&nbsp;
                <Link variant="subtitle2" component={RouterLink} to="/register">
                  تسجيل عضو جديد
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

AuthLogin.propTypes = { forgot: PropTypes.string };
