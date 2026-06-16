import { useState } from 'react';

// material-ui
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DialogContentText from '@mui/material/DialogContentText';

// project-imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { IMAGES_URL } from 'config';
import { useGetApplications, createApplication, updateApplication, deleteApplication } from 'api/applications';
import { openSnackbar } from 'api/snackbar';
import ApplicationForm from 'sections/applications/ApplicationForm';

// assets
import { Edit, Trash, Add } from 'iconsax-react';

const getImageUrl = (url) => {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `${IMAGES_URL}/${url}`;
};

// ==============================|| APPLICATIONS ||============================== //

export default function Applications() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const { applications = [], applicationsLoading, applicationsMutate } = useGetApplications();

  const filteredApplications = applications.filter((app) =>
    (app.name || app.Name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedApplications = filteredApplications.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateClick = () => {
    setSelectedApplication(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (app) => {
    setSelectedApplication(app);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (app) => {
    setSelectedApplication(app);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (selectedApplication?.id || selectedApplication?.Id) {
        await updateApplication(selectedApplication.id || selectedApplication.Id, values);
        openSnackbar({
          open: true,
          message: 'تم تحديث التطبيق بنجاح',
          variant: 'alert',
          alert: { color: 'success' }
        });
      } else {
        await createApplication(values);
        openSnackbar({
          open: true,
          message: 'تم إضافة التطبيق بنجاح',
          variant: 'alert',
          alert: { color: 'success' }
        });
      }
      applicationsMutate();
      setFormDialogOpen(false);
      setSelectedApplication(null);
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في العملية',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      await deleteApplication(selectedApplication.id || selectedApplication.Id);
      openSnackbar({
        open: true,
        message: 'تم حذف التطبيق بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      applicationsMutate();
      setDeleteDialogOpen(false);
      setSelectedApplication(null);
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في حذف التطبيق',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

  if (applicationsLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">التطبيقات</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleCreateClick}>
            إضافة تطبيق
          </Button>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TextField
            fullWidth
            placeholder="بحث عن تطبيق..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
          />
        </MainCard>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">الصورة</TableCell>
                  <TableCell>الاسم</TableCell>
                  <TableCell>التصنيف</TableCell>
                  <TableCell>الرابط</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedApplications.length > 0 ? (
                  paginatedApplications.map((app) => (
                    <TableRow key={app.id || app.Id} hover>
                      <TableCell align="center">
                        {(app.thumbnail || app.Thumbnail) && (
                          <Box
                            component="img"
                            src={getImageUrl(app.thumbnail || app.Thumbnail)}
                            alt={app.name || app.Name}
                            sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{app.name || app.Name}</TableCell>
                      <TableCell>{app.category_name || app.categoryId || app.CategoryId}</TableCell>
                      <TableCell>{app.slug || app.Slug}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Button size="small" variant="outlined" onClick={() => handleEditClick(app)} startIcon={<Edit size={16} />}>
                            تحرير
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(app)}
                            startIcon={<Trash size={16} />}
                          >
                            حذف
                          </Button>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 3 }}>
                      <Typography variant="body2" color="textSecondary">
                        لا توجد تطبيقات متطابقة
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredApplications.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </Grid>

      <Dialog open={formDialogOpen} onClose={() => setFormDialogOpen(false)} maxWidth="md" fullWidth>
        <DialogTitle>{selectedApplication?.id || selectedApplication?.Id ? 'تحرير التطبيق' : 'إضافة تطبيق جديد'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <ApplicationForm
            application={selectedApplication}
            onSubmit={handleFormSubmit}
            isLoading={formLoading}
            onCancel={() => setFormDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل تريد بالتأكيد حذف التطبيق "{selectedApplication?.name || selectedApplication?.Name}"؟ لا يمكن
            التراجع عن هذا الإجراء.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialogOpen(false)}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
