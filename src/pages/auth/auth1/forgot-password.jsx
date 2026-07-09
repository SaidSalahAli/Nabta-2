import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { motion } from 'framer-motion';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'api/snackbar';
import AuthBackground from 'assets/images/auth/AuthBackground';

export default function ForgotPassword() {
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();

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
                نسيت كلمة المرور
              </Typography>
            </Box>

            {/* Form Body */}
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Formik
                initialValues={{ email: '', submit: null }}
                validationSchema={Yup.object().shape({
                  email: Yup.string().email('البريد الإلكتروني غير صحيح').max(255).required('البريد الإلكتروني مطلوب')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  try {
                    await resetPassword(values.email.trim());
                    if (scriptedRef.current) {
                      setStatus({ success: true });
                      setSubmitting(false);
                      openSnackbar({
                        open: true,
                        message: 'تم إرسال كود تعيين كلمة المرور إلى بريدك الإلكتروني',
                        variant: 'alert',
                        alert: { color: 'success' }
                      });
                      // Store email to show on verification page
                      window.localStorage.setItem('email', values.email.trim());
                      setTimeout(() => {
                        navigate('/auth/code-verification', { replace: true });
                      }, 1500);
                    }
                  } catch (err) {
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message || 'حدث خطأ أثناء إرسال البريد' });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* Email Input */}
                      <Grid size={12}>
                        <OutlinedInput
                          fullWidth
                          error={Boolean(touched.email && errors.email)}
                          id="email-forgot"
                          type="email"
                          value={values.email}
                          name="email"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          placeholder="البريد الالكتروني"
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
                        {touched.email && errors.email && (
                          <FormHelperText error sx={{ mt: 1 }}>
                            {errors.email}
                          </FormHelperText>
                        )}
                      </Grid>

                      {/* Code Link */}
                      <Grid size={12} sx={{ mt: -1 }}>
                        <Link
                          component={RouterLink}
                          to="/auth/code-verification"
                          sx={{
                            color: 'primary.main',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 500,
                            '&:hover': { textDecoration: 'underline' }
                          }}
                        >
                          حصلت على كود التعيين؟
                        </Link>
                      </Grid>

                      {/* Error Msg */}
                      {errors.submit && (
                        <Grid size={12}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
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
                          ارسال
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
