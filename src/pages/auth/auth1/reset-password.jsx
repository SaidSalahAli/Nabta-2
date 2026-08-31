import React from 'react';
import { Link as RouterLink, useNavigate, useSearchParams } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { motion } from 'framer-motion';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'api/snackbar';
import IconButton from 'components/@extended/IconButton';
import AuthBackground from 'assets/images/auth/AuthBackground';
import axiosServices from 'utils/axios';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

export default function ResetPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = window.localStorage.getItem('email') || '';
  const otp = searchParams.get('otp') || searchParams.get('token') || window.localStorage.getItem('resetOtp') || window.localStorage.getItem('resetCode') || window.localStorage.getItem('token');
  const { isLoggedIn, confirmResetPassword } = useAuth();

  const [showPassword, setShowPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleClickShowConfirmPassword = () => setShowConfirmPassword(!showConfirmPassword);
  const handleMouseDownPassword = (e) => e.preventDefault();

  return (
    <Box sx={{ minHeight: '100vh', position: 'relative', overflow: 'hidden' }}>
      <AuthBackground />
      <Grid
        container
        direction="column"
        sx={{
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
          px: 2
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          style={{ width: '100%', maxWidth: 480 }}
        >
          <Paper
            elevation={3}
            sx={{
              width: '100%',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              bgcolor: '#fff'
            }}
          >
            {/* Header Block */}
            <Box
              sx={{
                bgcolor: 'primary.main',
                py: 3,
                textAlign: 'center',
                color: '#fff'
              }}
            >
              <Typography variant="h3" sx={{ fontWeight: 600, color: '#fff', fontSize: '22px' }}>
                تعيين كلمة المرور الجديدة
              </Typography>
            </Box>

            {/* Form Body */}
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Formik
                initialValues={{
                  password: '',
                  confirmPassword: '',
                  submit: null
                }}
                validationSchema={Yup.object().shape({
                  password: Yup.string().max(255).required('كلمة المرور الجديدة مطلوبة'),
                  confirmPassword: Yup.string()
                    .required('تأكيد كلمة المرور مطلوب')
                    .oneOf([Yup.ref('password')], 'كلمتا المرور غير متطابقتين')
                })}
                onSubmit={async (values, { setStatus, setSubmitting, setErrors }) => {
                  try {
                    if (!email) {
                      throw new Error('البريد الإلكتروني مفقود، يرجى البدء من البداية.');
                    }
                    if (!otp) {
                      throw new Error('كود التحقق مفقود، يرجى إدخال رمز التحقق أولاً.');
                    }

                    const response = await confirmResetPassword(email, otp, values.password);

                    if (scriptedRef.current) {
                      setStatus({ success: true });
                      setSubmitting(false);

                      window.localStorage.removeItem('resetOtp');
                      window.localStorage.removeItem('resetCode');

                      openSnackbar({
                        open: true,
                        message: response?.message || 'تم تعيين كلمة المرور الجديدة بنجاح',
                        variant: 'alert',
                        alert: { color: 'success' }
                      });

                      setTimeout(() => {
                        navigate('/auth/login', { replace: true });
                      }, 1500);
                    }
                  } catch (err) {
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      const errorMessage = typeof err === 'string'
                        ? err
                        : (err?.response?.data?.message || err?.message || err?.Message || 'حدث خطأ أثناء تعيين كلمة المرور');
                      setErrors({ submit: errorMessage });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Password Input */}
                      <Grid size={12}>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.password && errors.password)}
                          id="password-reset"
                          type={showPassword ? 'text' : 'password'}
                          value={values.password}
                          name="password"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="كلمة المرور الجديدة"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end" color="secondary">
                                {showPassword ? <Eye /> : <EyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          }
                          sx={{
                            bgcolor: '#f4f4f4',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#e0e0e0'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'primary.main'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'primary.main'
                            }
                          }}
                        />
                        {touched.password && errors.password && (
                          <FormHelperText error sx={{ mt: 1 }}>
                            {errors.password}
                          </FormHelperText>
                        )}
                      </Grid>

                      {/* Confirm Password Input */}
                      <Grid size={12}>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                          id="confirm-password-reset"
                          type={showConfirmPassword ? 'text' : 'password'}
                          value={values.confirmPassword}
                          name="confirmPassword"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="تأكيد كلمة المرور"
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton onClick={handleClickShowConfirmPassword} onMouseDown={handleMouseDownPassword} edge="end" color="secondary">
                                {showConfirmPassword ? <Eye /> : <EyeSlash />}
                              </IconButton>
                            </InputAdornment>
                          }
                          sx={{
                            bgcolor: '#f4f4f4',
                            borderRadius: '8px',
                            '& .MuiOutlinedInput-notchedOutline': {
                              borderColor: '#e0e0e0'
                            },
                            '&:hover .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'primary.main'
                            },
                            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                              borderColor: 'primary.main'
                            }
                          }}
                        />
                        {touched.confirmPassword && errors.confirmPassword && (
                          <FormHelperText error sx={{ mt: 1 }}>
                            {errors.confirmPassword}
                          </FormHelperText>
                        )}
                      </Grid>

                      {/* Error Msg */}
                      {errors.submit && (
                        <Grid size={12}>
                          <FormHelperText error sx={{ textAlign: 'center' }}>
                            {errors.submit}
                          </FormHelperText>
                        </Grid>
                      )}

                      {/* Submit Button */}
                      <Grid size={12} sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                        <Button
                          disableElevation
                          disabled={isSubmitting}
                          type="submit"
                          variant="contained"
                          sx={{
                            bgcolor: 'primary.main',
                            color: '#fff',
                            px: 6,
                            py: 1,
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 600,
                            '&:hover': {
                              bgcolor: 'primary.dark'
                            }
                          }}
                        >
                          حفظ
                        </Button>
                      </Grid>

                      {/* Back Link */}
                      <Grid size={12}>
                        <Box sx={{ borderTop: '1px solid #e0e0e0', mt: 2, pt: 3, textAlign: 'center' }}>
                          <Link
                            component={RouterLink}
                            to="/auth/login"
                            sx={{
                              color: 'primary.main',
                              textDecoration: 'none',
                              fontSize: '14px',
                              fontWeight: 500,
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            العودة الى تسجيل الدخول
                          </Link>
                        </Box>
                      </Grid>
                    </Grid>
                  </form>
                )}
              </Formik>
            </Box>
          </Paper>
        </motion.div>
      </Grid>
    </Box>
  );
}
