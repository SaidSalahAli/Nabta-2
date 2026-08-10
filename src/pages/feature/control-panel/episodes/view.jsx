import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Chip from '@mui/material/Chip';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';

// project-imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { useGetEpisode, deleteEpisode } from 'api/episodes';
import { openSnackbar } from 'api/snackbar';

// assets
import { Edit, Trash, DocumentText, Eye, DocumentDownload, Document, Export, CloseCircle } from 'iconsax-react';

// ==============================|| EPISODE DETAILS VIEW ||============================== //

export default function ViewEpisode() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { episode, episodeLoading } = useGetEpisode(id);
  const [openTranscript, setOpenTranscript] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [previewPdf, setPreviewPdf] = useState(null);

  const handleEditClick = () => {
    navigate(`/episodes/${id}/edit`);
  };

  const handleTranscriptOpen = () => {
    setOpenTranscript(true);
  };

  const handleTranscriptClose = () => {
    setOpenTranscript(false);
  };

  const handleDeleteClick = () => {
    setOpenDeleteDialog(true);
  };

  const handleDeleteConfirm = async () => {
    setIsDeleting(true);
    try {
      await deleteEpisode(id);
      openSnackbar({
        open: true,
        message: 'تم حذف الحلقة بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      navigate('/episodes');
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في حذف الحلقة',
        variant: 'alert',
        alert: { color: 'error' }
      });
      setIsDeleting(false);
    }
  };

  const handleDeleteCancel = () => {
    setOpenDeleteDialog(false);
  };

  if (episodeLoading) {
    return <Loader />;
  }

  if (!episode) {
    return (
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <MainCard>
            <Typography variant="h6" color="error">
              الحلقة غير موجودة
            </Typography>
          </MainCard>
        </Grid>
      </Grid>
    );
  }

  const worksheets = episode.EpisodeWorksheets || episode.episode_worksheets || episode.EpisodeWorksheet || [];

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">{episode.title_ar}</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="contained" startIcon={<Edit />} onClick={handleEditClick}>
              تحرير
            </Button>
            <Button variant="outlined" color="error" startIcon={<Trash />} onClick={handleDeleteClick}>
              حذف
            </Button>
          </Stack>
        </Stack>
      </Grid>

      {/* Main Content */}
      <Grid size={{ xs: 12, md: 8 }}>
        <MainCard>
          {/* Video Preview */}
          {episode.cover_image && (
            <Box sx={{ mb: 3 }}>
              <CardMedia component="img" height="400" image={episode.cover_image} alt={episode.title_ar} sx={{ borderRadius: 1 }} />
            </Box>
          )}

          {/* Episode Info */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            معلومات الحلقة
          </Typography>

          <Grid container spacing={2} sx={{ mb: 3 }}>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  رقم الحلقة
                </Typography>
                <Typography variant="body1">{episode.episode_number}</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  المدة
                </Typography>
                <Typography variant="body1">{Math.floor(episode.duration_seconds / 60)} دقيقة</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  نوع الفيديو
                </Typography>
                <Typography variant="body1">{episode.video_type}</Typography>
              </Box>
            </Grid>
            <Grid size={{ xs: 12, sm: 6 }}>
              <Box>
                <Typography variant="subtitle2" color="textSecondary">
                  الحالة
                </Typography>
                <Stack direction="row" spacing={1}>
                  {episode.is_published && <Chip label="منشورة" color="success" size="small" />}
                  {episode.is_featured && <Chip label="مميزة" color="primary" size="small" />}
                  {episode.has_worksheets && <Chip label="أوراق عمل" color="info" size="small" />}
                </Stack>
              </Box>
            </Grid>
          </Grid>

          <Divider sx={{ my: 2 }} />

          {/* Description */}
          <Typography variant="h6" sx={{ mb: 2 }}>
            الوصف
          </Typography>
          <Typography variant="body2" paragraph>
            {episode.short_description_ar}
          </Typography>
          <Typography variant="body1" paragraph>
            {episode.description_ar}
          </Typography>

          {/* Transcript Button */}
          {episode.transcript_ar && (
            <>
              <Divider sx={{ my: 2 }} />
              <Button variant="outlined" startIcon={<DocumentText />} onClick={handleTranscriptOpen} fullWidth>
                عرض نص الحلقة
              </Button>
            </>
          )}

          {/* Worksheets Section */}
          {worksheets.length > 0 && (
            <>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" sx={{ mb: 2 }}>
                أوراق العمل المرتبطة ({worksheets.length})
              </Typography>
              <Grid container spacing={2}>
                {worksheets.map((ws, idx) => {
                  const title = ws.TitleAr || ws.title_ar || 'ورقة عمل';
                  const description = ws.DescriptionAr || ws.description_ar || '';
                  const fileUrl = ws.FileUrl || ws.file_url || '';
                  const thumbnail = ws.ThumbnailImage || ws.thumbnail_image || '';
                  const fileType = (ws.FileType || ws.file_type || 'pdf').toUpperCase();

                  return (
                    <Grid size={{ xs: 12, sm: 6 }} key={ws.Id || ws.id || idx}>
                      <Card variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Box
                            sx={{
                              width: 70,
                              height: 70,
                              borderRadius: 1,
                              backgroundColor: '#f5f5f5',
                              overflow: 'hidden',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {thumbnail ? (
                              <Box component="img" src={thumbnail} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                              <Document size={36} color="#1890ff" variant="Bold" />
                            )}
                          </Box>
                          <Box sx={{ flexGrow: 1, minWidth: 0 }}>
                            <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 0.5 }}>
                              <Typography variant="subtitle1" noWrap sx={{ fontWeight: 600 }}>
                                {title}
                              </Typography>
                              <Chip label={fileType} color="error" size="small" sx={{ height: 20, fontSize: 10 }} />
                            </Stack>
                            {description && (
                              <Typography variant="caption" color="textSecondary" noWrap display="block">
                                {description}
                              </Typography>
                            )}
                            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                              <Button
                                size="small"
                                variant="contained"
                                startIcon={<Eye size="14" />}
                                onClick={() => setPreviewPdf({ url: fileUrl, title })}
                              >
                                معاينة PDF
                              </Button>
                              <Button
                                size="small"
                                variant="outlined"
                                startIcon={<DocumentDownload size="14" />}
                                component="a"
                                href={fileUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                تحميل
                              </Button>
                            </Stack>
                          </Box>
                        </Stack>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </>
          )}
        </MainCard>
      </Grid>

      {/* Sidebar */}
      <Grid size={{ xs: 12, md: 4 }}>
        <MainCard>
          <Stack spacing={2}>
            <Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                الرابط النصي
              </Typography>
              <Typography variant="body2" sx={{ wordBreak: 'break-all' }}>
                {episode.slug}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 0.5 }}>
                رابط الفيديو
              </Typography>
              <Typography
                variant="body2"
                component="a"
                href={episode.video_url}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ color: 'primary.main', textDecoration: 'none', wordBreak: 'break-all' }}
              >
                اضغط هنا
              </Typography>
            </Box>

            <Divider />

            {episode.thumbnail_image && (
              <Box>
                <Typography variant="subtitle2" color="textSecondary" sx={{ mb: 1 }}>
                  الصورة المصغرة
                </Typography>
                <CardMedia component="img" height="150" image={episode.thumbnail_image} alt="thumbnail" sx={{ borderRadius: 1 }} />
              </Box>
            )}
          </Stack>
        </MainCard>
      </Grid>

      {/* Transcript Modal */}
      <Dialog open={openTranscript} onClose={handleTranscriptClose} maxWidth="sm" fullWidth>
        <DialogTitle>نص الحلقة</DialogTitle>
        <DialogContent>
          <Box sx={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', mt: 2 }}>{episode.transcript_ar}</Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleTranscriptClose}>إغلاق</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteCancel}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <Typography>هل تريد بالتأكيد حذف الحلقة "{episode?.title_ar}"؟ لا يمكن التراجع عن هذا الإجراء.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error" disabled={isDeleting}>
            {isDeleting ? 'جاري الحذف...' : 'حذف'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* PDF Preview Modal */}
      <Dialog
        open={Boolean(previewPdf)}
        onClose={() => setPreviewPdf(null)}
        maxWidth="lg"
        fullWidth
        PaperProps={{ sx: { height: '85vh', borderRadius: 3, overflow: 'hidden' } }}
      >
        <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#f8f9fa' }}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <Document size="24" color="#e74c3c" variant="Bold" />
            <Typography variant="h6">{previewPdf?.title}</Typography>
          </Stack>
          <Stack direction="row" spacing={1} alignItems="center">
            <Button size="small" variant="outlined" startIcon={<Export size="16" />} component="a" href={previewPdf?.url} target="_blank" rel="noopener noreferrer">
              فتح في نافذة جديدة
            </Button>
            <Button size="small" variant="contained" startIcon={<DocumentDownload size="16" />} component="a" href={previewPdf?.url} download>
              تحميل
            </Button>
            <IconButton onClick={() => setPreviewPdf(null)}>
              <CloseCircle size="24" />
            </IconButton>
          </Stack>
        </DialogTitle>
        <DialogContent sx={{ p: 0, height: '100%', backgroundColor: '#525659' }}>
          {previewPdf?.url && (
            <iframe src={previewPdf.url} title={previewPdf.title} width="100%" height="100%" style={{ border: 'none' }} />
          )}
        </DialogContent>
      </Dialog>
    </Grid>
  );
}