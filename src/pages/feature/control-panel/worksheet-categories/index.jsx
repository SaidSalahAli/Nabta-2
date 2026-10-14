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
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DialogContentText from '@mui/material/DialogContentText';

// project-imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import {
  useGetWorksheetCategories,
  createWorksheetCategory,
  updateWorksheetCategory,
  deleteWorksheetCategory
} from 'api/worksheetCategories';
import { openSnackbar } from 'api/snackbar';
import WorksheetCategoryForm from 'sections/worksheets/WorksheetCategoryForm';

// assets
import { Edit, Trash, Add, Folder } from 'iconsax-react';

// ==============================|| WORKSHEET CATEGORIES MANAGEMENT ||============================== //

export default function WorksheetCategories() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const { categories = [], categoriesLoading, categoriesMutate } = useGetWorksheetCategories();

  // Filter categories
  const filteredCategories = categories.filter((category) => {
    const nameAr = category.NameAr || category.nameAr || '';
    const desc = category.Description || category.description || '';
    const term = searchTerm.toLowerCase();
    return nameAr.toLowerCase().includes(term) || desc.toLowerCase().includes(term);
  });

  const paginatedCategories = filteredCategories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleCreateClick = () => {
    setSelectedCategory(null);
    setFormDialogOpen(true);
  };

  const handleEditClick = (category) => {
    setSelectedCategory(category);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (category) => {
    setSelectedCategory(category);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      const catId = selectedCategory?.Id || selectedCategory?.id;
      if (catId) {
        await updateWorksheetCategory(catId, values);
        openSnackbar({
          open: true,
          message: 'تم تحديث تصنيف أوراق العمل بنجاح',
          variant: 'alert',
          alert: { color: 'success' }
        });
      } else {
        await createWorksheetCategory(values);
        openSnackbar({
          open: true,
          message: 'تم إنشاء تصنيف أوراق العمل بنجاح',
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
        message: error?.message || 'حدث خطأ أثناء حفظ التصنيف',
        variant: 'alert',
        alert: { color: 'error' }
      });
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const catId = selectedCategory?.Id || selectedCategory?.id;
      await deleteWorksheetCategory(catId);
      openSnackbar({
        open: true,
        message: 'تم حذف تصنيف أوراق العمل بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      categoriesMutate();
      setDeleteDialogOpen(false);
      setSelectedCategory(null);
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في حذف التصنيف',
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
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: 'center' }}>
            <Folder size={28} color="#3ca7b7" />
            <Typography variant="h4">تصنيفات أوراق العمل</Typography>
          </Stack>
          <Button variant="contained" startIcon={<Add />} onClick={handleCreateClick} sx={{ bgcolor: '#3ca7b7', '&:hover': { bgcolor: 'primary.dark' } }}>
            إضافة تصنيف جديد
          </Button>
        </Stack>
      </Grid>

      {/* Search Input */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TextField
            fullWidth
            placeholder="بحث في تصنيفات أوراق العمل..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(0);
            }}
          />
        </MainCard>
      </Grid>

      {/* Categories Table */}
      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TableContainer component={Paper} sx={{ boxShadow: 'none' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>
                  <TableCell>اسم التصنيف</TableCell>
                  <TableCell>الوصف</TableCell>
                  <TableCell align="center">الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedCategories.length > 0 ? (
                  paginatedCategories.map((category, index) => {
                    const id = category.Id || category.id || index + 1;
                    const nameAr = category.NameAr || category.nameAr || '—';
                    const desc = category.Description || category.description || '—';
                    const isActive = category.IsActive !== undefined ? category.IsActive : (category.isActive !== undefined ? category.isActive : true);

                    return (
                      <TableRow key={id} hover>
                        <TableCell>{page * rowsPerPage + index + 1}</TableCell>
                        <TableCell sx={{ fontWeight: 600 }}>{nameAr}</TableCell>
                        <TableCell sx={{ maxWidth: 350, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {desc}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={isActive ? 'نشط' : 'غير نشط'}
                            color={isActive ? 'success' : 'error'}
                            size="small"
                            variant="light"
                          />
                        </TableCell>
                        <TableCell align="center">
                          <Stack direction="row" spacing={1} sx={{ justifyContent: 'center' }}>
                            <Button
                              size="small"
                              variant="outlined"
                              color="primary"
                              startIcon={<Edit size={16} />}
                              onClick={() => handleEditClick(category)}
                            >
                              تعديل
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              startIcon={<Trash size={16} />}
                              onClick={() => handleDeleteClick(category)}
                            >
                              حذف
                            </Button>
                          </Stack>
                        </TableCell>
                      </TableRow>
                    );
                  })
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                      <Typography variant="body1" color="textSecondary">
                        لا توجد تصنيفات مطابقة
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
            labelRowsPerPage="عدد العناصر في الصفحة:"
          />
        </MainCard>
      </Grid>

      {/* Form Dialog */}
      <Dialog open={formDialogOpen} onClose={() => setFormDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCategory ? 'تعديل تصنيف ورقة العمل' : 'إضافة تصنيف جديد لأوراق العمل'}
        </DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <WorksheetCategoryForm
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
            هل أنت متأكد من رغبتك في حذف التصنيف &quot;{selectedCategory?.NameAr || selectedCategory?.nameAr}&quot;؟ قد يؤثر ذلك على أوراق العمل المرتبطة به.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setDeleteDialogOpen(false)} color="secondary">
            إلغاء
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" variant="contained">
            حذف
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}
