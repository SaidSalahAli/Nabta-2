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

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// ==============================|| WORKSHEET CATEGORY FORM (ARABIC ONLY) ||============================== //

const validationSchema = Yup.object().shape({
  nameAr: Yup.string().max(255).required('اسم التصنيف مطلوب'),
  description: Yup.string().max(1000)
});

export default function WorksheetCategoryForm({ category = null, onSubmit, isLoading = false, onCancel }) {
  const [initialValues, setInitialValues] = useState({
    nameAr: '',
    description: '',
    isActive: true
  });

  useEffect(() => {
    if (category) {
      setInitialValues({
        nameAr: category.nameAr || category.NameAr || '',
        description: category.description || category.Description || '',
        isActive: category.isActive !== undefined ? category.isActive : (category.IsActive !== undefined ? category.IsActive : true)
      });
    }
  }, [category]);

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
          <Grid container spacing={3}>
            {/* Category Name Arabic */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="nameAr">اسم التصنيف *</InputLabel>
                <OutlinedInput
                  id="nameAr"
                  type="text"
                  value={values.nameAr}
                  name="nameAr"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="مثال: رياضيات، حروف، بازل..."
                  fullWidth
                  error={Boolean(touched.nameAr && errors.nameAr)}
                />
                {touched.nameAr && errors.nameAr && (
                  <FormHelperText error id="helper-text-nameAr">
                    {errors.nameAr}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Description */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="description">الوصف</InputLabel>
                <OutlinedInput
                  id="description"
                  type="text"
                  multiline
                  rows={3}
                  value={values.description}
                  name="description"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أوراق عمل الرياضيات..."
                  fullWidth
                  error={Boolean(touched.description && errors.description)}
                />
                {touched.description && errors.description && (
                  <FormHelperText error id="helper-text-description">
                    {errors.description}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Active Status */}
            <Grid size={{ xs: 12 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={values.isActive}
                    onChange={(e) => setFieldValue('isActive', e.target.checked)}
                    name="isActive"
                    color="primary"
                  />
                }
                label="تفعيل هذا التصنيف في لوحة التحكم"
              />
            </Grid>

            {/* Action Buttons */}
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
                    {isLoading ? 'جاري الحفظ...' : category ? 'تحديث التصنيف' : 'إضافة التصنيف'}
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

WorksheetCategoryForm.propTypes = {
  category: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
