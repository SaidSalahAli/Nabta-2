import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
import OtpInput from 'react-otp-input';

// material-ui
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';

// project-imports
import useAuth from 'hooks/useAuth';
import useScriptRef from 'hooks/useScriptRef';
import { openSnackbar } from 'api/snackbar';
import AuthBackground from 'assets/images/auth/AuthBackground';

export default function CodeVerification() {
  const theme = useTheme();
  const scriptedRef = useScriptRef();
  const navigate = useNavigate();
  const { resetPassword } = useAuth(); // for resending code

  let email = window.localStorage.getItem('email') || '';
  let maskedEmail = '****@company.com';

  if (email) {
    let emailSplit = email.split('');
    let len = emailSplit.indexOf('@');
    let finalArr = [];
    emailSplit.forEach((item, pos) => {
      pos >= 1 && pos <= len - 2 ? finalArr.push('*') : finalArr.push(emailSplit[pos]);
    });
    maskedEmail = finalArr.join('');
  }

  const handleResend = async () => {
    if (!email) {
      openSnackbar({
        open: true,
        message: 'البريد الإلكتروني غير متوفر لإعادة الإرسال',
        variant: 'alert',
        alert: { color: 'error' }
      });
      return;
    }
    try {
      await resetPassword(email);
      openSnackbar({
        open: true,
        message: 'تم إعادة إرسال رمز التحقق إلى بريدك الإلكتروني',
        variant: 'alert',
        alert: { color: 'success' }
      });
    } catch (err) {
      openSnackbar({
        open: true,
        message: err.message || 'حدث خطأ أثناء إعادة إرسال الرمز',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

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
                كود التحقق
              </Typography>
            </Box>

            {/* Form Body */}
            <Box sx={{ p: { xs: 3, sm: 4, md: 5 } }}>
              <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', mb: 3 }}>
                لقد أرسلنا كود التحقق إلى البريد الإلكتروني: <strong style={{ color: 'primary.main' }}>{maskedEmail}</strong>
              </Typography>

              <Formik
                initialValues={{ otp: '', submit: null }}
                validationSchema={Yup.object().shape({
                  otp: Yup.string().length(4, 'يجب أن يتكون الرمز من 4 أرقام').required('كود التحقق مطلوب')
                })}
                onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
                  try {
                    window.localStorage.setItem('resetCode', values.otp);
                    if (scriptedRef.current) {
                      setStatus({ success: true });
                      setSubmitting(false);
                      openSnackbar({
                        open: true,
                        message: 'تم التحقق من الرمز بنجاح',
                        variant: 'alert',
                        alert: { color: 'success' }
                      });
                      setTimeout(() => {
                        navigate('/auth/reset-password', { replace: true });
                      }, 1500);
                    }
                  } catch (err) {
                    if (scriptedRef.current) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message || 'الرمز المدخل غير صحيح' });
                      setSubmitting(false);
                    }
                  }
                }}
              >
                {({ errors, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                  <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                      {/* OTP Inputs */}
                      <Grid size={12}>
                        <Box
                          sx={{
                            '& input:focus-visible': {
                              outline: 'none !important',
                              color: 'primary.main',
                              boxShadow: '0 0 0 2px rgba(60, 167, 183, 0.2) !important'
                            }
                          }}
                        >
                          <OtpInput
                            value={values.otp}
                            onChange={(otp) => setFieldValue('otp', otp)}
                            inputType="tel"
                            shouldAutoFocus
                            renderInput={(props) => <input {...props} />}
                            numInputs={4}
                            containerStyle={{ justifyContent: 'space-between', direction: 'ltr' }}
                            inputStyle={{
                              width: '60px',
                              height: '60px',
                              margin: '0 4px',
                              padding: '10px',
                              fontSize: '20px',
                              textAlign: 'center',
                              border: '1px solid',
                              outline: 'none',
                              borderRadius: '8px',
                              borderColor: touched.otp && errors.otp ? theme.palette.error.main : '#e0e0e0',
                              backgroundColor: '#f4f4f4'
                            }}
                          />
                          {touched.otp && errors.otp && (
                            <FormHelperText error sx={{ mt: 2, textAlign: 'center' }}>
                              {errors.otp}
                            </FormHelperText>
                          )}
                        </Box>
                      </Grid>

                      {/* Resend Link */}
                      <Grid size={12} sx={{ mt: 1, textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                          لم تصلك الرسالة؟{' '}
                          <Link
                            component="span"
                            onClick={handleResend}
                            sx={{
                              color: 'primary.main',
                              cursor: 'pointer',
                              fontWeight: 600,
                              textDecoration: 'none',
                              '&:hover': { textDecoration: 'underline' }
                            }}
                          >
                            إعادة إرسال الكود
                          </Link>
                        </Typography>
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
                          تأكيد
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
