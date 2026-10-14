import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid2';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';
import { useGetEpisodes } from 'api/episodes';
import { useGetWorksheetCategories } from 'api/worksheetCategories';

// ==============================|| WORKSHEET FORM ||============================== //

const getValidationSchema = (isEditing) =>
  Yup.object().shape({
    title_ar: Yup.string().required('عنوان ورقة العمل مطلوب'),
    description_ar: Yup.string(),
    file: isEditing ? Yup.mixed().nullable() : Yup.mixed().required('الملف مطلوب'),
    thumbnail: Yup.mixed(),
    episode_id: Yup.string(),
    category_id: Yup.number(),
    sort_order: Yup.number().min(0, 'يجب أن تكون قيمة موجبة'),
    is_active: Yup.boolean()
  });

export default function WorksheetForm({ worksheet = null, onSubmit, isLoading = false, onCancel }) {
  const { episodes = [] } = useGetEpisodes();
  const { categories: worksheetCategories = [] } = useGetWorksheetCategories();
  const [initialValues, setInitialValues] = useState({
    title_ar: '',
    description_ar: '',
    file: null,
    file_type: 'pdf',
    thumbnail: null,
    episode_id: '',
    category_id: '',
    sort_order: 0,
    is_active: true
  });

  useEffect(() => {
    if (worksheet) {
      setInitialValues({
        title_ar: worksheet.title_ar || worksheet.TitleAr || '',
        description_ar: worksheet.description_ar || worksheet.DescriptionAr || '',
        file: worksheet.file_url || worksheet.file || null,
        file_type: worksheet.file_type || worksheet.FileType || 'pdf',
        thumbnail: worksheet.thumbnail_image || worksheet.Thumbnail || '',
        episode_id: (worksheet.episode_id || worksheet.EpisodeId) ? String(worksheet.episode_id || worksheet.EpisodeId) : '',
        category_id: (worksheet.category_id || worksheet.CategoryId) ? String(worksheet.category_id || worksheet.CategoryId) : '',
        sort_order: worksheet.sort_order || 0,
        is_active: worksheet.is_active !== undefined ? worksheet.is_active : (worksheet.IsActive !== undefined ? worksheet.IsActive : true)
      });
    }
  }, [worksheet]);

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

  const isEditing = Boolean(worksheet?.id);

  return (
    <Formik initialValues={initialValues} validationSchema={getValidationSchema(isEditing)} onSubmit={handleFormSubmit} enableReinitialize>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values, setFieldValue }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Title */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="title_ar">عنوان ورقة العمل</InputLabel>
                <OutlinedInput
                  id="title_ar"
                  type="text"
                  value={values.title_ar}
                  name="title_ar"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="أدخل عنوان ورقة العمل"
                  fullWidth
                  error={Boolean(touched.title_ar && errors.title_ar)}
                />
                {touched.title_ar && errors.title_ar && (
                  <FormHelperText error id="helper-text-title_ar">
                    {errors.title_ar}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Description */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="description_ar">الوصف</InputLabel>
                <OutlinedInput
                  id="description_ar"
                  type="text"
                  value={values.description_ar}
                  name="description_ar"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="وصف ورقة العمل"
                  fullWidth
                  multiline
                  rows={3}
                  error={Boolean(touched.description_ar && errors.description_ar)}
                />
              </Stack>
            </Grid>

            {/* File Upload - PDF Only */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="file">الملف (PDF)</InputLabel>
                <Button variant="outlined" component="label" fullWidth sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}>
                  {values.file ? (typeof values.file === 'string' ? `الملف الحالي: ${values.file.split('/').pop()}` : values.file.name) : 'اختر ملف PDF...'}
                  <input
                    type="file"
                    hidden
                    accept=".pdf,application/pdf"
                    onChange={(event) => {
                      setFieldValue('file', event.currentTarget.files[0]);
                      setFieldValue('file_type', 'pdf');
                    }}
                  />
                </Button>
                {touched.file && errors.file && (
                  <FormHelperText error id="helper-text-file">
                    {errors.file}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>


            {/* Thumbnail Image */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="thumbnail">الصورة المصغرة</InputLabel>
                <Button variant="outlined" component="label" fullWidth sx={{ justifyContent: 'flex-start', px: 2, py: 1.5 }}>
                  {values.thumbnail ? (typeof values.thumbnail === 'string' ? `الصورة الحالية: ${values.thumbnail.split('/').pop()}` : values.thumbnail.name) : 'اختر الصورة المصغرة...'}
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(event) => {
                      setFieldValue('thumbnail', event.currentTarget.files[0]);
                    }}
                  />
                </Button>
                {values.thumbnail && (
                  <Box sx={{ mt: 1.5, position: 'relative', width: 120, height: 120, borderRadius: 1.5, overflow: 'hidden', border: '1px solid', borderColor: 'divider' }}>
                    <img
                      src={typeof values.thumbnail === 'string' ? values.thumbnail : URL.createObjectURL(values.thumbnail)}
                      alt="Preview"
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </Box>
                )}
                {touched.thumbnail && errors.thumbnail && (
                  <FormHelperText error id="helper-text-thumbnail">
                    {errors.thumbnail}
                  </FormHelperText>
                )}
              </Stack>
            </Grid>

            {/* Episode (Optional) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="episode_id">الحلقة (اختياري)</InputLabel>
                <TextField
                  id="episode_id"
                  select
                  value={values.episode_id}
                  name="episode_id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">بدون حلقة</MenuItem>
                  {episodes.map((ep) => (
                    <MenuItem key={ep.id} value={String(ep.id)}>
                      {ep.title_ar || ep.TitleAr}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Grid>

            {/* Category (Optional) */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="category_id">تصنيف ورقة العمل (اختياري)</InputLabel>
                <TextField
                  id="category_id"
                  select
                  value={values.category_id}
                  name="category_id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  fullWidth
                >
                  <MenuItem value="">بدون تصنيف</MenuItem>
                  {worksheetCategories.map((cat) => (
                    <MenuItem key={cat.id || cat.Id} value={String(cat.id || cat.Id)}>
                      {cat.nameAr || cat.NameAr}
                    </MenuItem>
                  ))}
                </TextField>
              </Stack>
            </Grid>



            {/* Sort Order */}
            {/* <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="sort_order">ترتيب العرض</InputLabel>
                <OutlinedInput
                  id="sort_order"
                  type="number"
                  value={values.sort_order}
                  name="sort_order"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  placeholder="0"
                  fullWidth
                  error={Boolean(touched.sort_order && errors.sort_order)}
                />
                {touched.sort_order && errors.sort_order && (
                  <FormHelperText error id="helper-text-sort_order">
                    {errors.sort_order}
                  </FormHelperText>
                )}
              </Stack>
            </Grid> */}

            {/* Active Status */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', pt: 2 }}>
                <FormControlLabel
                  control={
                    <Checkbox checked={values.is_active} onChange={(e) => setFieldValue('is_active', e.target.checked)} name="is_active" />
                  }
                  label="نشط"
                />
              </Box>
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

WorksheetForm.propTypes = {
  worksheet: PropTypes.object,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func.isRequired
};
