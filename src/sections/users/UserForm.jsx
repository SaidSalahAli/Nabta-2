import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// assets
import { Eye, EyeSlash } from 'iconsax-react';

// ==============================|| USER FORM ||============================== //

export default function UserForm({ user = null, onSubmit, isLoading = false, onCancel }) {
  const [showPassword, setShowPassword] = useState(false);

  const isEdit = Boolean(user?.id || user?.Id);

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().max(100).required('الاسم الأول مطلوب'),
    lastName: Yup.string().max(100).required('اسم العائلة مطلوب'),
    email: Yup.string().email('يرجى إدخال بريد إلكتروني صحيح').max(255).required('البريد الإلكتروني مطلوب'),
    mobail: Yup.string().max(20, 'رقم الهاتف طويل جداً'),
    password: isEdit
      ? Yup.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل')
      : Yup.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل').required('كلمة المرور مطلوبة')
  });

  const [initialValues, setInitialValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobail: '',
    password: '',
    status: true
  });

  useEffect(() => {
    if (user) {
      // Split name if first/last not explicitly separated
      let fName = user.FirstName || user.firstName || '';
      let lName = user.LastName || user.lastName || '';
      if (!fName && user.name) {
        const parts = user.name.split(' ');
        fName = parts[0] || '';
        lName = parts.slice(1).join(' ') || '';
      }

      setInitialValues({
        firstName: fName,
        lastName: lName,
        email: user.Email || user.email || '',
        mobail: user.Mobail || user.mobail || user.phone || '',
        password: '',
        status: user.Status !== undefined ? Boolean(user.Status) : (user.status === 'نشط' || user.status === true)
      });
    }
  }, [user]);

  const handleFormSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      await onSubmit(values);
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

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} enableReinitialize>
      {({ errors, handleBlur, handleChange, handleSubmit, setFieldValue, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2.5}>
            {/* First Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="firstName">الاسم الأول *</InputLabel>
                <OutlinedInput
                  id="firstName"
                  name="firstName"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="محمد"
                  fullWidth
                  error={Boolean(touched.firstName && errors.firstName)}
                />
                {touched.firstName && errors.firstName && (
                  <FormHelperText error>{errors.firstName}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Last Name */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="lastName">اسم العائلة *</InputLabel>
                <OutlinedInput
                  id="lastName"
                  name="lastName"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="علي"
                  fullWidth
                  error={Boolean(touched.lastName && errors.lastName)}
                />
                {touched.lastName && errors.lastName && (
                  <FormHelperText error>{errors.lastName}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Email */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="email">البريد الإلكتروني *</InputLabel>
                <OutlinedInput
                  id="email"
                  type="email"
                  name="email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="user@example.com"
                  fullWidth
                  error={Boolean(touched.email && errors.email)}
                />
                {touched.email && errors.email && (
                  <FormHelperText error>{errors.email}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Phone */}
            <Grid size={{ xs: 12, sm: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="mobail">رقم الهاتف / الجوال</InputLabel>
                <OutlinedInput
                  id="mobail"
                  name="mobail"
                  value={values.mobail}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="0501234567"
                  fullWidth
                  error={Boolean(touched.mobail && errors.mobail)}
                />
                {touched.mobail && errors.mobail && (
                  <FormHelperText error>{errors.mobail}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Password */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="password">
                  {isEdit ? 'كلمة المرور الجديدة (اتركها فارغة إذا لم ترد التغيير)' : 'كلمة المرور *'}
                </InputLabel>
                <OutlinedInput
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={values.password}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="******"
                  fullWidth
                  error={Boolean(touched.password && errors.password)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <EyeSlash size={18} /> : <Eye size={18} />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                {touched.password && errors.password && (
                  <FormHelperText error>{errors.password}</FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Status (Active / Inactive) */}
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.status}
                    onChange={(e) => setFieldValue('status', e.target.checked)}
                    name="status"
                    color="primary"
                  />
                }
                label="تفعيل الحساب (يستطيع المستخدم تسجيل الدخول واستلام الإشعارات)"
              />
            </Grid>

            {/* Actions */}
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end', mt: 2 }}>
                <Button variant="outlined" color="secondary" onClick={onCancel} disabled={isLoading}>
                  إلغاء
                </Button>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isLoading}
                    size="large"
                    type="submit"
                    variant="contained"
                    sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: '#2e8996' } }}
                  >
                    {isLoading ? 'جاري الحفظ...' : isEdit ? 'حفظ التعديلات' : 'إضافة المستخدم'}
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

UserForm.propTypes = {
  user: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
