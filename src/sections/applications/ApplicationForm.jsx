import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';

// ==============================|| APPLICATION FORM ||============================== //

const validationSchema = Yup.object().shape({
  categoryId: Yup.number().required('التصنيف مطلوب'),
  name: Yup.string().required('اسم التطبيق مطلوب'),
  slug: Yup.string().required('رابط التطبيق مطلوب'),
  shortDescription: Yup.string(),
  fullDescription: Yup.string(),
  appStoreUrl: Yup.string().url('رابط غير صالح'),
  playStoreUrl: Yup.string().url('رابط غير صالح'),
  promoVideoUrl: Yup.string().url('رابط غير صالح'),
  thumbnailUrl: Yup.string()
});

export default function ApplicationForm({ application = null, onSubmit, isLoading = false, onCancel }) {
  const [initialValues, setInitialValues] = useState({
    categoryId: '',
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    appStoreUrl: '',
    playStoreUrl: '',
    promoVideoUrl: '',
    thumbnailUrl: ''
  });

  useEffect(() => {
    if (application) {
      setInitialValues({
        categoryId: application.category_id || application.categoryId || application.CategoryId || '',
        name: application.name || application.Name || '',
        slug: application.slug || application.Slug || '',
        shortDescription: application.short_description || application.shortDescription || application.ShortDescription || '',
        fullDescription: application.full_description || application.fullDescription || application.FullDescription || '',
        appStoreUrl: application.app_store_url || application.appStoreUrl || application.AppStoreUrl || '',
        playStoreUrl: application.play_store_url || application.playStoreUrl || application.PlayStoreUrl || '',
        promoVideoUrl: application.promo_video_url || application.promoVideoUrl || application.PromoVideoUrl || '',
        thumbnailUrl: application.thumbnail || application.Thumbnail || ''
      });
    }
  }, [application]);

  const handleFormSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const jsonData = {
        category_id: Number(values.categoryId),
        name: values.name,
        slug: values.slug,
        short_description: values.shortDescription,
        full_description: values.fullDescription,
        app_store_url: values.appStoreUrl,
        play_store_url: values.playStoreUrl,
        promo_video_url: values.promoVideoUrl,
        thumbnail: values.thumbnailUrl || ''
      };

      await onSubmit(jsonData);
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
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="categoryId">رقم التصنيف (Category ID)</InputLabel>
                <OutlinedInput
                  id="categoryId"
                  type="number"
                  value={values.categoryId}
                  name="categoryId"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أدخل رقم التصنيف"
                  fullWidth
                  inputProps={{ min: 1 }}
                  error={Boolean(touched.categoryId && errors.categoryId)}
                />
                {touched.categoryId && errors.categoryId && (
                  <FormHelperText error>{errors.categoryId}</FormHelperText>
                )}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="name">اسم التطبيق</InputLabel>
                <OutlinedInput
                  id="name"
                  type="text"
                  value={values.name}
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أدخل اسم التطبيق"
                  fullWidth
                  error={Boolean(touched.name && errors.name)}
                />
                {touched.name && errors.name && <FormHelperText error>{errors.name}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="slug">الرابط الدائم (Slug)</InputLabel>
                <OutlinedInput
                  id="slug"
                  type="text"
                  value={values.slug}
                  name="slug"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أدخل الرابط الدائم"
                  fullWidth
                  error={Boolean(touched.slug && errors.slug)}
                />
                {touched.slug && errors.slug && <FormHelperText error>{errors.slug}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="shortDescription">وصف قصير</InputLabel>
                <OutlinedInput
                  id="shortDescription"
                  type="text"
                  value={values.shortDescription}
                  name="shortDescription"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="وصف قصير للتطبيق"
                  fullWidth
                  multiline
                  rows={2}
                  error={Boolean(touched.shortDescription && errors.shortDescription)}
                />
                {touched.shortDescription && errors.shortDescription && <FormHelperText error>{errors.shortDescription}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="fullDescription">وصف كامل</InputLabel>
                <OutlinedInput
                  id="fullDescription"
                  type="text"
                  value={values.fullDescription}
                  name="fullDescription"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="وصف كامل للتطبيق"
                  fullWidth
                  multiline
                  rows={4}
                  error={Boolean(touched.fullDescription && errors.fullDescription)}
                />
                {touched.fullDescription && errors.fullDescription && <FormHelperText error>{errors.fullDescription}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="appStoreUrl">رابط App Store</InputLabel>
                <OutlinedInput
                  id="appStoreUrl"
                  type="text"
                  value={values.appStoreUrl}
                  name="appStoreUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.appStoreUrl && errors.appStoreUrl)}
                />
                {touched.appStoreUrl && errors.appStoreUrl && <FormHelperText error>{errors.appStoreUrl}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="playStoreUrl">رابط Play Store</InputLabel>
                <OutlinedInput
                  id="playStoreUrl"
                  type="text"
                  value={values.playStoreUrl}
                  name="playStoreUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.playStoreUrl && errors.playStoreUrl)}
                />
                {touched.playStoreUrl && errors.playStoreUrl && <FormHelperText error>{errors.playStoreUrl}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="promoVideoUrl">رابط فيديو ترويجي (YouTube)</InputLabel>
                <OutlinedInput
                  id="promoVideoUrl"
                  type="text"
                  value={values.promoVideoUrl}
                  name="promoVideoUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                  error={Boolean(touched.promoVideoUrl && errors.promoVideoUrl)}
                />
                {touched.promoVideoUrl && errors.promoVideoUrl && <FormHelperText error>{errors.promoVideoUrl}</FormHelperText>}
              </Stack>
            </Grid>

            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="thumbnailUrl">رابط الصورة (URL)</InputLabel>
                <OutlinedInput
                  id="thumbnailUrl"
                  type="text"
                  value={values.thumbnailUrl}
                  name="thumbnailUrl"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="https://example.com/image.png"
                  fullWidth
                />
                {values.thumbnailUrl && (
                  <Box
                    component="img"
                    src={values.thumbnailUrl}
                    alt="Preview"
                    sx={{ maxWidth: '100%', maxHeight: 150, borderRadius: 1, objectFit: 'contain' }}
                  />
                )}
              </Stack>
            </Grid>

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

ApplicationForm.propTypes = {
  application: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
