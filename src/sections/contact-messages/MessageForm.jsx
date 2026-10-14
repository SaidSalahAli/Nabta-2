import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import Stack from '@mui/material/Stack';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';
import CircularProgress from '@mui/material/CircularProgress';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// assets
import { DirectSend, Send2, MessageQuestion } from 'iconsax-react';

// ==============================|| CONTACT MESSAGE FORM & REPLY ||============================== //

const validationSchema = Yup.object().shape({
  isRead: Yup.boolean().required('حالة الرسالة مطلوبة')
});

export default function MessageForm({ message = null, onSubmit, onReply, isLoading = false, onCancel }) {
  const [initialValues, setInitialValues] = useState({
    isRead: false
  });

  const [replyText, setReplyText] = useState('');
  const [sendEmail, setSendEmail] = useState(true);
  const [replyLoading, setReplyLoading] = useState(false);

  useEffect(() => {
    if (message) {
      setInitialValues({
        isRead: message.isRead !== undefined ? message.isRead : (message.IsRead !== undefined ? message.IsRead : false)
      });
      setReplyText(message.replyText || message.ReplyText || '');
    }
  }, [message]);

  const handleFormSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const updatedData = {
        ...message,
        isRead: values.isRead === 'true' || values.isRead === true
      };
      await onSubmit(updatedData);
      setStatus({ success: true });
      setSubmitting(false);
    } catch (err) {
      setStatus({ success: false });
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ في العملية',
        variant: 'alert',
        alert: { color: 'error' }
      });
      setSubmitting(false);
    }
  };

  const handleSendReply = async () => {
    if (!replyText.trim()) {
      openSnackbar({
        open: true,
        message: 'يرجى كتابة نص الرد أولاً',
        variant: 'alert',
        alert: { color: 'warning' }
      });
      return;
    }

    setReplyLoading(true);
    try {
      if (onReply) {
        await onReply(message.id || message.Id, {
          replyText,
          sendEmail
        });
      }
      openSnackbar({
        open: true,
        message: 'تم إرسال الرد على رسالة المستخدم بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
    } catch (err) {
      openSnackbar({
        open: true,
        message: err?.message || 'حدث خطأ أثناء إرسال الرد',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setReplyLoading(false);
    }
  };

  if (!message) return null;

  const hasPreviousReply = Boolean(message.replyText || message.ReplyText);

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} enableReinitialize>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* View Details */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ p: 2.5, bgcolor: 'background.default', borderRadius: 2, border: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="textSecondary">اسم المرسل</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {message.fullName || message.FullName || message.name || message.Name || '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="textSecondary">البريد الإلكتروني</Typography>
                    <Typography variant="body1" color="primary">
                      {message.email || message.Email || '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="textSecondary">رقم الهاتف</Typography>
                    <Typography variant="body1">
                      {message.phone || message.Phone || '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <Typography variant="caption" color="textSecondary">الموضوع</Typography>
                    <Typography variant="body1" fontWeight={600}>
                      {message.subject || message.Subject || '—'}
                    </Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="textSecondary">نص الرسالة</Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        mt: 0.5,
                        p: 2,
                        bgcolor: 'background.paper',
                        borderRadius: 1.5,
                        border: '1px solid',
                        borderColor: 'divider',
                        lineHeight: 1.8,
                        whiteSpace: 'pre-wrap'
                      }}
                    >
                      {message.message || message.Message}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Reply Section */}
            <Grid size={{ xs: 12 }}>
              <Box
                sx={{
                  p: 2.5,
                  bgcolor: (theme) => (theme.palette.mode === 'dark' ? 'rgba(60, 167, 183, 0.08)' : '#f0f9fa'),
                  borderRadius: 2,
                  border: '1px solid',
                  borderColor: 'rgba(60, 167, 183, 0.3)'
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={1} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
                    <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                      <Send2 size={20} color="#3ca7b7" />
                      <Typography variant="subtitle1" fontWeight={600} color="#3ca7b7">
                        الرد المباشر على المستخدم
                      </Typography>
                    </Stack>
                    {hasPreviousReply && (
                      <Chip label="تم الرد مسبقاً" color="success" size="small" variant="light" />
                    )}
                  </Stack>

                  <Stack spacing={1}>
                    <InputLabel htmlFor="replyText">نص الرد</InputLabel>
                    <OutlinedInput
                      id="replyText"
                      multiline
                      rows={4}
                      fullWidth
                      placeholder="اكتب ردك هنا، سيتم إرساله للمستخدم..."
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      sx={{ bgcolor: 'background.paper' }}
                    />
                  </Stack>

                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={sendEmail}
                        onChange={(e) => setSendEmail(e.target.checked)}
                        color="primary"
                      />
                    }
                    label={`إرسال نسخة من الرد تلقائياً إلى بريد المستخدم (${message.email || message.Email || 'البريد'})`}
                  />

                  <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button
                      variant="contained"
                      startIcon={replyLoading ? <CircularProgress size={16} color="inherit" /> : <DirectSend size={18} />}
                      onClick={handleSendReply}
                      disabled={replyLoading || !replyText.trim()}
                      sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: '#2e8996' } }}
                    >
                      {replyLoading ? 'جاري إرسال الرد...' : 'إرسال الرد الآن'}
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Grid>

            {/* Edit Status */}
            <Grid size={{ xs: 12 }}>
              <Divider sx={{ my: 1 }} />
              <Stack spacing={1}>
                <InputLabel htmlFor="isRead">حالة الرسالة</InputLabel>
                <Select
                  id="isRead"
                  name="isRead"
                  value={values.isRead}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.isRead && errors.isRead)}
                  fullWidth
                >
                  <MenuItem value={false}>غير مقروءة</MenuItem>
                  <MenuItem value={true}>مقروءة</MenuItem>
                </Select>
                {touched.isRead && errors.isRead && (
                  <FormHelperText error>{errors.isRead}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Actions */}
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  إغلاق
                </Button>
                <AnimateButton>
                  <Button disableElevation disabled={isLoading} size="large" type="submit" variant="contained">
                    {isLoading ? 'جاري الحفظ...' : 'حفظ الحالة'}
                  </Button>
                </AnimateButton>
              </Stack>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
}

MessageForm.propTypes = {
  message: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  onReply: PropTypes.func,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
