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
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

// third-party
import { Formik } from 'formik';
import * as Yup from 'yup';

// project-imports
import AnimateButton from 'components/@extended/AnimateButton';
import { openSnackbar } from 'api/snackbar';
import { useGetCategories } from 'api/categories';
import { IMAGES_URL } from 'config';

// assets
import { Camera, Trash } from 'iconsax-react';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${IMAGES_URL}/${url}`;
};

// ==============================|| APPLICATION FORM ||============================== //

const validationSchema = Yup.object().shape({
  categoryId: Yup.mixed().required('التصنيف مطلوب'),
  name: Yup.string().required('اسم التطبيق مطلوب'),
  slug: Yup.string().required('رابط التطبيق مطلوب'),
  shortDescription: Yup.string(),
  fullDescription: Yup.string(),
  appStoreUrl: Yup.string().url('رابط غير صالح'),
  playStoreUrl: Yup.string().url('رابط غير صالح'),
  promoVideoUrl: Yup.string().url('رابط غير صالح')
});

export default function ApplicationForm({ application = null, onSubmit, isLoading = false, onCancel }) {
  const { categories = [] } = useGetCategories();
  
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  
  const [bannerFiles, setBannerFiles] = useState([]);
  const [bannerPreviews, setBannerPreviews] = useState([]);

  const [initialValues, setInitialValues] = useState({
    categoryId: '',
    name: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    appStoreUrl: '',
    playStoreUrl: '',
    promoVideoUrl: ''
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
        promoVideoUrl: application.promo_video_url || application.promoVideoUrl || application.PromoVideoUrl || ''
      });
      
      // Thumbnail Preview
      if (application.thumbnail || application.Thumbnail) {
        setThumbnailPreview(getImageUrl(application.thumbnail || application.Thumbnail));
      } else {
        setThumbnailPreview('');
      }
      setThumbnailFile(null);

      // Banner Images Previews
      const currentBanners = application.banner_images || application.bannerImages || application.Banners || [];
      if (currentBanners.length > 0) {
        setBannerPreviews(currentBanners.map((imgObj, idx) => ({
          id: imgObj.id || idx,
          url: getImageUrl(imgObj.image_url || imgObj.ImageUrl)
        })));
      } else {
        setBannerPreviews([]);
      }
      setBannerFiles([]);
    } else {
      setInitialValues({
        categoryId: '',
        name: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        appStoreUrl: '',
        playStoreUrl: '',
        promoVideoUrl: ''
      });
      setThumbnailPreview('');
      setThumbnailFile(null);
      setBannerPreviews([]);
      setBannerFiles([]);
    }
  }, [application]);

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
    }
  };

  const handleBannerImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      const newPreviews = files.map(file => ({
        file,
        url: URL.createObjectURL(file)
      }));
      setBannerFiles(prev => [...prev, ...files]);
      setBannerPreviews(prev => [...prev, ...newPreviews]);
    }
  };

  const handleRemoveBanner = (index, isExisting) => {
    if (isExisting) {
      setBannerPreviews(prev => prev.filter((_, i) => i !== index));
    } else {
      const fileToRemove = bannerPreviews[index].file;
      setBannerFiles(prev => prev.filter(f => f !== fileToRemove));
      setBannerPreviews(prev => prev.filter((_, i) => i !== index));
    }
  };

  const handleFormSubmit = async (values, { setStatus, setSubmitting }) => {
    try {
      const selectedCategoryObj = categories.find(cat => String(cat.id || cat.Id) === String(values.categoryId));
      
      const formData = new FormData();
      
      // Category fields
      formData.append('Category.Id', values.categoryId || 0);
      formData.append('Category.Name', selectedCategoryObj?.name || selectedCategoryObj?.Name || '');
      formData.append('Category.Description', selectedCategoryObj?.description || selectedCategoryObj?.Description || '');
      
      // Application fields
      formData.append('Application.Id', application?.id || application?.Id || 0);
      formData.append('Application.Name', values.name);
      formData.append('Application.Slug', values.slug);
      formData.append('Application.Short_Description', values.shortDescription || '');
      formData.append('Application.Full_Description', values.fullDescription || '');
      formData.append('Application.App_Store_Url', values.appStoreUrl || '');
      formData.append('Application.Play_Store_Url', values.playStoreUrl || '');
      formData.append('Application.Promo_Video_Url', values.promoVideoUrl || '');
      formData.append('Application.Platforms', '[]'); 

      // Thumbnail file
      if (thumbnailFile) {
        formData.append('Thumbnail', thumbnailFile);
      }
      
      // Banner files
      if (bannerFiles.length > 0) {
        bannerFiles.forEach(file => {
          formData.append('BannerImages', file);
        });
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

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit} enableReinitialize>
      {({ errors, handleBlur, handleChange, handleSubmit, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Category Select */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1}>
                <InputLabel htmlFor="categoryId">التصنيف</InputLabel>
                <FormControl fullWidth error={Boolean(touched.categoryId && errors.categoryId)}>
                  <Select
                    id="categoryId"
                    value={values.categoryId}
                    name="categoryId"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    displayEmpty
                  >
                    <MenuItem value="" disabled>اختر التصنيف</MenuItem>
                    {categories.map((cat) => (
                      <MenuItem key={cat.id || cat.Id} value={cat.id || cat.Id}>
                        {cat.name || cat.Name}
                      </MenuItem>
                    ))}
                  </Select>
                  {touched.categoryId && errors.categoryId && (
                    <FormHelperText error>{errors.categoryId}</FormHelperText>
                  )}
                </FormControl>
              </Stack>
            </Grid>

            {/* Name */}
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

            {/* Slug */}
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

            {/* Short Description */}
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

            {/* Full Description */}
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

            {/* App Store URL */}
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

            {/* Play Store URL */}
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

            {/* YouTube Promo Video URL */}
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

            {/* Thumbnail Image upload */}
            <Grid size={{ xs: 12, md: 6 }}>
              <Stack spacing={1.5}>
                <InputLabel>أيقونة التطبيق (Thumbnail)</InputLabel>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '12px',
                      border: '2px dashed #ccc',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      overflow: 'hidden',
                      position: 'relative'
                    }}
                  >
                    {thumbnailPreview ? (
                      <Box component="img" src={thumbnailPreview} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <Camera size={24} color="#888" />
                    )}
                  </Box>
                  <Button variant="outlined" component="label" size="small" startIcon={<Camera size={16} />}>
                    رفع صورة الأيقونة
                    <input type="file" hidden accept="image/*" onChange={handleThumbnailChange} />
                  </Button>
                </Box>
              </Stack>
            </Grid>

            {/* Banner Images upload */}
            <Grid size={{ xs: 12 }}>
              <Stack spacing={1.5}>
                <InputLabel>لقطات شاشة التطبيق (Banner Images)</InputLabel>
                <Button variant="outlined" component="label" size="small" startIcon={<Camera size={16} />} sx={{ width: 'fit-content' }}>
                  إضافة لقطات شاشة
                  <input type="file" hidden accept="image/*" multiple onChange={handleBannerImagesChange} />
                </Button>
                
                {bannerPreviews.length > 0 && (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mt: 1 }}>
                    {bannerPreviews.map((preview, idx) => (
                      <Box
                        key={idx}
                        sx={{
                          position: 'relative',
                          width: 120,
                          height: 80,
                          borderRadius: '8px',
                          overflow: 'hidden',
                          border: '1px solid #ddd'
                        }}
                      >
                        <Box component="img" src={preview.url} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        <IconButton
                          size="small"
                          onClick={() => handleRemoveBanner(idx, !preview.file)}
                          sx={{
                            position: 'absolute',
                            top: 4,
                            right: 4,
                            bgcolor: 'rgba(255, 255, 255, 0.8)',
                            padding: '2px',
                            '&:hover': { bgcolor: 'rgba(255, 255, 255, 1)' }
                          }}
                        >
                          <Trash size={14} color="red" />
                        </IconButton>
                      </Box>
                    ))}
                  </Box>
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
