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
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import DialogContentText from '@mui/material/DialogContentText';
import Chip from '@mui/material/Chip';

// project-imports
import MainCard from 'components/MainCard';
import Loader from 'components/Loader';
import { useGetContactMessages, updateContactMessage, deleteContactMessage } from 'api/contactMessages';
import { openSnackbar } from 'api/snackbar';
import MessageForm from 'sections/contact-messages/MessageForm';

// assets
import { Eye, Trash } from 'iconsax-react';

// ==============================|| CONTACT MESSAGES ||============================== //

export default function ContactMessages() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const { contactMessages = [], contactMessagesLoading, contactMessagesMutate } = useGetContactMessages();

  const filteredMessages = contactMessages.filter((msg) =>
    (msg.fullName || msg.FullName || msg.name || msg.Name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (msg.email || msg.Email || '').toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const paginatedMessages = filteredMessages.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleViewClick = (msg) => {
    setSelectedMessage(msg);
    setFormDialogOpen(true);
  };

  const handleDeleteClick = (msg) => {
    setSelectedMessage(msg);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (values) => {
    setFormLoading(true);
    try {
      await updateContactMessage(selectedMessage.id || selectedMessage.Id, values);
      openSnackbar({
        open: true,
        message: 'تم تحديث حالة الرسالة بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      contactMessagesMutate();
      setFormDialogOpen(false);
      setSelectedMessage(null);
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
      await deleteContactMessage(selectedMessage.id || selectedMessage.Id);
      openSnackbar({
        open: true,
        message: 'تم حذف الرسالة بنجاح',
        variant: 'alert',
        alert: { color: 'success' }
      });
      contactMessagesMutate();
      setDeleteDialogOpen(false);
      setSelectedMessage(null);
    } catch (error) {
      openSnackbar({
        open: true,
        message: error?.message || 'حدث خطأ في حذف الرسالة',
        variant: 'alert',
        alert: { color: 'error' }
      });
    }
  };

  const getStatusChip = (isRead) => {
    let label = isRead ? 'مقروءة' : 'جديدة';
    let color = isRead ? 'success' : 'info';
    return <Chip label={label} color={color} size="small" />;
  };

  if (contactMessagesLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={3}>
      <Grid size={{ xs: 12 }}>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h4">رسائل التواصل</Typography>
        </Stack>
      </Grid>

      <Grid size={{ xs: 12 }}>
        <MainCard>
          <TextField
            fullWidth
            placeholder="بحث بالاسم أو البريد..."
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
                  <TableCell>الاسم</TableCell>
                  <TableCell>البريد الإلكتروني</TableCell>
                  <TableCell>الموضوع</TableCell>
                  <TableCell>الحالة</TableCell>
                  <TableCell align="center">الإجراءات</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedMessages.length > 0 ? (
                  paginatedMessages.map((msg) => (
                    <TableRow key={msg.id || msg.Id} hover>
                      <TableCell>{msg.fullName || msg.FullName || msg.name || msg.Name}</TableCell>
                      <TableCell>{msg.email || msg.Email}</TableCell>
                      <TableCell sx={{ maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {msg.subject || msg.Subject}
                      </TableCell>
                      <TableCell>{getStatusChip(msg.isRead !== undefined ? msg.isRead : msg.IsRead)}</TableCell>
                      <TableCell align="center">
                        <Stack direction="row" spacing={0.5} justifyContent="center">
                          <Button size="small" variant="outlined" onClick={() => handleViewClick(msg)} startIcon={<Eye size={16} />}>
                            عرض
                          </Button>
                          <Button
                            size="small"
                            variant="outlined"
                            color="error"
                            onClick={() => handleDeleteClick(msg)}
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
                        لا توجد رسائل متطابقة
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
            count={filteredMessages.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </MainCard>
      </Grid>

      <Dialog open={formDialogOpen} onClose={() => setFormDialogOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle>تفاصيل الرسالة</DialogTitle>
        <DialogContent sx={{ pt: 2 }}>
          <MessageForm
            message={selectedMessage}
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
            هل تريد بالتأكيد حذف الرسالة من "{selectedMessage?.fullName || selectedMessage?.FullName || selectedMessage?.name || selectedMessage?.Name}"؟ لا يمكن
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
