import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import imageCompression from 'browser-image-compression';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// ==============================|| CATEGORY FORM ||============================== //

const validationSchema = Yup.object().shape({
  nameAr: Yup.string().required('اسم التصنيف مطلوب'),
  descriptionAr: Yup.string(),
  image: Yup.string()
});

export default function CategoryForm({ category = null, onSubmit, isLoading = false, onCancel }) {
  const [initialValues, setInitialValues] = useState({
    nameAr: '',
    descriptionAr: '',
    image: null
  });
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (category) {
      setInitialValues({
        nameAr: category.NameAr || category.nameAr || '',
        descriptionAr: category.DescriptionAr || category.descriptionAr || '',
        image: null
      });
      if (category.Image || category.image) {
        const imageUrl = category.Image || category.image;
        setImagePreview(imageUrl);
      }
    }
  }, [category]);

  const handleFormSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('nameAr', values.nameAr);
      formData.append('descriptionAr', values.descriptionAr);
      if (values.image instanceof File) {
        formData.append('image', values.image);
      }

      await onSubmit(formData);
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

  const handleImageChange = (event, setFieldValue) => {
    const file = event.target.files?.[0];
    if (file) {
      // TODO: إضافة ضغط وتحويل WebP عندما يكون الـ backend جاهز
      setFieldValue('image', file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);

      openSnackbar({
        open: true,
        message: `تم تحديد الصورة (${(file.size / 1024).toFixed(2)} KB)`,
        variant: 'alert',
        alert: { color: 'success' }
      });
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} enableReinitialize>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Name */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="nameAr">اسم التصنيف</InputLabel>
                <OutlinedInput
                  id="nameAr"
                  type="text"
                  value={values.nameAr}
                  name="nameAr"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أدخل اسم التصنيف"
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
                <InputLabel htmlFor="descriptionAr">الوصف</InputLabel>
                <OutlinedInput
                  id="descriptionAr"
                  type="text"
                  value={values.descriptionAr}
                  name="descriptionAr"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="وصف التصنيف"
                  fullWidth
                  multiline
                  rows={3}
                  error={Boolean(touched.descriptionAr && errors.descriptionAr)}
                />
                {touched.descriptionAr && errors.descriptionAr && (
                  <FormHelperText error id="helper-text-descriptionAr">
                    {errors.descriptionAr}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Image Upload */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="image-upload">الصورة</InputLabel>
                <Box
                  sx={{
                    border: '2px dashed #ccc',
                    borderRadius: 1,
                    p: 2,
                    textAlign: 'center',
                    cursor: 'pointer',
                    '&:hover': { borderColor: '#999' }
                  }}
                  component="label"
                >
                  {imagePreview ? (
                    <Box>
                      <Box
                        component="img"
                        src={imagePreview}
                        alt="Preview"
                        sx={{ maxWidth: '100%', maxHeight: 200, borderRadius: 1, mb: 1 }}
                      />
                      <Typography variant="body2">انقر للتغيير</Typography>
                    </Box>
                  ) : (
                    <Typography variant="body2">انقر هنا لرفع صورة</Typography>
                  )}
                  <input id="image-upload" type="file" accept="image/*" hidden onChange={(e) => handleImageChange(e, setFieldValue)} />
                </Box>
              </Stack>
            </Grid>

            {/* Form Actions */}
            <Grid size={{ xs: 12 }}>
              <Stack direction="row" spacing={2} sx={{ justifyContent: 'flex-end' }}>
                <Button variant="outlined" color="secondary" onClick={onCancel}>
                  إلغاء
                </Button>
                <AnimateButton>
                  <Button disableElevation disabled={isLoading} fullWidth={false} size="large" type="submit" variant="contained">
                    {isLoading ? 'جاري الحفظ...' : 'حفظ'}
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

CategoryForm.propTypes = {
  category: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
