import { useState, useEffect } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

// assets
import { Camera, Trash } from 'iconsax-react';

// ==============================|| CATEGORY FORM ||============================== //

export default function CategoryForm({ category, onSubmit, isLoading, onCancel }) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState('');
  const [errors, setErrors] = useState({});

  // Populate form when editing
  useEffect(() => {
    if (category) {
      setName(category.Name || category.name || '');
      setDescription(category.Description || category.description || '');
      setPhotoPreview(category.PhotoUrl || category.photoUrl || category.Photo || category.photo || '');
    } else {
      setName('');
      setDescription('');
      setPhoto(null);
      setPhotoPreview('');
    }
    setErrors({});
  }, [category]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleRemovePhoto = () => {
    setPhoto(null);
    setPhotoPreview('');
  };

  const validate = () => {
    const newErrors = {};
    if (!name.trim()) newErrors.name = 'الاسم مطلوب';
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formData = new FormData();
    formData.append('Name', name.trim());
    formData.append('Description', description.trim());
    if (photo) {
      formData.append('Photo', photo);
    }

    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Stack spacing={3}>
        {/* Photo Upload */}
        <Stack alignItems="center" spacing={1}>
          <Box sx={{ position: 'relative', display: 'inline-block' }}>
            <Avatar
              src={photoPreview}
              variant="rounded"
              sx={{ width: 120, height: 120, bgcolor: 'grey.100', border: '2px dashed', borderColor: 'grey.300' }}
            >
              {!photoPreview && <Camera size={36} color="#888" />}
            </Avatar>
            {photoPreview && (
              <IconButton
                size="small"
                color="error"
                onClick={handleRemovePhoto}
                sx={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  bgcolor: 'background.paper',
                  border: '1px solid',
                  borderColor: 'error.main',
                  '&:hover': { bgcolor: 'error.lighter' }
                }}
              >
                <Trash size={14} />
              </IconButton>
            )}
          </Box>
          <Button variant="outlined" component="label" size="small" startIcon={<Camera size={16} />}>
            {photoPreview ? 'تغيير الصورة' : 'رفع صورة'}
            <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
          </Button>
          {category && !photo && (
            <Typography variant="caption" color="text.secondary">
              اتركها فارغة للاحتفاظ بالصورة الحالية
            </Typography>
          )}
        </Stack>

        {/* Name */}
        <TextField
          fullWidth
          label="الاسم"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
          error={!!errors.name}
          helperText={errors.name}
          required
          inputProps={{ dir: 'rtl' }}
        />

        {/* Description */}
        <TextField
          fullWidth
          label="الوصف"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          inputProps={{ dir: 'rtl' }}
        />

        {/* Actions */}
        <Stack direction="row" spacing={2} justifyContent="flex-end">
          <Button variant="outlined" onClick={onCancel} disabled={isLoading}>
            إلغاء
          </Button>
          <Button type="submit" variant="contained" disabled={isLoading} startIcon={isLoading ? <CircularProgress size={16} /> : null}>
            {isLoading ? 'جارٍ الحفظ...' : category ? 'تحديث التصنيف' : 'إضافة التصنيف'}
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
