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
import Tooltip from '@mui/material/Tooltip';

// project-imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { useGetCategories, createCategory, updateCategory, deleteCategory } from 'api/categories';
import { openSnackbar } from 'api/snackbar';
import CategoryForm from 'sections/categories/CategoryForm';

// assets
import { Edit, Trash, Add } from 'iconsax-react';

// ==============================|| APPLICATION CATEGORIES ||==============================//

export default function Categories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const { categories = [], categoriesLoading, categoriesMutate } = useGetCategories();

  const filteredCategories = categories.filter((cat) =>
    (cat.Name || cat.name || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (cat) => {
    setSelectedCategory(cat);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (cat) => {
    setSelectedCategory(cat);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      if (selectedCategory?.Id || selectedCategory?.id) {
        await updateCategory(selectedCategory.Id || selectedCategory.id, values);
        openSnackbar({
          open: true,
          message: 'تم تحديث تصنيف التطبيق بنجاح',
          variant: 'alert',
          alert: { color: 'success' }
        });
      } else {
        await createCategory(values);
        openSnackbar({
          open: true,
          message: 'تم إضافة تصنيف التطبيق بنجاح',
          variant: 'alert',
          alert: { color: 'success' }
        });
      }
      categoriesMutate();
      setFormDialogOpen(false);
      setSelectedCategory(null);
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
      await deleteCategory(selectedCategory.Id || selectedCategory.id);
      openSnackbar({
        open: true,
        message: 'تم حذف تصنيف التطبيق بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      categoriesMutate();
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في حذف تصنيف التطبيق',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

  if (categoriesLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={3}>
      {/* Header */}
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">تصنيفات التطبيقات</Typography>
          <Button variant="contained" startIcon={<Add />} onClick={handleCreateClick}>
            إضافة تصنيف
          </Button>
        </Stack>
      </Grid>

      {/* Search */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TextField
            fullWidth
            placeholder="بحث عن تصنيف تطبيق..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
          />
        </MainCard>
      </Grid>

      {/* Table */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align="center">الصورة</TableCell>
                  <TableCell>الاسم</TableCell>
                  <TableCell>الوصف</TableCell>
                  <TableCell align="center">تاريخ الإنشاء</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCategories.length > 0 ? (
                  paginatedCategories.map((cat) => (
                    <TableRow key={cat.Id || cat.id} hover>
                      <TableCell align="center">
                        {(cat.PhotoUrl || cat.photoUrl || cat.Photo || cat.photo) && (
                          <Box
                            component="img"
                            src={cat.PhotoUrl || cat.photoUrl || cat.Photo || cat.photo}
                            alt={cat.Name || cat.name}
                            sx={{ width: 50, height: 50, borderRadius: 1, objectFit: 'cover' }}
                          />
                        )}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={500}>
                          {cat.Name || cat.name}
                        </Typography>
                      </TableCell>
                      <TableCell sx={{ maxWidth: 250, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        <Tooltip title={cat.Description || cat.description || ''} placement="top">
                          <Typography variant="body2" color="text.secondary" noWrap>
                            {cat.Description || cat.description || '—'}
                          </Typography>
                        </Tooltip>
                      </TableCell>
                      <TableCell align="center">
                        <Typography variant="caption" color="text.secondary">
                          {cat.CreatedAt || cat.createdAt
                            ? new Date(cat.CreatedAt || cat.createdAt).toLocaleDateString('ar-EG')
                            : '—'}
                        </Typography>
                      </TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Button size="small" variant="outlined" onClick={() => handleEditClick(cat)} startIcon={<Edit size={16} />}>
                            تحرير
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(cat)}
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
                        لا توجد تصنيفات متطابقة
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
            count={filteredCategories.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </Grid>

      {/* Form Dialog */}
      <Dialog open={formDialogOpen} onClose={() => setFormDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedCategory?.Id || selectedCategory?.id ? 'تحرير تصنيف التطبيق' : 'إضافة تصنيف تطبيق جديد'}</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <CategoryForm
            category={selectedCategory}
            onSubmit={handleFormSubmit}
            isLoading={formLoading}
            onCancel={() => setFormDialogOpen(false)}
          />
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onClose={() => setDeleteDialogOpen(false)}>
        <DialogTitle>تأكيد الحذف</DialogTitle>
        <DialogContent>
          <DialogContentText>
            هل تريد بالتأكيد حذف تصنيف التطبيق &quot;{selectedCategory?.Name || selectedCategory?.name}&quot;؟ لا يمكن التراجع عن هذا
            الإجراء.
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
