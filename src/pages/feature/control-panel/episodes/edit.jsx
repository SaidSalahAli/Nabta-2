import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

// material-ui
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

// project-imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { openSnackbar } from 'api/snackbar';
import EpisodeForm from 'sections/episodes/EpisodeForm';
import { updateEpisode } from 'api/episodes';
import { fetcher } from 'utils/axios';
import { mapEpisode } from 'utils/dataMapper';
import { IMAGES_URL } from 'config';

// ==============================|| EDIT EPISODE ||============================== //

const buildImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  return `${IMAGES_URL}/${url}`;
};

export default function EditEpisode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [episode, setEpisode] = useState(null);
  const [episodeLoading, setEpisodeLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    setEpisodeLoading(true);
    fetcher(`api/Episodes/ById?id=${id}`)
      .then((data) => {
        // البيانات تأتي داخل Data أو مباشرةً
        const raw = data?.Data || data?.data || data;
        const mapped = mapEpisode(raw);
        // بناء روابط الصور الكاملة
        if (mapped) {
          mapped.thumbnail_image = buildImageUrl(mapped.thumbnail_image);
          mapped.cover_image = buildImageUrl(mapped.cover_image);
        }
        setEpisode(mapped);
      })
      .catch(() => {
        openSnackbar({
          open: true,
          message: 'حدث خطأ في جلب بيانات الحلقة',
          variant: 'alert',
          alert: { color: 'error' }
        });
      })
      .finally(() => setEpisodeLoading(false));
  }, [id]);

  const handleSubmit = async (values) => {
    setIsLoading(true);
    try {
      await updateEpisode({ ...values, ID: id });
      openSnackbar({
        open: true,
        message: 'تم تحديث الحلقة بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      navigate('/dashboard/episodes');
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في تحديث الحلقة',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard/episodes');
  };

  if (episodeLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
          <Typography variant="h4">تحرير الحلقة</Typography>
        </Stack>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <EpisodeForm episode={episode} onSubmit={handleSubmit} isLoading={isLoading} onCancel={handleCancel} />
        </MainCard>
      </Grid>
    </Grid>
  );
}
