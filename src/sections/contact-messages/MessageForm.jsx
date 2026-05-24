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

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// ==============================|| CONTACT MESSAGE FORM ||============================== //

const validationSchema = Yup.object().shape({
  status: Yup.string().required('حالة الرسالة مطلوبة')
});

const statusOptions = ['New', 'InProgress', 'Replied', 'Closed'];

export default function MessageForm({ message = null, onSubmit, isLoading = false, onCancel }) {
  const [initialValues, setInitialValues] = useState({
    status: 'New'
  });

  useEffect(() => {
    if (message) {
      setInitialValues({
        status: message.status || message.Status || 'New'
      });
    }
  }, [message]);

  const handleFormSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      // In a real scenario, you might want to send the whole message object updated with new status
      const updatedData = { ...message, status: values.status };
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

  if (!message) return null;

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} enableReinitialize>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            
            {/* View Details */}
            <Grid size={{ xs: 12 }}>
              <Box sx={{ p: 2, bgcolor: 'background.default', borderRadius: 1 }}>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption" color="textSecondary">الاسم</Typography>
                    <Typography variant="body1">{message.name || message.Name}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption" color="textSecondary">البريد الإلكتروني</Typography>
                    <Typography variant="body1">{message.email || message.Email}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption" color="textSecondary">رقم الهاتف</Typography>
                    <Typography variant="body1">{message.phone || message.Phone}</Typography>
                  </Grid>
                  <Grid size={{ xs: 6 }}>
                    <Typography variant="caption" color="textSecondary">الموضوع</Typography>
                    <Typography variant="body1">{message.subject || message.Subject}</Typography>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Typography variant="caption" color="textSecondary">الرسالة</Typography>
                    <Typography variant="body1" sx={{ mt: 0.5, p: 1.5, bgcolor: 'background.paper', borderRadius: 1 }}>
                      {message.message || message.Message}
                    </Typography>
                  </Grid>
                </Grid>
              </Box>
            </Grid>

            {/* Edit Status */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="status">حالة الرسالة</InputLabel>
                <Select
                  id="status"
                  name="status"
                  value={values.status}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={Boolean(touched.status && errors.status)}
                  fullWidth
                >
                  {statusOptions.map((opt) => (
                    <MenuItem key={opt} value={opt}>
                      {opt === 'New' ? 'جديدة' : opt === 'InProgress' ? 'جاري المعالجة' : opt === 'Replied' ? 'تم الرد' : 'مغلقة'}
                    </MenuItem>
                  ))}
                </Select>
                {touched.status && errors.status && (
                  <FormHelperText error>{errors.status}</FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  إغلاق
                </Button>
                <AnimateButton>
                  <Button disableElevation disabled={isLoading} fullWidth={false} size="large" type="submit" variant="contained">
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
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
